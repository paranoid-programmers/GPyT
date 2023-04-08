from typing import Optional
from uuid import UUID
from be.shared.models import CodeQuestion, TutorialContext
from pydantic import BaseModel


class UUIDModel(BaseModel):
    uuid: Optional[UUID]

    class Config:
        json_encoders = {
            Optional[UUID]: lambda v: str(v) if v else None,
        }


class UniqueCodeQuestion(UUIDModel):
    question: CodeQuestion


class Tutorial(UUIDModel):
    context: TutorialContext


class CodeTutorial(Tutorial):
    questions: list[UniqueCodeQuestion]


class ReportedQuestion(UUIDModel):
    reported_question: UniqueCodeQuestion
    category: str
    details: str
    was_regenerated: bool