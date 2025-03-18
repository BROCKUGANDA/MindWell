from fastapi import APIRouter
from app.api.v1.endpoints import auth, users, journal, mood

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(journal.router, prefix="/journal", tags=["journal"])
api_router.include_router(mood.router, prefix="/mood", tags=["mood"])
