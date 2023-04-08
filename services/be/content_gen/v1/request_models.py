from pydantic import BaseModel

from be.shared.models import CodeBlock, Question, TutorialContext


class GenerateRequest(BaseModel):
    max_token: int = 4096


class GenerateQuestionRequest(GenerateRequest):
    concept: str
    context: TutorialContext


class GenerateHintRequest(GenerateRequest):
    question: Question
    context: TutorialContext


class GenerateCodeHintRequest(GenerateHintRequest):
    user_code: CodeBlock


class GenerateGiveUpRequest(GenerateHintRequest):
    pass
