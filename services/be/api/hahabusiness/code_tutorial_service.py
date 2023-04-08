import uuid
from be.api.clients.content_gen_client import ContentGenClient, get_content_gen_client
from be.api.clients.supabase_client import SupabaseWrapper, get_supabase_client
from be.api.internal.models import CodeTutorial, UniqueCodeQuestion
from be.api.v1.models.response_models import NewCodeTutorialResponse, PositiveAffirmationResponse, HintResponse, GiveUpResponse
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

    async def get_hint(self, question: Question, context: TutorialContext) -> HintResponse:
        # ask content client for a hint
        hint_text = await self.content_client.get_hint(question, context)
        return HintResponse(hint_text=hint_text)

    async def get_affirmation(self, uuid: uuid, full_code: CodeBlock) -> PositiveAffirmationResponse:
        # fetch context from supabase
        context = await self.supabase_client.get_context(uuid)

        # ask content client for a hint
        affirmation_text = await self.content_client.get_affirmation(context, full_code)
        return PositiveAffirmationResponse(affirmation_text=affirmation_text)

    async def give_up(self, context, full_code) -> GiveUpResponse:
        pass

    async def more_questions(self, tutorial_uuid):
        pass

    def report_question(self, question_uuid, category, details, should_regenerate):
        pass