from be.api.v1.handlers.code_tutorial_handlers import tutorial_router
from fastapi import APIRouter

from be.api.v1.handlers.auth_handlers import auth_router

api_v1_router = APIRouter(prefix="/v1")

api_v1_router.include_router(auth_router)
api_v1_router.include_router(tutorial_router)


@api_v1_router.get(
    "/alive",
    response_model=bool,
    description="Check if the service is alive, always returns true",
)
async def alive() -> bool:
    return True
