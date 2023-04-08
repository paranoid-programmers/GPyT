import logging

from be.api.v1.models.request_models import OAuthRequest
from be.api.v1.models.response_models import OAuthResponseWrapper
from fastapi import APIRouter, Depends, Header
from be.api.clients.supabase_client import SupabaseWrapper, get_supabase_client
from typing import Annotated

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
async def protected(user: dict = Depends(get_current_user)):
    return {'user': user}  # todo: make an actual response


@auth_router.post("/login-via-github")
async def login_via_github(request: OAuthRequest, supabase_client: SupabaseWrapperType) -> OAuthResponseWrapper:
    return await supabase_client.oauth_sign_in('github')
