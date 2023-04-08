import asyncio
import json
import logging
import time

import openai
from typing import TypeVar

from be.content_gen.common.prompts import (
    BasicQuestionPromptArguments,
    BasicQuestionTask,
    CodeHintPromptArguments,
    GiveUpPromptArguments,
    Prompt,
    code_hint_prompt,
    give_up_prompt,
    question_example_input_prompt,
    question_prompt,
    question_validation_prompt,
)
from be.shared.models import CodeBlock, CodeQuestion, Question, TutorialContext

_logger = logging.getLogger(__name__)


async def ask_chatgpt(prompt: str) -> (str, int):
    """Asks the OpenAI ChatGPT API for a response."""
    _logger.info(
        "sending prompt to chatgpt: %s",
        json.dumps((prompt[:100] + "...") if len(prompt) > 103 else prompt),
    )
    request_start = time.time()
    response = await openai.ChatCompletion.acreate(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": prompt,
            },
        ],
        stream=False,
    )
    _logger.debug(
        "got response - (tokens used: %d) - took %s seconds",
        response.usage.total_tokens,
        time.time() - request_start,
    )
    return response.choices[0].message.content, response.usage.total_tokens


_T = TypeVar("_T")
_K = TypeVar("_K")


async def interact_gpt(prompt: Prompt[_T, _K], prompt_argument: _T = None) -> (_K, int):
    """
    Creates the prompt and sends it to ChatGPT, then parses the response.

    :raises: ValueError if the response is unable to be parsed
    """
    prompt_string = prompt.create_prompt(prompt_argument)
    gpt_response, tokens_used = await ask_chatgpt(prompt_string)
    parsed_response = prompt.parse(gpt_response)
    return parsed_response, tokens_used


async def create_question_task(
    concept: str, context: TutorialContext
) -> tuple[BasicQuestionTask, int]:
    parsed_question, tokens_used = await interact_gpt(
        question_prompt,
        BasicQuestionPromptArguments(
            concept=concept, interests_list=context.interests, tone=context.tone
        ),
    )
    return parsed_question, tokens_used


async def validate_question(parsed_task: BasicQuestionTask) -> (bool, int):
    _logger.debug("validating")
    parsed_validation, tokens_used = await interact_gpt(
        question_validation_prompt, parsed_task
    )
    return parsed_validation.valid_question(), tokens_used


async def get_examples(parsed_task: BasicQuestionTask) -> (list[str], int):
    _logger.debug("getting examples")
    parsed_examples, tokens_used = await interact_gpt(
        question_example_input_prompt, parsed_task
    )
    return parsed_examples.response_text, tokens_used


async def create_full_question(
    concept: str, context: TutorialContext
) -> (CodeQuestion, int):
    basic_question, total_tokens_used = await create_question_task(concept, context)
    while True:
        (
            (question_is_valid, is_valid_tokens),
            (example_inputs, example_tokens),
        ) = await asyncio.gather(
            validate_question(basic_question), get_examples(basic_question)
        )
        total_tokens_used += is_valid_tokens + example_tokens
        if question_is_valid:
            return (
                CodeQuestion(
                    title=basic_question.title,
                    description=basic_question.description,
                    concept=concept,
                    skeleton_code=CodeBlock(code="your mum", language="python"),
                    solution_code=CodeBlock(
                        code=basic_question.solution_code, language="python"
                    ),
                    test_cases=eval(example_inputs),
                ),
                total_tokens_used,
            )


async def create_code_hint(
    question: Question, context: TutorialContext, user_code: CodeBlock
) -> (str, int):
    _logger.debug("creating code hint")
    hint, tokens_used = await interact_gpt(
        code_hint_prompt,
        CodeHintPromptArguments(
            title=question.title,
            description=question.description,
            user_code=user_code.code,
            tone=context.tone,
        ),
    )
    return hint.response_text, tokens_used


async def create_give_up_explanation(
    question: Question,
    context: TutorialContext,
    user_code: CodeBlock,
    solution_code: CodeBlock,
) -> (str, int):
    _logger.debug("creating give up explanation")
    explanation, tokens_used = await interact_gpt(
        give_up_prompt,
        GiveUpPromptArguments(
            title=question.title,
            description=question.description,
            user_code=user_code.code,
            solution_code=solution_code.code,
            tone=context.tone,
        ),
    )
    return explanation.response_text, tokens_used
