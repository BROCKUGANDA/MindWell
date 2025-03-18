from sqlalchemy.orm import Session
from sqlalchemy import desc
from . import models, schemas
from app.core.security import get_password_hash, verify_password
from typing import List, Optional

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = models.User(
        email=user.email,
        hashed_password=hashed_password,
        full_name=user.full_name
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user

# Journal Entries
def create_journal_entry(db: Session, entry: schemas.JournalEntryCreate, user_id: int):
    db_entry = models.JournalEntry(
        **entry.dict(),
        user_id=user_id,
        tags=",".join(entry.tags)
    )
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry

def get_user_journal_entries(
    db: Session, user_id: int, skip: int = 0, limit: int = 10
) -> List[models.JournalEntry]:
    return (
        db.query(models.JournalEntry)
        .filter(models.JournalEntry.user_id == user_id)
        .order_by(desc(models.JournalEntry.created_at))
        .offset(skip)
        .limit(limit)
        .all()
    )

def get_journal_entry(db: Session, entry_id: int, user_id: int):
    return (
        db.query(models.JournalEntry)
        .filter(
            models.JournalEntry.id == entry_id,
            models.JournalEntry.user_id == user_id
        )
        .first()
    )

# Mood Logs
def create_mood_log(db: Session, mood: schemas.MoodLogCreate, user_id: int):
    db_mood = models.MoodLog(
        **mood.dict(),
        user_id=user_id,
        activities=",".join(mood.activities)
    )
    db.add(db_mood)
    db.commit()
    db.refresh(db_mood)
    return db_mood

def get_user_mood_logs(
    db: Session, user_id: int, skip: int = 0, limit: int = 10
) -> List[models.MoodLog]:
    return (
        db.query(models.MoodLog)
        .filter(models.MoodLog.user_id == user_id)
        .order_by(desc(models.MoodLog.created_at))
        .offset(skip)
        .limit(limit)
        .all()
    )

def get_mood_log(db: Session, mood_id: int, user_id: int):
    return (
        db.query(models.MoodLog)
        .filter(
            models.MoodLog.id == mood_id,
            models.MoodLog.user_id == user_id
        )
        .first()
    )

def update_mood_log(db: Session, mood_log: models.MoodLog):
    db.commit()
    db.refresh(mood_log)
    return mood_log

def delete_mood_log(db: Session, mood_log: models.MoodLog):
    db.delete(mood_log)
    db.commit()
