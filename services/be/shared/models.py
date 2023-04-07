from typing import Any

from pydantic import BaseModel


class CodeBlock(BaseModel):
    code: str
    language: str


class Question(BaseModel):
    title: str
    description: str


class CodeQuestion(BaseModel):
    question: Question
    skeleton_code: CodeBlock
    solution_code: CodeBlock
    test_cases: list[list[Any] | tuple[Any]]


class QuestionContext(BaseModel):
    tone: str
    interests: list[str]
