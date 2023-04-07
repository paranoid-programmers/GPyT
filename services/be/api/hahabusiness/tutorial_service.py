from uuid import UUID

from be.api.clients.content_gen_client import ContentGenClient
from be.api.clients.supabase_client import SupabaseWrapper
from be.api.common.models import NewTutorialRequest, NewTutorialResponse, GiveUpResponse, HintRequest, HintResponse, \
    GiveUpRequest, PositiveAffirmationRequest, PositiveAffirmationResponse, MoreQuestionsResponse, \
    ReportQuestionResponse, ReportQuestionRequest, MoreQuestionsRequest


class TutorialService:
    def __init__(self, content_client: ContentGenClient, supabase_client: SupabaseWrapper):
        self.content_client = content_client
        self.supabase_client = supabase_client

    def create_new_tutorial(self, request: NewTutorialRequest) -> NewTutorialResponse:
        tutorial_uuid, questions = self.content_client.generate_new_tutorial(request.context, request.concepts_to_learn)
        return NewTutorialResponse(uuid=tutorial_uuid, questions=questions)

    def give_up(self, request: GiveUpRequest) -> GiveUpResponse:
        example_solution, explanation, additional_info = provide_solution(request.context, request.full_code)
        return GiveUpResponse(example_solution=example_solution, explanation=explanation, additional_info=additional_info)

    def get_hint(self, request: HintRequest) -> HintResponse:
        hint_text = provide_hint(request.context, request.full_code)
        return HintResponse(hint_text=hint_text)

    def get_positive_affirmation(self, request: PositiveAffirmationRequest) -> PositiveAffirmationResponse:
        happy_text = provide_positive_affirmation(request.context, request.full_code)
        return PositiveAffirmationResponse(happy_text=happy_text)

    def get_more_questions(self, request: MoreQuestionsRequest) -> MoreQuestionsResponse:
        questions = get_additional_questions(request.tutorial_uuid)
        return MoreQuestionsResponse(questions=questions)

    def report_question(self, request: ReportQuestionRequest) -> ReportQuestionResponse:
        question = report_question(request.question_uuid, request.category, request.details, request.should_regenerate)
        return ReportQuestionResponse(question=question)