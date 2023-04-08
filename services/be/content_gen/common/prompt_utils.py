from re import Pattern
from typing import Callable, Generic, TypeVar

from pydantic import BaseModel

_T = TypeVar("_T")
_K = TypeVar("_K")


class Prompt(Generic[_T, _K]):
    def __init__(
        self,
        regex: Pattern[str],
        prompt_text: str,
        parsed_class: type[_K],
        conditionals: list[Callable[[str, _T], str]] | None = None,
    ):
        """
        A class for generating a prompt and parsing the response from the OpenAI
        ChatGPT API.

        :param regex: The regex to use to parse the response
        :param prompt_text: The initial prompt text
        :param parsed_class: The class to use to parse the response
        :param conditionals: A list of functions to call to modify the prompt
            text before the normal string formatting is used. This will use
            the field in the arguments object passed to the create_prompt
            function which have the prefix "_conditional_"
        """
        self.regex: Pattern[str] = regex
        self.prompt_text: str = prompt_text
        self.parsed_class: type[_K] = parsed_class
        self.conditionals: list[Callable[[str, _T], str]] = conditionals or []

    def create_prompt(self, arguments: _T | dict = None) -> str:
        """Creates a prompt for the OpenAI ChatGPT API.

        :param arguments: The arguments to use to format the prompt text. Note:
            the fields in arguments with the prefix _conditional_ will be used
            to modify the prompt text before the normal string formatting is
            used
        """
        temp_prompt = self.prompt_text
        for conditional in self.conditionals:
            temp_prompt = conditional(temp_prompt, arguments)
        if arguments is None:
            return temp_prompt
        if not isinstance(arguments, dict) and not isinstance(arguments, BaseModel):
            raise TypeError("Arguments must be a dict or BaseModel")
        if isinstance(arguments, BaseModel):
            arguments = {k: v for k, v in arguments.dict().items() if not k.startswith("_conditional_")}
        return temp_prompt.format(**arguments)

    def parse(self, response: str, strip: bool = True) -> _K:
        """Parses the text response from the OpenAI ChatGPT API.

        :arg response: The response from the OpenAI ChatGPT API
        :arg strip: Whether to strip whitespace from the parsed values
        :returns: The parsed response object
        :raises: ValueError if the response is unable to be parsed
        """
        matched = self.regex.match(response)
        if matched is None:
            raise ValueError("Invalid prompt format")
        matched_dict = matched.groupdict()
        if strip:
            matched_dict = {k: v.strip() for k, v in matched_dict.items()}

        return self.parsed_class(**matched_dict)
