import uuid
from be.api.clients.content_gen_client import ContentGenClient, get_content_gen_client
from be.api.clients.supabase_client import SupabaseWrapper, get_supabase_client
from be.api.internal.models import CodeTutorial, UniqueCodeQuestion
from be.api.v1.models.response_models import NewCodeTutorialResponse, PositiveAffirmationResponse, HintResponse, \
    GiveUpResponse, MoreQuestionsResponse, ReportQuestionResponse
from be.shared.models import TutorialContext, CodeBlock, Question


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

    async def get_hint(self, partial_code: CodeBlock, tutorial_uuid: uuid, question_uuid: uuid) -> HintResponse:
        # fetch the tutorial from supabase
        tutorial = await self.supabase_client.get_tutorial(tutorial_uuid)

        # fetch the question from supabase
        question = await self.supabase_client.get_question(question_uuid)

        # ask content client for a hint
        hint = await self.content_client.get_hint(question.question, tutorial.context, partial_code)
        return HintResponse(hint_text=hint.text)

    async def get_affirmation(self, uuid: uuid, full_code: CodeBlock) -> PositiveAffirmationResponse:
        pass

    async def give_up(self, context, full_code) -> GiveUpResponse:
        pass

    async def more_questions(self, tutorial_uuid) -> MoreQuestionsResponse:
        pass

    def report_question(self, question_uuid, category, details, should_regenerate) -> ReportQuestionResponse:
        pass