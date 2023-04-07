import logging

from typing import Any
from fastapi import APIRouter, Depends
from be.api.hahabusiness.supabase_client import SupabaseWrapper
from be.api.main import get_supabase_client
from typing_extensions import Annotated

auth_router = APIRouter(prefix="/auth", tags=["auth"])
_logger = logging.getLogger(__name__)


@auth_router.get("/login")
def login(email: str, password: str, supabase_client: Annotated[SupabaseWrapper, Depends(get_supabase_client)]):
    return supabase_client.login(email, password)


@auth_router.get("/register")
def register(email: str, password: str, account_type: str, supabase_client: Annotated[SupabaseWrapper, Depends(get_supabase_client)]) -> Any:
    res = supabase_client.sign_up(email, password, account_type)
    return res
