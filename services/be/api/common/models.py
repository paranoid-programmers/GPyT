from typing import List
from uuid import UUID

from be.shared.models import CodeBlock, QuestionContext, Tutorial, CodeQuestion
from pydantic import BaseModel


class NewTutorialRequest(BaseModel):
    context: QuestionContext
    concept: str


class NewTutorialResponse(BaseModel):
    uuid: UUID
    tutorial: Tutorial


class PositiveAffirmationRequest(BaseModel):
    context: QuestionContext
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
    questions: List[CodeQuestion]


class ReportQuestionRequest(BaseModel):
    question_uuid: UUID
    category: str
    details: str
    should_regenerate: bool


class ReportQuestionResponse(BaseModel):
    question: CodeQuestion
