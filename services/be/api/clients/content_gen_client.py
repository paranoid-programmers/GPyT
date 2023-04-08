import uuid

from be.api.internal.settings import ContentGenSettings
from be.content_gen.v1.request_models import GenerateQuestionRequest, GenerateHintRequest
from be.content_gen.v1.response_models import GenerateTextResponse, GenerateCodeQuestionResponse
from be.shared.models import TutorialContext, Question, CodeBlock
from pydantic.tools import lru_cache
from unittest.mock import MagicMock

import httpx


@lru_cache()
def get_content_gen_settings():
    return ContentGenSettings()


def get_content_gen_client():
    # dependency injection isn't playing ball, so we're just going to return the mock client for now
    return MockContentGenClient()

    # url: str = get_content_gen_settings().CONTENT_GEN_URL
    # key: str = get_content_gen_settings().CONTENT_GEN_KEY
    # return ContentGenClient(url, key)


class ContentGenClient:

    def __init__(self, url: str, key: str):
        self.url = url
        self.key = key

    async def generate_question(self, context: TutorialContext, concept: str,
                                max_token: int = 1000) -> GenerateCodeQuestionResponse:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.url}/generate-question",
                json=GenerateQuestionRequest(context=context, concept=concept, max_token=max_token)
            )
            response.raise_for_status()
            return response.json()

    async def get_hint(self, question: Question, context: TutorialContext,
                       max_token: int = 1000) -> GenerateTextResponse:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.url}/hint",
                json=GenerateHintRequest(question=question, context=context, max_token=max_token)
            )
            response.raise_for_status()
            return response.json()

    async def get_affirmation(self, context, full_code) -> GenerateTextResponse:
        pass


def get_mock_content_gen_client():
    return MockContentGenClient()


class MockContentGenClient(MagicMock):

    async def generate_question(self, context: TutorialContext, concept: str, max_token: int = 1000) -> GenerateCodeQuestionResponse:
        mock_code_block = CodeBlock(code="print('Hello World!')", language="python")
        return GenerateCodeQuestionResponse(
            code_question={
                "title": "mock title",
                "description": "mock description",
                "concept": concept,
                "skeleton_code": mock_code_block,
                "solution_code": mock_code_block,
                "test_cases": [("garbage", 1)]
            },
            tokens_used=6969
        )

    async def get_hint(self, question, context, max_token) -> GenerateTextResponse:
        return GenerateTextResponse(text="This is a hint", tokens_used=6969)
