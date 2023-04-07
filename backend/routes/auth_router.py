from fastapi import APIRouter
from models.auth import UserRegisterSchema
from services.auth_services import create_new_user


router = APIRouter()


@router.post("/register")
def register(user: UserRegisterSchema):
    return create_new_user(user)

