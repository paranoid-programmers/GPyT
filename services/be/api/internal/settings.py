from pydantic.tools import lru_cache

from pydantic import BaseSettings


@lru_cache()
def get_environment_settings():
    return EnvironmentSettings()


class EnvironmentSettings(BaseSettings):
    ENV_IS_DEV: bool = False


class SupabaseSettings(BaseSettings):
    SUPABASE_URL: str
    SUPABASE_KEY: str


class ContentGenSettings(BaseSettings):
    CONTENT_GEN_URL: str
    CONTENT_GEN_KEY: str
