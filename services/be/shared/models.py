from typing import Any

from pydantic import BaseModel


class CodeBlock(BaseModel):
    code: str
    language: str


class Question(BaseModel):
    title: str
    description: str
    concept: str
    is_flagged: bool = False


class CodeQuestion(Question):
    skeleton_code: CodeBlock
    solution_code: CodeBlock
    test_cases: list[list[Any] | tuple[Any]]


class TutorialContext(BaseModel):
    tone: str
    interests: list[str]
