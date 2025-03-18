from sqlalchemy import create_engine
from app.core.config import settings
from app.db.database import metadata

# Create tables
def init_db():
    engine = create_engine(settings.DATABASE_URL)
    metadata.create_all(engine)

if __name__ == "__main__":
    init_db()
    print("Database initialized.") 