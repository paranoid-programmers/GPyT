from uuid import UUID

from be.api.internal.models import UUIDModel
from be.shared.models import QuestionContext, CodeBlock
from pydantic import BaseModel


class NewTutorialRequest(BaseModel):
    context: QuestionContext
    concept: str


class PositiveAffirmationRequest(UUIDModel):
    full_code: CodeBlock


class HintRequest(BaseModel):
    context: QuestionContext
    full_code: CodeBlock


class GiveUpRequest(BaseModel):
    context: QuestionContext
    full_code: CodeBlock


class MoreQuestionsRequest(BaseModel):
    tutorial_uuid: UUID


class ReportQuestionRequest(UUIDModel):
    category: str
    details: str
    should_regenerate: bool
