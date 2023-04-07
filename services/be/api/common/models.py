from typing import List

from pydantic import BaseModel


class Question(BaseModel):
    guid: str
    title: str
    description: str
    partial_code: str
    expected_output: str


class PythonConcept(BaseModel):
    name: str


class QuestionContext(BaseModel):
    theme: str


class NewTutorialRequest(BaseModel):
    context: QuestionContext
    concepts_to_learn: List[PythonConcept]


class NewTutorialResponse(BaseModel):
    uuid: str
    questions: List[Question]


class PositiveAffirmationRequest(BaseModel):
    context: QuestionContext
    full_code: str


class PositiveAffirmationResponse(BaseModel):
    happy_text: str


class HintRequest(BaseModel):
    context: QuestionContext
    full_code: str


class HintResponse(BaseModel):
    hint_text: str


class GiveUpRequest(BaseModel):
    context: QuestionContext
    full_code: str


class GiveUpResponse(BaseModel):
    example_solution: str
    explanation: str
    additional_info: str


class MoreQuestionsRequest(BaseModel):
    tutorial_uuid: str


class MoreQuestionsResponse(BaseModel):
    questions: List[Question]


class ReportQuestionRequest(BaseModel):
    question_uuid: str
    category: str
    details: str
    should_regenerate: bool


class ReportQuestionResponse(BaseModel):
    question: Question
