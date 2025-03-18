from databases import Database
from sqlalchemy import create_engine, MetaData
from app.core.config import settings

# SQLAlchemy
engine = create_engine(settings.DATABASE_URL)
metadata = MetaData()

# Databases query builder
database = Database(settings.DATABASE_URL)

# Export for use in other modules
db = database
