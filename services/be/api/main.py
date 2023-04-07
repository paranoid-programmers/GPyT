from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware

from be.api.v1.api_v1 import api_v1_router

app = FastAPI(title="", version="0.0.1", description="")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
root_router = APIRouter(prefix="/api")
root_router.include_router(api_v1_router)
app.include_router(root_router)