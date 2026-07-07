from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

# FIX: Change these to uppercase to match your .env file
MONGO_DB = os.getenv("MONGODB_URL")
DB_NAME = os.getenv("DB_NAME")

# FIX: Update the error messages to match the correct variable names too
if not MONGO_DB:
    raise ValueError("Missing MONGODB_URL environment variable")
if not DB_NAME:
    raise ValueError("Missing DB_NAME environment variable")

client = AsyncIOMotorClient(MONGO_DB)
db = client[DB_NAME]

async def connect_to_mongo():
    global client, db
    client = AsyncIOMotorClient(MONGO_DB)
    db = client[DB_NAME]
    print("Connected to MongoDB")

async def close_mongo_connection():
    if client:
        client.close()
        print("Disconnected from MongoDB")