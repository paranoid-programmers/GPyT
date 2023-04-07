from pydantic import BaseModel

from be.shared.models import CodeQuestion


class OpenAiQuery(BaseModel):
    tokens_used: int


class GenerateCodeQuestionResponse(OpenAiQuery):
    code_question: CodeQuestion


class GenerateTextResponse(OpenAiQuery):
    text: str
