from be.shared.models import CodeBlock, CodeQuestion
from fastapi import APIRouter

from be.content_gen.v1.models import (
    CodeTaskCreated,
    Conversation,
    Hint,
    HintCreated,
    UserTaskRequest,
)

api_v1_router = APIRouter(prefix="/v1")


@api_v1_router.post("/task", response_model=CodeQuestion)
def create_question(user_request: UserTaskRequest, token_count: int = 1000):
    return CodeTaskCreated(
        code_task=CodeQuestion(
            title="Return the string given",
            description="Make a function which returns the string given in the input argument",
            skeleton_code=CodeBlock(
                code="def return_string(string):\n    return", language="python"
            ),
            solution_code=CodeBlock(
                code="def return_string(string):\n    return string", language="python"
            ),
            test_cases=[("Hello world!",), ("This is a test",)],
        ),
        token_count=1234,
    )


@api_v1_router.post("/hint")
def get_hint(code_task: CodeQuestion, conversation: Conversation) -> HintCreated:
    return HintCreated(
        hint=Hint(text="You can use the return keyword to return a value"),
        token_count=1234,
    )


@api_v1_router.get("/token_count_estimate", response_model=int)
def get_token_count_estimate(user_interests: list[str], concept: str) -> int:
    return 3
