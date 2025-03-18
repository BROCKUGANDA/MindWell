import sys
print("Python path:", sys.path)

try:
    from app.core.config import settings
    print("Successfully imported settings:", settings.PROJECT_NAME)
except Exception as e:
    print("Error importing settings:", str(e))

try:
    from app.db.database import db
    print("Successfully imported database")
except Exception as e:
    print("Error importing database:", str(e))

try:
    from app.models.user import User
    print("Successfully imported User model")
except Exception as e:
    print("Error importing User model:", str(e))

try:
    from app.core.auth import create_access_token
    print("Successfully imported auth functions")
except Exception as e:
    print("Error importing auth functions:", str(e)) 