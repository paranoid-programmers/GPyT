from be.api.internal.models import UUIDModel, Tutorial, UniqueCodeQuestion
from be.shared.models import CodeQuestion
from pydantic import BaseModel


class NewTutorialResponse(UUIDModel):
    tutorial: Tutorial


class PositiveAffirmationResponse(BaseModel):
    happy_text: str


class HintResponse(BaseModel):
    hint_text: str


class GiveUpResponse(BaseModel):
    example_solution: str
    explanation: str
    additional_info: str


class MoreQuestionsResponse(BaseModel):
    questions: list[UniqueCodeQuestion]


class ReportQuestionResponse(BaseModel):
    question: CodeQuestion
