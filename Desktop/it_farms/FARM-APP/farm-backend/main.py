import asyncio
from fastapi import FastAPI 
from config.database import db
from routes.student import student_router

app = FastAPI(
    title="A student FARM APP",
    description="This is a student Farm app"
)

@app.get("/")
async def home():
    return {"message": "Farm API Running"}

@app.get("/test-db")
async def test_db():
    collections = await db.list_collection_names()

    return { 
        "status": "Connected Successfully",
        "collections": collections
    }

app.include_router(student_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

