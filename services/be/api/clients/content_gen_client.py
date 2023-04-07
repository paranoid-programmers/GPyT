from be.api.common.settings import ContentGenSettings
from be.shared.models import QuestionContext, CodeBlock
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

    async def generate_tutorial(self, context: QuestionContext, concept: str, num_questions: int, max_token_count: int = 1000):
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.url}/tutorial",
                json={
                    "context": context,
                    "concept": concept,
                    "num_questions": num_questions,
                    "max_token_count": max_token_count
                }
            )
            response.raise_for_status()
            return response.json()

    async def get_hint(self, context: QuestionContext, full_code: CodeBlock):
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

    def get_affirmation(self, context, full_code):
        pass