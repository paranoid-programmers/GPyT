from be.api.common.settings import SupabaseSettings
from be.shared.models import CodeQuestion, QuestionContext
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

    def login(self, email: str, password: str):
        return self.supabase_client.auth.sign_in_with_password({
            "email": email,
            "password": password
        })

    def sign_up(self, email: str, password: str, account_type: str):
        return self.supabase_client.auth.sign_up({
            "email": email,
            "password": password,
            "options": {
                "data": {
                    "account_type": account_type,
                }
            }
        })

    def ok(self):
        return self.supabase_client.auth_url is not None

    def insert_tutorial(self, context: QuestionContext, concept: str, questions: list[CodeQuestion]):
        pass
