from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from pydantic.tools import lru_cache
from be.api.common.settings import SupabaseSettings
from be.api.hahabusiness.supabase_client import SupabaseWrapper
from be.api.v1.api_v1 import api_v1_router

app = FastAPI(title="api", version="0.0.1", description="")

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


@lru_cache()
def get_supabase_settings():
    return SupabaseSettings()


def get_supabase_client():
    url: str = get_supabase_settings().SUPABASE_URL
    key: str = get_supabase_settings().SUPABASE_KEY
    return SupabaseWrapper(url, key)

@app.get("/alive", response_model=bool, description="Check if the service is alive, always returns true")
async def alive() -> bool:
    return True
