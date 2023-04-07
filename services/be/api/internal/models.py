from uuid import UUID

from be.shared.models import CodeQuestion
from pydantic import BaseModel


class UUIDModel(BaseModel):
    uuid: UUID


class UniqueCodeQuestion(UUIDModel):
    question: CodeQuestion


class Tutorial(BaseModel):
    questions: list[UniqueCodeQuestion]


