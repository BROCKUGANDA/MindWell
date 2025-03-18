from typing import Optional, List
from datetime import datetime
from beanie import Document, Link
from pydantic import BaseModel
from .user import User

class JournalEntry(Document):
    user: Link[User]
    title: str
    content: str
    mood_score: Optional[int] = None  # 1-10 scale
    tags: List[str] = []
    created_at: datetime = datetime.utcnow()
    updated_at: datetime = datetime.utcnow()
    
    class Settings:
        name = "journal_entries"
        
class JournalCreate(BaseModel):
    title: str
    content: str
    mood_score: Optional[int] = None
    tags: List[str] = []
    
class JournalUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    mood_score: Optional[int] = None
    tags: Optional[List[str]] = None
