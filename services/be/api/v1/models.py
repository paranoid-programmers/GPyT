from uuid import UUID

from be.shared.models import CodeBlock, QuestionContext, CodeQuestion
from pydantic import BaseModel


class UUIDModel(BaseModel):
    uuid: UUID


class UniqueCodeQuestion(UUIDModel):
    question: CodeQuestion


class Tutorial(BaseModel):
    questions: list[UniqueCodeQuestion]


class NewTutorialRequest(BaseModel):
    context: QuestionContext
    concept: str


class NewTutorialResponse(UUIDModel):
    tutorial: Tutorial


class PositiveAffirmationRequest(UUIDModel):
    full_code: CodeBlock


class PositiveAffirmationResponse(BaseModel):
    happy_text: str


class HintRequest(BaseModel):
    context: QuestionContext
    full_code: CodeBlock


class HintResponse(BaseModel):
    hint_text: str


class GiveUpRequest(BaseModel):
    context: QuestionContext
    full_code: CodeBlock


class GiveUpResponse(BaseModel):
    example_solution: str
    explanation: str
    additional_info: str


class MoreQuestionsRequest(BaseModel):
    tutorial_uuid: UUID


class MoreQuestionsResponse(BaseModel):
    questions: list[UniqueCodeQuestion]


class ReportQuestionRequest(UUIDModel):
    category: str
    details: str
    should_regenerate: bool


class ReportQuestionResponse(BaseModel):
    question: CodeQuestion
