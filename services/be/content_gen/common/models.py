import enum
from typing import Any
from uuid import UUID

from pydantic import BaseModel


class UserTaskRequest(BaseModel):
    user_id: UUID
    interests: list[str]
    concept: str


class CodeTask(BaseModel):
    title: str
    description: str
    skeleton_code: str
    solution_code: str
    test_cases: list[list[Any] | tuple[Any]]


class OpenAiQuery(BaseModel):
    token_count: int


class CodeTaskCreated(OpenAiQuery):
    code_task: CodeTask


class Hint(BaseModel):
    text: str


class HintCreated(OpenAiQuery):
    hint: Hint


class ChatRole(str, enum.Enum):
    USER = "user"
    SYSTEM = "system"
    ASSISTANT = "assistant"


class ChatMessage(BaseModel):
    role: ChatRole
    content: str

    class Config:
        use_enum_values = True


Conversation = list[ChatMessage]
