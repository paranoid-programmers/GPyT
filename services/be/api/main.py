from fastapi import FastAPI, APIRouter
from be.api.v1.api_v1 import api_v1_router

app = FastAPI(title="api", version="0.0.1", description="")

root_router = APIRouter(prefix="/api")
root_router.include_router(api_v1_router)
app.include_router(root_router)
