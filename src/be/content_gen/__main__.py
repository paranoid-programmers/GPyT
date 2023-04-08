import openai
import uvicorn
from pydantic import BaseSettings

from be.content_gen.main import app

if __name__ == "__main__":

    class Settings(BaseSettings):
        OPENAI_API_KEY: str

    SETTINGS = Settings()
    openai.api_key = SETTINGS.OPENAI_API_KEY
    uvicorn.run(app, host="0.0.0.0")
