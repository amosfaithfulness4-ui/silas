import asyncio
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config.database import connect_to_mongo, close_mongo_connection
from routes.student import router as student_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Establish connection to MongoDB at startup
    await connect_to_mongo()
    yield
    # Safely close connection on shutdown
    await close_mongo_connection()

# 1. First, create the app instance
app = FastAPI(lifespan=lifespan)

# 2. PLACE THE CORS MIDDLEWARE RIGHT HERE 
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://silas-8.onrender.com",  # Your live Render frontend link
        "http://localhost:5173",         # Keep this so you can still test locally
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Just pass the router directly without the extra prefix configuration
app.include_router(student_router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Student Farm App Backend API"}