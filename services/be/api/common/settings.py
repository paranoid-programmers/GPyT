from pydantic import BaseSettings


class SupabaseSettings(BaseSettings):
    SUPABASE_URL: str
    SUPABASE_KEY: str
