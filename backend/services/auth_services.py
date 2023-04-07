from fastapi import HTTPException
from database.connection import SessionLocal
import database.operations as db_operation
from models.auth import UserRegisterSchema, User
from utils import hash_password

def create_new_user(user_data: UserRegisterSchema):
    db = SessionLocal()
    if db.query(User).filter(User.email == user_data.email).first():
        raise HTTPException(status_code=400, detail="Данный email занят")
    
    new_user = User(
        fullname=user_data.fullname,
        email=user_data.email,
        password=hash_password(user_data.password)
    )
    
    db_operation.add_in_db(new_user, db)
    return new_user