from fastapi import FastAPI

from fastapi.routing import APIRouter
from be.content_gen.v1.api_v1 import api_v1_router

app = FastAPI()

root_router = APIRouter(prefix="/content_gen")
root_router.include_router(api_v1_router)
app.include_router(root_router)


@app.get("/alive", response_model=bool, description="Check if the service is alive, always returns true")
async def alive() -> bool:
    return True
