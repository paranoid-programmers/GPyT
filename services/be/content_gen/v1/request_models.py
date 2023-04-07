from pydantic import BaseModel

from be.shared.models import CodeBlock, Question, QuestionContext


class GenerateRequest(BaseModel):
    max_token: int = 4096


class GenerateQuestionRequest(GenerateRequest):
    concept: str
    context: QuestionContext


class GenerateHintRequest(GenerateRequest):
    question: Question
    context: QuestionContext


class GenerateCodeHintRequest(GenerateHintRequest):
    user_code: CodeBlock


class GenerateGiveUpRequest(GenerateHintRequest):
    pass
