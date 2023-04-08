from uuid import UUID

from be.api.internal.models import UUIDModel
from be.shared.models import TutorialContext, CodeBlock
from pydantic import BaseModel


class NewTutorialRequest(BaseModel):
    context: TutorialContext
    concept: str


class PositiveAffirmationRequest(BaseModel):
    tutorial_uuid: UUID
    attempts_taken: int


class HintRequest(BaseModel):
    tutorial_uuid: UUID
    question_uuid: UUID
    user_code: CodeBlock


class GiveUpRequest(BaseModel):
    tutorial_uuid: UUID
    question_uuid: UUID
    user_code: CodeBlock


class MoreQuestionsRequest(BaseModel):
    tutorial_uuid: UUID


class ReportQuestionRequest(UUIDModel):
    category: str
    details: str
    should_regenerate: bool
