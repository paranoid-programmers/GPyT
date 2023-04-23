import ast


def extract_function_signature_and_docstring(code: str) -> str:
    # Parse the input code string into an Abstract Syntax Tree (AST)
    parsed_code = ast.parse(code)

    # Initialize an empty string to store function signatures and docstrings
    function_signature_and_docstring = ""

    # Iterate through the top-level nodes in the AST
    for node in parsed_code.body:
        # If the node is a function definition
        if isinstance(node, ast.FunctionDef):
            # Build the function signature using the function name and arguments
            signature = f"def {node.name}("
            signature += ", ".join(
                f"{arg.arg}: {ast.unparse(arg.annotation)}" for arg in node.args.args
            )
            # Append the return type if specified
            if node.returns:
                signature += f") -> {ast.unparse(node.returns)}:"
            else:
                signature += "):"

            # Extract the docstring using the AST utility function
            docstring = ast.get_docstring(node) or ""

            # Format the extracted docstring
            if docstring:
                # Indent the docstring lines, preserving the original formatting
                lines = [docstring.splitlines()[0]]
                for line in docstring.splitlines()[1:]:
                    lines.append(line.replace(line, f"    {line}"))
                docstring = "\n".join(lines)
                extra_new_line = "\n    " if len(lines) > 1 else ""
                docstring = f'"""{docstring}{extra_new_line}"""'

            # Add the function signature and docstring to the output string
            function_signature_and_docstring += f"{signature}\n    {docstring}\n"

    # Return the final string containing all extracted function signatures and docstrings
    return function_signature_and_docstring
