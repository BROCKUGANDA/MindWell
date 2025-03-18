from typing import List, Optional
from pydantic import BaseModel, EmailStr
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    full_name: str

class UserCreate(UserBase):
    password: str

class UserUpdate(UserBase):
    password: Optional[str] = None

class User(UserBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        orm_mode = True

class JournalEntryBase(BaseModel):
    title: str
    content: str
    mood_score: Optional[int] = None
    tags: List[str] = []

class JournalEntryCreate(JournalEntryBase):
    pass

class JournalEntryUpdate(JournalEntryBase):
    title: Optional[str] = None
    content: Optional[str] = None
    mood_score: Optional[int] = None
    tags: Optional[List[str]] = None

class JournalEntry(JournalEntryBase):
    id: int
    created_at: datetime
    updated_at: datetime
    user_id: int

    class Config:
        orm_mode = True

class MoodLogBase(BaseModel):
    score: int
    notes: Optional[str] = None
    activities: List[str] = []

class MoodLogCreate(MoodLogBase):
    pass

class MoodLogUpdate(MoodLogBase):
    score: Optional[int] = None
    notes: Optional[str] = None
    activities: Optional[List[str]] = None

class MoodLog(MoodLogBase):
    id: int
    created_at: datetime
    user_id: int

    class Config:
        orm_mode = True
