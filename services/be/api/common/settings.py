from pydantic import BaseSettings


class SupabaseSettings(BaseSettings):
    SUPABASE_URL: str
    SUPABASE_KEY: str

    class Config:
        env_file = ".env"
        env_prefix = "SUPABASE_"

