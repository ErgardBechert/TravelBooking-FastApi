from fastapi import Form
from pydantic import BaseModel, EmailStr
from sqlalchemy import Column, Integer, String
from database.connection import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    fullname = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)

class UserRegisterSchema(BaseModel):
    fullname: str = Form()
    email: EmailStr = Form()
    password: str = Form()

class UserLoginSchema(BaseModel):
    email: EmailStr = Form()
    password: str = Form()


