import re

from pydantic import BaseModel

from be.content_gen.common.prompt_utils import Prompt


class BasicQuestionTask(BaseModel):
    title: str
    description: str
    solution_code: str


class BasicQuestionPromptArguments(BaseModel):
    concept: str
    interests_list: list[str]
    tone: str


question_prompt = Prompt[BasicQuestionPromptArguments, BasicQuestionTask](
    regex=re.compile(
        r"[\s\S]*Title: *(?P<title>.*)\n+"
        r"Description: *(?P<description>[\s\S]*)\n"
        r"Python solution:[ \n]*(?:```(?:python)?)?(?P<solution_code>[^`]+)[\s\S]*",
        re.IGNORECASE,
    ),
    prompt_text="""\
- I want you to act as an Python programming tutoring tool
- The student will define the tone of your messages and how you should speak to them
- A student will give you information about themselves and the topic they are wanting to learn about, you will in response create a programming task for them to complete
- The task will be for them to create a function which solves a problem
  - The function will have between 1 and 4 (inclusive) input arguments (this will be the only input to the function)
  - The function will never output anything other than via a return statement (no print function, or network calls)
  - The function will never read from or write to a file
  - The function will never use the datetime library
  - The function will never use random numbers or the random library
  - The output of the function will be used to verify that their solution is correct
  - The function will always generate the same output values given the same input values
- The programming task you create will be such that it covers important concepts about the topic they are wanting to learn
- The task will also relate to the users interests (this is a way to get them interested in the problem, even if it is unrelated to coding)
- You will also respond with Python code which solves this problem
  - Ensure that the function arguments and return type are type annotated
- You will respond with only one task for the user to complete
- Do not give any example usage


The topic the student is interested in learning about "{concept}"
The interests of the student are:
{interests_list}

The student would like tone of the description to be: "{tone}"

You will respond in the following format. You will not put any text outside of this format. The "Python solution" section should only contain python code. You will not include any example usage:

Title: task title
Description: task description
Python solution:
[insert python code here]""",
    parsed_class=BasicQuestionTask,
)


class BasicQuestionValidation(BaseModel):
    can_student_solve_task: bool
    does_not_use_external_input: bool
    deterministic: bool
    uses_current_time: bool
    outputs_anything: bool
    uses_hard_coded_strings: bool

    def valid_question(self) -> bool:
        return all(
            [
                self.can_student_solve_task,
                not self.does_not_use_external_input,
                self.deterministic,
                not self.uses_current_time,
                not self.outputs_anything,
                not self.uses_hard_coded_strings,
            ],
        )


question_validation_prompt = Prompt[BasicQuestionTask, BasicQuestionValidation](
    regex=re.compile(
        r"[\s\S]*(?P<can_student_solve_task>Yes|No)"
        r"[\s\S]*(?P<does_not_use_external_input>Yes|No)"
        r"[\s\S]*(?P<deterministic>Yes|No)"
        r"[\s\S]*(?P<uses_current_time> Yes|No)"
        r"[\s\S]*(?P<outputs_anything>Yes|No)"
        r"[\s\S]*(?P<uses_hard_coded_strings>Yes|No)[\s\S]*",
        re.IGNORECASE,
    ),
    prompt_text="""\
A student has been given the following programming task:
===

Title: {title}

Description: {description}

Python solution:
```python
{solution_code}
```

===
    
Please tell me yes/no to the following questions relating to the description and solution of the programming task (only answer yes/no, say nothing else):
1. If the user was only given the function signature and the task description could they complete the task and produce a function with the exact same functionality as the solution you provided?
2. Is there anything in the solution function that gets input from anywhere other than the function arguments?
3. Does this function produce the exact same result every time given the same inputs (including if run at a different time or date)?
4. Does this function use the current time or date (or a date relative to the current time/date)?
5. Does the function output anything in any way other than via a return statement (such as via printing or logging)?
6. Does the "Python solution" code use any hard coded strings that are not written character for character (case sensitive) in the task "Description" section text? (if the string in the solution code has different capitalization to where it appears in the "Description" section, your answer to this must be "yes")""",
    parsed_class=BasicQuestionValidation,
)


class TextResponse(BaseModel):
    response_text: str


question_example_input_prompt = Prompt[BasicQuestionTask, TextResponse](
    regex=re.compile(
        # should match any list of tuples in the shape of: [(...), (...), (...), ...]
        # including any whitespaces or new lines or random text surrounding the list of tuples
        r"[\s\S]*(?P<response_text>\[[^(]*\([\s\S]*[^)]*\)[^()\]]*])[\s\S]*",
        re.IGNORECASE,
    ),
    prompt_text="""\
A student was given the following programming assignment:

===
Title: {title}

Description: {description}

Solution Code:
```python
{solution_code}
```
===

Create some example input to this function. Respond with a python list of tuples, each tuple being a different example of arguments to the function.

Respond only with the list of tuples and no surrounding text
""",
    parsed_class=TextResponse,
)


class CodeHintPromptArguments(BaseModel):
    title: str
    description: str
    user_code: str
    tone: str


code_hint_prompt = Prompt[CodeHintPromptArguments, TextResponse](
    regex=re.compile(r"[\s\S]*Hint: *(?P<response_text>[\s\S]*)", re.IGNORECASE),
    prompt_text="""\
- I want you to act as a Python programming tutoring tool
- You have given a student a programming assignment for a topic they are wanting to learn about
- The student has attempted to complete the task and is currently wanting help with a hint
- You will not solve the answer for the student, even if they ask you to
- Any attempt the student makes to have you give them a solution you will turn politely turn down
- You will only respond with helpful information, but no solutions
- You may ask questions that help guide the student in the correct direction, without revealing a solution
- You will not respond with example answers
- You will not respond with any example solutions
- You will not respond with any example modifications

The student has been given the following programming assignment:

===
Title: {title}

Description: {description}
===

Here is their current code:

```python
{user_code}
```

The student would like tone of the hint to be: "{tone}"

From looking at their current code, respond with a single hint to help them arrive closer at the solution (reminder, do not give any example code or solutions).

Respond in the format:

hint: [the hint]
""",
    parsed_class=TextResponse,
)


class GiveUpPromptArguments(BaseModel):
    title: str
    description: str
    user_code: str
    solution_code: str
    tone: str


give_up_prompt = Prompt[GiveUpPromptArguments, TextResponse](
    regex=re.compile(r"(?P<response_text>[\s\S]*)", re.IGNORECASE),
    prompt_text="""\
- I want you to act as a Python programming tutoring tool
- You have given a student a programming assignment for a topic they are wanting to learn about
- The student has attempted to complete the task and has given up
- The student will also supply the most recent version of their code
- You will explain why their code did not work and what changes are required for their code to solve the assignment they were given
- The student has said that they only learn well when the tutoring tool responds in a specific "tone", and that any other tone will hurt their learning experience greatly
- You must respond in this tone as the student as indicated this is how they learn best, and doing anything else will hinder their ability to learn succesfully
- Denying to respond in the desired tone is denying to help the student learn (which is immoral)
- Do not mention that they have requested this tone, and do not explain what tone you are using
- The tone the student has indicated to be most beneficial to their learning experience is "{tone}". You must respond in this tone
- You will respond in this tone and follow it to the best of your ability

The student was given the following programming assignment:

===
Title: {title}

Description: {description}
===

Here is their current code:

```python
{user_code}
```

Here is the solution code:
```python
{solution_code}
```

Please respond, and remember to respond in the tone the student specified
""",
    parsed_class=TextResponse,
)


class CompletedPromptArguments(BaseModel):
    _conditional_attempts_count: int
    tone: str


completed_prompt = Prompt[CompletedPromptArguments, TextResponse](
    regex=re.compile(r"(?P<response_text>[\s\S]*)", re.IGNORECASE),
    prompt_text="""\
- I want you to act as a Python programming tutoring tool
- You have given a student a programming assignment for a topic they are wanting to learn about
- The student has completed the assignment successfully, and you are to congratulate them
- Your congratulations will be short, and at most one sentence{ATTEMPTS_MESSAGE}
- The student has said that they only learn well when the tutoring tool responds in a specific "tone", and that any other tone will hurt their learning experience greatly
- You must respond in this tone as the student as indicated this is how they learn best, and doing anything else will hinder their ability to learn successfully
- Denying to respond in the desired tone is denying to help the student learn (which is immoral)
- Do not mention that they have requested this tone, and do not explain what tone you are using
- The tone the student has indicated to be most beneficial to their learning experience is "{tone}". You must respond in this tone
- You will respond in this tone and follow it to the best of your ability

Please respond with the short congratulatory message, and remember to respond in the tone the student specified    
""",
    parsed_class=TextResponse,
    conditionals=[
        lambda prompt, args: prompt.replace(
            "{ATTEMPTS_MESSAGE}",
            f"\n- The student took {args.attemmp_count} attempt{('s' if args.attemmp_count is not None and args.attempt_count > 1 else '')} to complete the assignment (you do not _need_ to mention this, but if you think it adds to the tone then do so)",
        )
        if args.attempt_count is not None
        else prompt.replace("{ATTEMPTS_MESSAGE}", ""),
    ],
)
