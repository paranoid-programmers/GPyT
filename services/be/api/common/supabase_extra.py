from pydantic.tools import lru_cache
from be.api.common.settings import SupabaseSettings
from be.api.hahabusiness.supabase_client import SupabaseWrapper


@lru_cache()
def get_supabase_settings():
    return SupabaseSettings()


def get_supabase_client():
    url: str = get_supabase_settings().SUPABASE_URL
    key: str = get_supabase_settings().SUPABASE_KEY
    return SupabaseWrapper(url, key)