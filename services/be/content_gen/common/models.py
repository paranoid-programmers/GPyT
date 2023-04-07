import enum
from uuid import UUID

from be.shared.models import CodeQuestion
from pydantic import BaseModel


class UserTaskRequest(BaseModel):
    user_id: UUID
    interests: list[str]
    concept: str


class OpenAiQuery(BaseModel):
    token_count: int


class CodeTaskCreated(OpenAiQuery):
    code_task: CodeQuestion


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
