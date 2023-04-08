from re import Pattern
from typing import Generic, TypeVar

from pydantic import BaseModel

_T = TypeVar("_T")
_K = TypeVar("_K")


class Prompt(Generic[_T, _K]):
    def __init__(self, regex: Pattern[str], prompt_text: str, parsed_class: type[_K]):
        self.regex: Pattern[str] = regex
        self.prompt_text: str = prompt_text
        self.parsed_class: type[_K] = parsed_class

    def create_prompt(self, arguments: _T | dict = None) -> str:
        """Creates a prompt for the OpenAI ChatGPT API."""
        if arguments is None:
            return self.prompt_text
        if not isinstance(arguments, dict) and not isinstance(arguments, BaseModel):
            raise TypeError("Arguments must be a dict or BaseModel")
        if isinstance(arguments, BaseModel):
            arguments = arguments.dict()
        return self.prompt_text.format(**arguments)

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
