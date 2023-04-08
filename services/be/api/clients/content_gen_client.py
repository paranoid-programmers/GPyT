from be.api.internal.settings import ContentGenSettings
from be.content_gen.v1.request_models import GenerateQuestionRequest
from be.content_gen.v1.response_models import GenerateTextResponse, GenerateCodeQuestionResponse
from be.shared.models import TutorialContext, CodeBlock
from pydantic.tools import lru_cache
import httpx


@lru_cache()
def get_content_gen_settings():
    return ContentGenSettings()


def get_content_gen_client():
    url: str = get_content_gen_settings().CONTENT_GEN_URL
    key: str = get_content_gen_settings().CONTENT_GEN_KEY
    return ContentGenClient(url, key)


class ContentGenClient:

    def __init__(self, url: str, key: str):
        self.url = url
        self.key = key

    async def generate_question(self, context: TutorialContext, concept: str, max_token: int = 1000) -> GenerateCodeQuestionResponse:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.url}/generate-question",
                json=GenerateQuestionRequest(context=context, concept=concept, max_token=max_token)
            )
            response.raise_for_status()
            return response.json()

    async def get_hint(self, context: TutorialContext, full_code: CodeBlock) -> GenerateTextResponse:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.url}/hint",
                json={
                    "context": context,
                    "full_code": full_code,
                },
            )
            response.raise_for_status()
            return response.json()

    def get_affirmation(self, context, full_code) -> GenerateTextResponse:
        pass
