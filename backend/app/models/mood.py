from typing import Optional, List
from datetime import datetime
from beanie import Document, Link
from pydantic import BaseModel
from .user import User

class MoodLog(Document):
    user: Link[User]
    score: int  # 1-10 scale
    notes: Optional[str] = None
    activities: List[str] = []
    created_at: datetime = datetime.utcnow()
    
    class Settings:
        name = "mood_logs"
        
class MoodCreate(BaseModel):
    score: int
    notes: Optional[str] = None
    activities: List[str] = []
    
class MoodUpdate(BaseModel):
    score: Optional[int] = None
    notes: Optional[str] = None
    activities: Optional[List[str]] = None
