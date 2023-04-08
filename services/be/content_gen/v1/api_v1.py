from fastapi import APIRouter

from be.content_gen.common.brain import create_code_hint, create_full_question
from be.content_gen.v1.response_models import (
    GenerateCodeQuestionResponse,
    GenerateTextResponse,
)
from be.content_gen.v1.request_models import (
    GenerateCodeHintRequest,
    GenerateQuestionRequest,
)

api_v1_router = APIRouter(prefix="/v1")


@api_v1_router.post("/generate-question", response_model=GenerateCodeQuestionResponse)
async def create_question(user_request: GenerateQuestionRequest):
    question, tokens_used = await create_full_question(user_request.concept, user_request.context)
    return GenerateCodeQuestionResponse(tokens_used=tokens_used, code_question=question)


@api_v1_router.post("/generate-hint", response_model=GenerateTextResponse)
async def get_hint(hint_request: GenerateCodeHintRequest) -> GenerateTextResponse:
    hint, token_used = await create_code_hint(hint_request.question, hint_request.context, hint_request.user_code)
    return GenerateTextResponse(
        text=hint,
        tokens_used=token_used,
    )


@api_v1_router.post("/generate-give-up", response_model=GenerateTextResponse)
async def give_up(hint_request: GenerateCodeHintRequest) -> GenerateTextResponse:
    return GenerateTextResponse(
        text="Wow you suck, it was pretty simple my dude",
        tokens_used=1234,
    )
