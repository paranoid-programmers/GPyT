import logging

from typing import Any

from fastapi import APIRouter, Depends
from be.api.clients.content_gen_client import get_content_gen_client, ContentGenClient
from typing_extensions import Annotated

content_router = APIRouter(prefix="/content", tags=["content"])
_logger = logging.getLogger(__name__)


@content_router.post("/task")
async def task(user_request: dict,
               content_gen_client: Annotated[ContentGenClient, Depends(get_content_gen_client)]) -> Any:
    return await content_gen_client.create_task(user_request, token_count=2000)


@content_router.post("/hint")
async def hint(code_task: dict, conversation: dict,
               content_gen_client: Annotated[ContentGenClient, Depends(get_content_gen_client)]):
    return await content_gen_client.get_hint(code_task, conversation)


@content_router.post("/token_count_estimate")
async def token_count_estimate(user_interests: list[str], concept: str,
                               content_gen_client: Annotated[ContentGenClient, Depends(get_content_gen_client)]) -> Any:
    return await content_gen_client.get_token_count_estimate(user_interests, concept)
