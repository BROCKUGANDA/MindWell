from sqlalchemy import Column, String, Boolean, Table
from app.models.base import Base
from app.db.database import metadata
from pydantic import BaseModel, EmailStr
from typing import Optional

# SQLAlchemy model
users = Table(
    "users",
    metadata,
    Column("id", String, primary_key=True, index=True),
    Column("email", String, unique=True, index=True),
    Column("username", String, unique=True, index=True),
    Column("hashed_password", String),
    Column("is_active", Boolean, default=True),
    Column("is_superuser", Boolean, default=False),
)

# Pydantic models
class UserBase(BaseModel):
    email: EmailStr
    username: str

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(UserBase):
    id: str
    is_active: bool = True
    is_superuser: bool = False

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str
