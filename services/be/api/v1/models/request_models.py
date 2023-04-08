from uuid import UUID

from be.api.internal.models import UUIDModel
from be.shared.models import TutorialContext, CodeBlock, Question
from pydantic import BaseModel


class NewTutorialRequest(BaseModel):
    context: TutorialContext
    concept: str


class PositiveAffirmationRequest(UUIDModel):
    full_code: CodeBlock


class HintRequest(BaseModel):
    question: Question
    context: TutorialContext


class GiveUpRequest(BaseModel):
    context: TutorialContext
    full_code: CodeBlock


class MoreQuestionsRequest(BaseModel):
    tutorial_uuid: UUID


class ReportQuestionRequest(UUIDModel):
    category: str
    details: str
    should_regenerate: bool
