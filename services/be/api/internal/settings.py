from pydantic import BaseSettings


class SupabaseSettings(BaseSettings):
    SUPABASE_URL: str
    SUPABASE_KEY: str


class ContentGenSettings(BaseSettings):
    CONTENT_GEN_URL: str
    CONTENT_GEN_KEY: str
