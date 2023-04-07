import logging

from fastapi import APIRouter

auth_router = APIRouter(prefix="/auth", tags=["auth"])
_logger = logging.getLogger(__name__)


@auth_router.post("/login")
def login():
    pass
