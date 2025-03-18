from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.endpoints import auth, mental_health, mood, journal, chat, users
from app.db.database import db

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.PROJECT_VERSION,
    description="MindWell - Mental Health Support Application API"
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database connection events
@app.on_event("startup")
async def startup_db_client():
    await db.connect()

@app.on_event("shutdown")
async def shutdown_db_client():
    await db.disconnect()

# Root endpoint
@app.get("/")
def read_root():
    return {
        "app_name": settings.PROJECT_NAME,
        "version": settings.PROJECT_VERSION,
        "description": "Welcome to MindWell API",
        "docs_url": "/docs",
        "api_prefix": "/api/v1"
    }

# Include API routers
app.include_router(
    auth.router,
    prefix=f"{settings.API_V1_STR}/auth",
    tags=["authentication"]
)

app.include_router(
    mental_health.router,
    prefix=settings.API_V1_STR,
    tags=["mental_health"]
)

app.include_router(
    mood.router,
    prefix=f"{settings.API_V1_STR}/mood",
    tags=["mood"]
)

app.include_router(
    journal.router,
    prefix=f"{settings.API_V1_STR}/journal",
    tags=["journal"]
)

app.include_router(
    chat.router,
    prefix=f"{settings.API_V1_STR}/chat",
    tags=["chat"]
)

app.include_router(
    users.router,
    prefix=f"{settings.API_V1_STR}/users",
    tags=["users"]
)