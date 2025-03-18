from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from bson import ObjectId

class MoodEntry(BaseModel):
    id: Optional[str] = Field(alias="_id", default=None)
    user_id: str
    mood_level: int = Field(ge=1, le=10)
    notes: str
    tags: List[str] = []
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class JournalEntry(BaseModel):
    id: Optional[str] = Field(alias="_id", default=None)
    user_id: str
    title: str
    content: str
    mood_reference: Optional[str] = None
    tags: List[str] = []
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class ChatMessage(BaseModel):
    id: Optional[str] = Field(alias="_id", default=None)
    user_id: str
    content: str
    sender_type: str = Field(regex='^(user|ai)$')
    sentiment: Optional[float] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class Resource(BaseModel):
    id: Optional[str] = Field(alias="_id", default=None)
    title: str
    description: str
    category: str
    tags: List[str] = []
    url: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class CrisisAssessment(BaseModel):
    id: Optional[str] = Field(alias="_id", default=None)
    user_id: str
    content: str
    risk_level: int = Field(ge=1, le=5)
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    recommendations: List[str] = []

class ProfessionalReferral(BaseModel):
    id: Optional[str] = Field(alias="_id", default=None)
    name: str
    specialty: str
    location: str
    contact: str
    available: bool = True
    rating: Optional[float] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow) 