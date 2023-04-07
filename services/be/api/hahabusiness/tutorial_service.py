from uuid import UUID

from be.api.clients.content_gen_client import ContentGenClient, get_content_gen_client
from be.api.clients.supabase_client import SupabaseWrapper, get_supabase_client
from be.api.v1.models import NewTutorialResponse, HintResponse, PositiveAffirmationResponse, GiveUpResponse
from be.shared.models import QuestionContext, CodeBlock


def get_tutorial_service():
    return TutorialService(get_content_gen_client(), get_supabase_client())


class TutorialService:
    def __init__(self, content_client: ContentGenClient, supabase_client: SupabaseWrapper):
        self.content_client = content_client
        self.supabase_client = supabase_client
        self.num_questions_per_tutorial = 1

    async def create_new_tutorial(self, context: QuestionContext, concept: str) -> NewTutorialResponse:
        # ask content client for a new tutorial
        tutorial_uuid, questions = self.content_client.generate_tutorial(
            context, concept, self.num_questions_per_tutorial)

        # push results to supabase
        tutorial_uuid = await self.supabase_client.insert_tutorial(context, concept, questions)

        return NewTutorialResponse(uuid=tutorial_uuid, questions=questions)

    async def get_hint(self, context: QuestionContext, full_code: CodeBlock) -> HintResponse:
        # ask content client for a hint
        hint_text = self.content_client.get_hint(context, full_code)
        return HintResponse(hint_text=hint_text)

    async def get_affirmation(self, uuid: UUID, full_code: CodeBlock) -> PositiveAffirmationResponse:
        # fetch context from supabase
        context = await self.supabase_client.get_context(uuid)

        # ask content client for a hint
        affirmation_text = self.content_client.get_affirmation(context, full_code)
        return PositiveAffirmationResponse(affirmation_text=affirmation_text)

    async def give_up(self, context, full_code) -> GiveUpResponse:
        pass

    async def more_questions(self, tutorial_uuid):
        pass

    def report_question(self, question_uuid, category, details, should_regenerate):
        pass