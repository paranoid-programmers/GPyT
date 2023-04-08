FROM python:3.11.3-alpine

WORKDIR /app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY ./services/be/ ./be/

CMD [ "uvicorn", "be.api.main:app", "--host", "0.0.0.0", "--port", "8000" ]
