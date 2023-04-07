from typing import List
from uuid import UUID

from pydantic import BaseModel


class CodeBlock(BaseModel):
    code: str
    language: str


class Question(BaseModel):
    uuid: UUID
    title: str
    description: str
    partial_code: CodeBlock
    expected_output: str


class PythonConcept(BaseModel):
    name: str


class QuestionContext(BaseModel):
    theme: str


class NewTutorialRequest(BaseModel):
    context: QuestionContext
    concepts_to_learn: List[PythonConcept]


class NewTutorialResponse(BaseModel):
    uuid: UUID
    questions: List[Question]


class PositiveAffirmationRequest(BaseModel):
    context: QuestionContext
    full_code: CodeBlock


class PositiveAffirmationResponse(BaseModel):
    happy_text: str


class HintRequest(BaseModel):
    context: QuestionContext
    full_code: CodeBlock


class HintResponse(BaseModel):
    hint_text: str


class GiveUpRequest(BaseModel):
    context: QuestionContext
    full_code: CodeBlock


class GiveUpResponse(BaseModel):
    example_solution: str
    explanation: str
    additional_info: str


class MoreQuestionsRequest(BaseModel):
    tutorial_uuid: UUID


class MoreQuestionsResponse(BaseModel):
    questions: List[Question]


class ReportQuestionRequest(BaseModel):
    question_uuid: UUID
    category: str
    details: str
    should_regenerate: bool


class ReportQuestionResponse(BaseModel):
    question: Question
