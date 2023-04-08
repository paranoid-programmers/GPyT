from uuid import UUID

from be.api.clients.content_gen_client import ContentGenClient, get_content_gen_client
from be.api.clients.supabase_client import SupabaseWrapper, get_supabase_client
from be.api.internal.models import CodeTutorial, UniqueCodeQuestion
from be.api.v1.models.response_models import NewCodeTutorialResponse, PositiveAffirmationResponse, HintResponse, GiveUpResponse
from be.shared.models import TutorialContext, CodeBlock, Question


def get_tutorial_service():
    return TutorialService(get_content_gen_client(), get_supabase_client())


class TutorialService:
    def __init__(self, content_client: ContentGenClient, supabase_client: SupabaseWrapper):
        self.content_client = content_client
        self.supabase_client = supabase_client

    async def create_new_code_tutorial(self, tutorial_context: TutorialContext, concept: str) -> NewCodeTutorialResponse:
        # create a tutorial and persist it in supabase
        tutorial = CodeTutorial(questions=[], context=tutorial_context)
        tutorial_uuid = await self.supabase_client.insert_tutorial(tutorial)

        # ask content client for a single question
        question_response = await self.content_client.generate_question(tutorial_context, concept)
        question_response.code_question.concept = concept

        # persist question in supabase
        question_uuid = await self.supabase_client.insert_question(tutorial_uuid, question_response.code_question)

        unique_code_question = UniqueCodeQuestion(uuid=question_uuid, code_question=question_response.code_question)
        tutorial.questions.append(unique_code_question)

        return NewCodeTutorialResponse(tutorial=tutorial)

    async def get_hint(self, question: Question, context: TutorialContext) -> HintResponse:
        # ask content client for a hint
        hint_text = await self.content_client.get_hint(question, context)
        return HintResponse(hint_text=hint_text)

    async def get_affirmation(self, uuid: UUID, full_code: CodeBlock) -> PositiveAffirmationResponse:
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