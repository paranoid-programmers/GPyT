import uuid

from be.api.clients.content_gen_client import get_content_gen_client, get_mock_content_gen_client
from be.api.internal.models import UniqueCodeQuestion, CodeTutorial
from be.api.main import app
from be.api.v1.models.request_models import NewTutorialRequest
from be.api.v1.models.response_models import NewCodeTutorialResponse
from be.shared.models import TutorialContext, CodeBlock, CodeQuestion
from fastapi.testclient import TestClient

client = TestClient(app)

app.dependency_overrides[get_content_gen_client] = get_mock_content_gen_client


def test_alive():
    response = client.get("/api/v1/alive")
    assert response.status_code == 200
    assert response.json() == True


def test_new_code_tutorial():
    tutorial_context = TutorialContext(tone="friendly", interests=["testing code"])
    request = NewTutorialRequest(context=tutorial_context, concept="python dictionaries")

    dummy_codeblock = CodeBlock(code="dummy", language="dummy")
    dummy_question = CodeQuestion(title="dummy", description="dummy", concept="dummy", skeleton_code=dummy_codeblock,
                                  solution_code=dummy_codeblock, test_cases='[("dummy", "dummy")]')
    dummy_unique_question = UniqueCodeQuestion(uuid=uuid.uuid4(), question=dummy_question)
    dummy_tutorial = CodeTutorial(uuid=uuid.uuid4(), context=tutorial_context, questions=[dummy_unique_question])
    expected_response = NewCodeTutorialResponse(tutorial=dummy_tutorial)

    response = client.post("/api/v1/code-tutorial/new-code-tutorial", json=request.json())
    assert response.status_code == 200
    assert response == expected_response
