import logging

from be.api.v1.response_models import NewTutorialResponse, PositiveAffirmationResponse, HintResponse, GiveUpResponse, \
    MoreQuestionsResponse, ReportQuestionResponse
from be.api.v1.request_models import NewTutorialRequest, PositiveAffirmationRequest, HintRequest, GiveUpRequest, \
    MoreQuestionsRequest, ReportQuestionRequest
from be.api.hahabusiness.tutorial_service import TutorialService, get_tutorial_service
from fastapi import APIRouter, Depends
from typing_extensions import Annotated

tutorial_router = APIRouter(prefix="/tutorial", tags=["tutorial"])
_logger = logging.getLogger(__name__)

TutorialServiceType = Annotated[TutorialService, Depends(get_tutorial_service)]


@tutorial_router.post("/new_tutorial", response_model=NewTutorialResponse)
async def new_tutorial(request: NewTutorialRequest, tutorial_service: TutorialServiceType) -> NewTutorialResponse:
    return await tutorial_service.create_new_tutorial(request.context, request.concept)


@tutorial_router.post("/affirmation", response_model=PositiveAffirmationResponse)
async def hint(request: PositiveAffirmationRequest,
               tutorial_service: TutorialServiceType) -> PositiveAffirmationResponse:
    return await tutorial_service.get_affirmation(request.uuid, request.full_code)


@tutorial_router.post("/hint", response_model=HintResponse)
async def hint(request: HintRequest, tutorial_service: TutorialServiceType) -> HintResponse:
    return await tutorial_service.get_hint(request.context, request.full_code)


@tutorial_router.post("/give-up", response_model=GiveUpResponse)
async def give_up(request: GiveUpRequest, tutorial_service: TutorialServiceType) -> GiveUpResponse:
    return await tutorial_service.give_up(request.context, request.full_code)


@tutorial_router.post("/more-questions", response_model=MoreQuestionsResponse)
async def give_up(request: MoreQuestionsRequest, tutorial_service: TutorialServiceType) -> MoreQuestionsResponse:
    return await tutorial_service.more_questions(request.tutorial_uuid)


@tutorial_router.post("/report-question", response_model=ReportQuestionResponse)
async def give_up(request: ReportQuestionRequest, tutorial_service: TutorialServiceType) -> ReportQuestionResponse:
    return await tutorial_service.report_question(request.question_uuid, request.category, request.details,
                                                  request.should_regenerate)
