import uuid
from be.api.clients.content_gen_client import ContentGenClient, get_content_gen_client
from be.api.clients.supabase_client import SupabaseWrapper, get_supabase_client
from be.api.internal.models import CodeTutorial, UniqueCodeQuestion, ReportedQuestion
from be.api.v1.models.response_models import NewCodeTutorialResponse, PositiveAffirmationResponse, HintResponse, \
    GiveUpResponse, MoreQuestionsResponse, ReportQuestionResponse
from be.shared.models import TutorialContext, CodeBlock
from fastapi import HTTPException


def get_code_tutorial_service():
    return CodeTutorialService(get_content_gen_client(), get_supabase_client())


class CodeTutorialService:
    def __init__(self, content_client: ContentGenClient, supabase_client: SupabaseWrapper):
        self.content_client = content_client
        self.supabase_client = supabase_client

    async def create_new_tutorial(self, tutorial_context: TutorialContext, concept: str) -> NewCodeTutorialResponse:
        # ask content client for a single question
        question_response = await self.content_client.generate_question(tutorial_context, concept)
        question_response.code_question.concept = concept

        # create a code tutorial
        tutorial_uuid = uuid.uuid4()
        tutorial = CodeTutorial(uuid=tutorial_uuid, questions=[], context=tutorial_context)

        # unique-ify the question and add it to the tutorial
        unique_code_question = UniqueCodeQuestion(uuid=uuid.uuid4(), question=question_response.code_question)
        tutorial.questions.append(unique_code_question)

        # persist the question in supabase
        await self.supabase_client.insert_question(unique_code_question)

        # persist the code tutorial in supabase
        await self.supabase_client.insert_tutorial(tutorial)

        return NewCodeTutorialResponse(tutorial=tutorial)

    async def get_hint(self, tutorial_uuid: uuid, question_uuid: uuid, user_code: CodeBlock) -> HintResponse:
        # fetch the tutorial from supabase
        tutorial = await self.supabase_client.get_tutorial(tutorial_uuid)
        if tutorial is None:
            raise HTTPException(status_code=404, detail="Tutorial not found")

        # fetch the question from supabase
        question = await self.supabase_client.get_question(question_uuid)
        if question is None:
            raise HTTPException(status_code=404, detail="Question not found")

        # ask content client for a hint
        hint = await self.content_client.generate_hint(question.question, tutorial.context, user_code)
        return HintResponse(hint_text=hint.text)

    async def give_up(self, tutorial_uuid: uuid, question_uuid: uuid, user_code: CodeBlock) -> GiveUpResponse:
        # fetch the tutorial from supabase
        tutorial = await self.supabase_client.get_tutorial(tutorial_uuid)
        if tutorial is None:
            raise HTTPException(status_code=404, detail="Tutorial not found")

        # fetch the question from supabase
        question = await self.supabase_client.get_question(question_uuid)
        if question is None:
            raise HTTPException(status_code=404, detail="Question not found")

        # ask content client for a hint
        give_up_message = await self.content_client.generate_give_up(question.question, tutorial.context, user_code, question.question.solution_code)
        return GiveUpResponse(explanation=give_up_message.text, example_solution=None, additional_info=None)

    async def more_questions(self, tutorial_uuid) -> MoreQuestionsResponse:
        # fetch the tutorial from supabase
        tutorial = await self.supabase_client.get_tutorial(tutorial_uuid)
        if tutorial is None:
            raise HTTPException(status_code=404, detail="Tutorial not found")

        # ask content client for a single question
        question_response = await self.content_client.generate_question(tutorial.context, tutorial.questions[0].question.concept)

        # unique-ify the question and add it to the tutorial
        unique_code_question = UniqueCodeQuestion(uuid=uuid.uuid4(), question=question_response.code_question)
        tutorial.questions.append(unique_code_question)

        # persist the question in supabase
        await self.supabase_client.insert_question(unique_code_question)

        # persist the updated code tutorial in supabase
        await self.supabase_client.update_tutorial(tutorial)

        return MoreQuestionsResponse(questions=[unique_code_question])

    async def get_affirmation(self, tutorial_uuid: uuid, attempts_taken: int) -> PositiveAffirmationResponse:
        # fetch the tutorial from supabase
        tutorial = await self.supabase_client.get_tutorial(tutorial_uuid)
        if tutorial is None:
            raise HTTPException(status_code=404, detail="Tutorial not found")

        # ask content client for a single question
        affirmation_response = await self.content_client.generate_affirmation(tutorial.context, attempts_taken)

        return PositiveAffirmationResponse(happy_text=affirmation_response.text)

    async def report_question(self, tutorial_uuid: uuid, question_uuid: uuid, category: str, details: str, should_regenerate: bool) -> ReportQuestionResponse:
        # fetch the tutorial from supabase
        tutorial = await self.supabase_client.get_tutorial(tutorial_uuid)
        if tutorial is None:
            raise HTTPException(status_code=404, detail="Tutorial not found")

        # fetch the question from supabase
        bad_question = await self.supabase_client.get_question(question_uuid)
        if bad_question is None:
            raise HTTPException(status_code=404, detail="Question not found")

        # persist the reported question in supabase
        reported_question = ReportedQuestion(uuid=uuid.uuid4(), reported_question=bad_question, category=category, details=details, was_regenerated=should_regenerate)
        await self.supabase_client.insert_reported_question(reported_question)

        # flag the question as reported and persist it in supabase
        bad_question.question.is_flagged = True
        await self.supabase_client.update_question(bad_question)

        # if we should regenerate a new question, then do so
        new_question = None
        if should_regenerate:
            # ask content client for a single question
            new_question_response = await self.content_client.generate_question(tutorial.context, tutorial.questions[0].question.concept)

            # unique-ify the question and add it to the tutorial and to the response
            new_question = UniqueCodeQuestion(uuid=uuid.uuid4(), question=new_question_response.code_question)
            tutorial.questions.append(new_question)

            # persist the question in supabase
            await self.supabase_client.insert_question(new_question)

            # extract the actual question
            new_question = new_question.question

        # update the tutorial in supabase to remove the question that was reported
        tutorial.questions = [q for q in tutorial.questions if q.uuid != question_uuid]

        # persist the updated code tutorial in supabase
        await self.supabase_client.update_tutorial(tutorial)

        return ReportQuestionResponse(new_question=new_question)
