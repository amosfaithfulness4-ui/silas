from motor.motor_asyncio import AsyncIOMotorClient
import os
from pathlib import Path
from dotenv import load_dotenv

base_dir = Path(__file__).resolve().parent.parent
dotenv_path = base_dir / ".env"
if not dotenv_path.exists():
    dotenv_path = base_dir / "schemas" / ".env"
load_dotenv(dotenv_path)

MONGODB_URL = os.getenv("MONGODB_URL")
DB_NAME = os.getenv("DB_NAME")

if MONGODB_URL is None or DB_NAME is None:
    raise RuntimeError(
        f"Missing required environment variables: MONGODB_URL={MONGODB_URL!r}, DB_NAME={DB_NAME!r}. "
        f"Searched {dotenv_path}"
    )

client = AsyncIOMotorClient(MONGODB_URL)

db = client[DB_NAME]