import logging

from typing import Any

from fastapi import APIRouter, Depends
from be.api.clients.content_gen_client import get_content_gen_client, ContentGenClient
from typing_extensions import Annotated

tutorial_router = APIRouter(prefix="/tutorial", tags=["tutorial"])
_logger = logging.getLogger(__name__)


@tutorial_router.post("/new_tutorial")
async def new_tutorial(user_request: dict,
               content_gen_client: Annotated[ContentGenClient, Depends(get_content_gen_client)]) -> Any:
    return await content_gen_client.create_task(user_request, token_count=2000)
