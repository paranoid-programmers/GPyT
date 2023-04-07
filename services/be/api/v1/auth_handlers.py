import logging
from jwt import JWT

from fastapi import APIRouter, Depends, Header, HTTPException
from be.api.clients.supabase_client import SupabaseWrapper, get_supabase_client
from typing_extensions import Annotated

auth_router = APIRouter(prefix="/auth", tags=["auth"])
_logger = logging.getLogger(__name__)

SupabaseWrapperType = Annotated[SupabaseWrapper, Depends(get_supabase_client)]


async def get_current_user(supabase_client: SupabaseWrapperType, token: str = Header(...)) -> dict:
    pass
    # try:
    #     payload = JWT.decode(token, get_supabase_client()._api_key)
    #     user_id = payload.get('sub')
    #     if user_id is None:
    #         raise HTTPException(status_code=401, detail='Invalid authentication token')
    #     user = await supabase_client.from_table('users').select('*').eq('id', user_id).single()
    #     if user is None:
    #         raise HTTPException(status_code=401, detail='User not found')
    #     return user
    # except Exception as e:
    #     raise HTTPException(status_code=401, detail='Invalid authentication token')


@auth_router.get("/protected")
def protected(user: dict = Depends(get_current_user)):
    return {'user': user}  # todo: make an actual response


@auth_router.post("/login")
def login(email: str, password: str, supabase_client: SupabaseWrapperType):
    return supabase_client.login(email, password)


@auth_router.post("/register")
def register(email: str, password: str, account_type: str, supabase_client: SupabaseWrapperType):
    res = supabase_client.sign_up(email, password, account_type)
    return res
