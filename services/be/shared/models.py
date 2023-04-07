from typing import Any

from pydantic import BaseModel


class CodeBlock(BaseModel):
    code: str
    language: str


class CodeQuestion(BaseModel):
    title: str
    description: str
    skeleton_code: CodeBlock
    solution_code: CodeBlock
    test_cases: list[list[Any] | tuple[Any]]


class Tutorial(BaseModel):
    questions: list[CodeQuestion]


class QuestionContext(BaseModel):
    theme: str
