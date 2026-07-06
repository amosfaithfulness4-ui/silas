from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

# 1. Update these to match your uppercase .env keys perfectly!
MONGO_DB = os.getenv("MONGODB_URL")
DB_NAME = os.getenv("DB_NAME")

# 2. Update the checks to match the updated variables
if not MONGO_DB:
    raise ValueError("Missing MONGODB_URL environment variable")
if not DB_NAME:
    raise ValueError("Missing DB_NAME environment variable")

client = None
db = None

async def connect_to_mongo():
    global client, db
    client = AsyncIOMotorClient(MONGO_DB)
    db = client[DB_NAME]
    print("Connected to MongoDB successfully!")

async def close_mongo_connection():
    global client
    if client:
        client.close()
        print("Disconnected from MongoDB")