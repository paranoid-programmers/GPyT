

import openai
import uvicorn
from pydantic import BaseSettings

from be.content_gen.main import app



if __name__ == '__main__':
    class Settings(BaseSettings):
        open_api_key: str


    SETTINGS = Settings()
    openai.api_key = SETTINGS.open_api_key
    uvicorn.run(app, host="0.0.0.0")
