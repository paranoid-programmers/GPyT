from be.api.v1.tutorial_handlers import tutorial_router
from fastapi import APIRouter

from be.api.v1.auth_handlers import auth_router

api_v1_router = APIRouter(prefix="/v1")

api_v1_router.include_router(auth_router)
api_v1_router.include_router(tutorial_router)
