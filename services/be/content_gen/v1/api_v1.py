from fastapi import APIRouter

from be.content_gen.v1.response_models import GenerateCodeQuestionResponse, GenerateTextResponse
from be.content_gen.v1.request_models import GenerateCodeHintRequest, GenerateQuestionRequest
from be.shared.models import CodeBlock, CodeQuestion, Question

api_v1_router = APIRouter(prefix="/v1")


@api_v1_router.post("/generate-question", response_model=GenerateCodeQuestionResponse)
async def create_question(user_request: GenerateQuestionRequest):
    return GenerateCodeQuestionResponse(
        code_question=CodeQuestion(
            question=Question(
                title="Return the string given",
                description="Make a function which returns the string given in the input argument",
            ),
            skeleton_code=CodeBlock(
                code="def return_string(string):\n    [your code here]",
                language="python",
            ),
            solution_code=CodeBlock(
                code="def return_string(string):\n    return string", language="python"
            ),
            test_cases=[("Hello world!",), ("This is a test",)],
        ),
        tokens_used=1234,
    )


@api_v1_router.post("/hint", response_model=GenerateTextResponse)
async def get_hint(hint_request: GenerateCodeHintRequest) -> GenerateTextResponse:
    return GenerateTextResponse(
        text="You can use the return keyword to return a value",
        tokens_used=1234,
    )


@api_v1_router.post("/give-up", response_model=GenerateTextResponse)
async def give_up(hint_request: GenerateCodeHintRequest) -> GenerateTextResponse:
    return GenerateTextResponse(
        text="Wow you suck, it was pretty simple my dude",
        tokens_used=1234,
    )
