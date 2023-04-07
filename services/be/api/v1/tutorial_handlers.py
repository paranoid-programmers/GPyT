import logging

from be.api.common.models import NewTutorialRequest, NewTutorialResponse, HintResponse, HintRequest
from be.api.hahabusiness.tutorial_service import TutorialService, get_tutorial_service
from fastapi import APIRouter, Depends
from typing_extensions import Annotated

tutorial_router = APIRouter(prefix="/tutorial", tags=["tutorial"])
_logger = logging.getLogger(__name__)

TutorialServiceType = Annotated[TutorialService, Depends(get_tutorial_service)]


@tutorial_router.post("/new_tutorial", response_model=NewTutorialResponse)
async def new_tutorial(request: NewTutorialRequest, tutorial_service: TutorialServiceType) -> NewTutorialResponse:
    return await tutorial_service.create_new_tutorial(request.context, request.concept)


@tutorial_router.post("/hint", response_model=HintResponse)
async def hint(request: HintRequest, tutorial_service: TutorialServiceType) -> HintResponse:
    return await tutorial_service.get_hint(request.context, request.full_code)
