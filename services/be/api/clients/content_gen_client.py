from be.api.common.settings import ContentGenSettings
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

    async def generate_tutorial(self, num_questions: int, token_count: int = 1000):
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.url}/tutorial",
                json={
                    "num_questions": num_questions,
                    "token_count": token_count
                }
            )
            response.raise_for_status()
            return response.json()

    async def get_hint(self, code_task: dict, conversation: dict):
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.url}/hint",
                json=code_task,
                params=conversation
            )
            response.raise_for_status()
            return response.json()

    async def get_token_count_estimate(self, user_interests: list[str], concept: str):
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self.url}/token_count_estimate",
                params={"user_interests": user_interests, "concept": concept}
            )
            response.raise_for_status()
            return response.json()
