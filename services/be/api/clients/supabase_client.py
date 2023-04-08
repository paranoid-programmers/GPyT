import asyncio

from be.api.internal.models import CodeTutorial, UniqueCodeQuestion
from be.api.internal.settings import SupabaseSettings
from pydantic.tools import lru_cache

from supabase import create_client
import json


@lru_cache()
def get_supabase_settings():
    return SupabaseSettings()


def get_supabase_client():
    url: str = get_supabase_settings().SUPABASE_URL
    key: str = get_supabase_settings().SUPABASE_KEY
    return SupabaseWrapper(url, key)


class SupabaseWrapper:

    def __init__(self, url: str, key: str):
        self.supabase_client = create_client(url, key)

    def alive(self):
        # couldn't find a better way to check if the client is alive
        return self.supabase_client.auth_url is not None

    async def sign_in_with_oauth(self, provider: str, scopes: str = 'user'):
        data = await self.supabase_client.auth.sign_in_with_oauth({
            "provider": provider,
            "options": {
                "redirect_to": 'https://example.com/welcome',
                "scopes": scopes
            }
        })
        oauth_token = data.session.provider_token  # use to access provider API

    async def insert_tutorial(self, tutorial: CodeTutorial):
        # no async support without rolling our own: https://github.com/supabase-community/supabase-py/issues/250
        data, count = await asyncio.to_thread(lambda: self.supabase_client.table('tutorials').insert(json.loads(tutorial.json())).execute())
        return data.data

    async def get_tutorial(self, tutorial_uuid) -> CodeTutorial | None:
        # no async support without rolling our own: https://github.com/supabase-community/supabase-py/issues/250
        response = await asyncio.to_thread(lambda: self.supabase_client.table('tutorials').select('*').eq('uuid', str(tutorial_uuid)).execute())
        if response.data is None or len(response.data) == 0:
            return None

        return CodeTutorial.parse_obj(response.data[0])

    async def insert_question(self, question: UniqueCodeQuestion):
        # no async support without rolling our own: https://github.com/supabase-community/supabase-py/issues/250
        data, count = await asyncio.to_thread(lambda: self.supabase_client.table('questions').insert((json.loads(question.json()))).execute())
        return data.data

    async def get_question(self, question_uuid) -> UniqueCodeQuestion | None:
        # no async support without rolling our own: https://github.com/supabase-community/supabase-py/issues/250
        response = await asyncio.to_thread(lambda: self.supabase_client.table('questions').select('*').eq('uuid', str(question_uuid)).execute())
        if response.data is None or len(response.data) == 0:
            return None

        return UniqueCodeQuestion.parse_obj(response.data[0])
