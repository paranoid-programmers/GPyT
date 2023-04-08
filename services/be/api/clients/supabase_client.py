from be.api.internal.models import CodeTutorial
from be.api.internal.settings import SupabaseSettings
from be.shared.models import CodeQuestion, TutorialContext
from pydantic import json
from pydantic.tools import lru_cache

from supabase import create_client


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

    async def add_to_document_store(self, document: json):
        # no async support without rolling our own: https://github.com/supabase-community/supabase-py/issues/250
        data, count = self.supabase_client.table('documents').insert(document).execute()
        return data

    async def update_stored_document(self, document: json):
        # no async support without rolling our own: https://github.com/supabase-community/supabase-py/issues/250
        data, count = self.supabase_client.table('documents').update(document).execute()

    async def insert_tutorial(self, tutorial: CodeTutorial):
        pass

    async def get_context(self, uuid):
        pass

    async def insert_question(self, tutorial_uuid, question):
        pass
