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

app = FastAPI(lifespan=lifespan)

# Enable CORS so your React frontend on port 5173 can send requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register the student routes
app.include_router(student_router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Student Farm App Backend API"}