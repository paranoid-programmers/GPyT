from uuid import UUID

from be.shared.models import CodeQuestion, TutorialContext
from pydantic import BaseModel


class UUIDModel(BaseModel):
    uuid: UUID


class UniqueCodeQuestion(UUIDModel):
    question: CodeQuestion


class Tutorial(BaseModel):
    context: TutorialContext


class CodeTutorial(Tutorial):
    questions: list[UniqueCodeQuestion]
