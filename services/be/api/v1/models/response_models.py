from be.api.internal.models import CodeTutorial, UniqueCodeQuestion
from be.shared.models import CodeQuestion
from pydantic import BaseModel


class NewCodeTutorialResponse(BaseModel):
    tutorial: CodeTutorial


class PositiveAffirmationResponse(BaseModel):
    happy_text: str


class HintResponse(BaseModel):
    hint_text: str


class GiveUpResponse(BaseModel):
    explanation: str
    example_solution: str | None
    additional_info: str | None


class MoreQuestionsResponse(BaseModel):
    questions: list[UniqueCodeQuestion]


class ReportQuestionResponse(BaseModel):
    question: CodeQuestion
