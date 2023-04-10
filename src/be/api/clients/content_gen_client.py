import time
from be.api.internal.settings import ContentGenSettings, get_environment_settings
from be.content_gen.v1.request_models import GenerateQuestionRequest, GenerateGiveUpRequest, GenerateCodeHintRequest, \
    GenerateAffirmationRequest
from be.content_gen.v1.response_models import GenerateTextResponse, GenerateCodeQuestionResponse
from be.shared.models import TutorialContext, Question, CodeBlock, CodeQuestion
# noinspection PyProtectedMember
from pydantic.tools import lru_cache
from unittest.mock import MagicMock
import httpx


_mock_description = """\
This is an elaborate mock description that demonstrates `code` and **bold** text.

It also has a link to [Google](https://www.google.com).

And a code block:
```python
def foo():
    return "bar"

print(foo())
```

Interests:

"""

_mock_skeleton_code = """\
import time
time.sleep(1)

print("Hello, _!")
"""


@lru_cache()
def get_content_gen_settings():
    return ContentGenSettings()


def get_content_gen_client():
    # dependency injection isn't playing ball, so we're just going to return the mock client for now
    if get_environment_settings().ENV_IS_DEV:
        return MockContentGenClient()
    else:
        url: str = get_content_gen_settings().CONTENT_GEN_URL
        key: str = get_content_gen_settings().CONTENT_GEN_KEY
        return ContentGenClient(url, key)


class ContentGenClient:
    def __init__(self, url: str, key: str):
        self.url = url
        self.key = key
        self.timeout_sec = 30.0

    async def generate_question(self, context: TutorialContext, concept: str,
                                max_token: int = 1000) -> GenerateCodeQuestionResponse:
        async with httpx.AsyncClient(timeout=self.timeout_sec) as client:
            response = await client.post(
                f"{self.url}/generate-question",
                json=GenerateQuestionRequest(context=context, concept=concept, max_token=max_token).dict()
            )
            response.raise_for_status()
            return GenerateCodeQuestionResponse(**response.json())

    async def generate_hint(self, question: Question, context: TutorialContext, user_code: CodeBlock,
                            max_token: int = 1000) -> GenerateTextResponse:
        async with httpx.AsyncClient(timeout=self.timeout_sec) as client:
            response = await client.post(
                f"{self.url}/generate-hint",
                json=GenerateCodeHintRequest(question=question, context=context, user_code=user_code,
                                             max_token=max_token).dict()
            )
            response.raise_for_status()
            return GenerateTextResponse(**response.json())

    async def generate_give_up(self, question: Question, context: TutorialContext, user_code: CodeBlock,
                               solution_code: CodeBlock, max_token: int = 1000) -> GenerateTextResponse:
        async with httpx.AsyncClient(timeout=self.timeout_sec) as client:
            response = await client.post(
                f"{self.url}/generate-give-up",
                json=GenerateGiveUpRequest(question=question, context=context, user_code=user_code,
                                           solution_code=solution_code, max_token=max_token).dict()
            )
            response.raise_for_status()
            return GenerateTextResponse(**response.json())

    async def generate_affirmation(self, context: TutorialContext, attempts_taken: int,
                                   max_token: int = 1000) -> GenerateTextResponse:
        async with httpx.AsyncClient(timeout=self.timeout_sec) as client:
            response = await client.post(
                f"{self.url}/generate-affirmation",
                json=GenerateAffirmationRequest(context=context, attempts_taken=attempts_taken, max_token=max_token).dict()
            )
            response.raise_for_status()
            return GenerateTextResponse(**response.json())


def get_mock_content_gen_client():
    return MockContentGenClient()


class MockContentGenClient(MagicMock):
    async def generate_question(self, context: TutorialContext, concept: str,
                                max_token: int = 1000) -> GenerateCodeQuestionResponse:
        time.sleep(0.4) # simulate a slow response
        return GenerateCodeQuestionResponse(
            code_question=CodeQuestion(
                title=f"mock title about: {concept}, tone: {context.tone}",
                description=_mock_description + " - " + "\n   - ".join(context.interests),
                concept=concept,
                skeleton_code=CodeBlock(code=_mock_skeleton_code, language="python"),
                solution_code=CodeBlock(code="print('Hello World!')", language="python"),
                test_cases="[('garbage', 1)]"
            ),
            tokens_used=6969
        )

    async def generate_hint(self, question: Question, context: TutorialContext, user_code: CodeBlock,
                            max_token: int = 1000) -> GenerateTextResponse:
        return GenerateTextResponse(text="This is a __hint__", tokens_used=6969)

    async def generate_give_up(self, question: Question, context: TutorialContext, user_code: CodeBlock,
                               max_token: int = 1000) -> GenerateTextResponse:
        return GenerateTextResponse(text="You are a **loser** you gave up", tokens_used=6969)

    async def generate_affirmation(self, context: TutorialContext, max_token: int = 1000) -> GenerateTextResponse:
        return GenerateTextResponse(text="hell yeah! *you did it*", tokens_used=6969)
