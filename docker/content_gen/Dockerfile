FROM python:3.11.3-alpine

WORKDIR /app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY ./src/be/ ./be/

CMD [ "uvicorn", "be.content_gen.main:app", "--host", "0.0.0.0", "--port", "8001" ]
