import os
from typing import List, Optional
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from bson import ObjectId
import motor.motor_asyncio  # Assuming you use MongoDB/Motor based on your previous logs

app = FastAPI(title="Student Farm Portal API")

# 1. FIX CORS RULES (Prevents Network Errors from the browser)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows any frontend (local or deployed) to connect
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB Configuration (Fallbacks to local if environment variable isn't set)
MONGO_DETAILS = os.getenv("MONGO_URI", "mongodb://localhost:27017")
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)
db = client.farm_database
students_collection = db.get_collection("students")
admins_collection = db.get_collection("admins")


# ==========================================
# 2. PYDANTIC SCHEMAS (Matches React Keys)
# ==========================================

# Matches your handleLogin payload
class LoginRequest(BaseModel):
    email: EmailStr
    password: str
    role: str  # "admin" or "student"


# Matches your handleSubmit payload
class StudentCreate(BaseModel):
    student_name: str
    student_email: EmailStr
    student_phone_no: str
    student_password: str
    student_level: int
    student_gpa: float
    student_cgpa: float
    admin_id: Optional[str] = None


# Helper to format MongoDB document IDs safely for React
def student_helper(student) -> dict:
    return {
        "id": str(student["_id"]),
        "student_name": student.get("student_name"),
        "student_email": student.get("student_email"),
        "student_phone_no": student.get("student_phone_no"),
        "student_level": student.get("student_level", 0),
        "student_gpa": student.get("student_gpa", 0.0),
        "student_cgpa": student.get("student_cgpa", 0.0),
        "admin_id": student.get("admin_id"),
    }


# ==========================================
# 3. ROUTES & ROUTE HANDLERS
# ==========================================

@app.post("/login")
async def login(payload: LoginRequest):
    """
    Handles authentication. Formats keys so React's currentUser 
    can read .name and .email seamlessly.
    """
    email_query = payload.email.lower()
    
    if payload.role == "admin":
        # Search admin collection
        admin = await admins_collection.find_one({"email": email_query})
        # DEMO FALLBACK: matching your code helper prompt fallback
        if not admin and email_query == "sonjaxsilas@proton.me" and payload.password == "1q2w3e4r":
            return {
                "id": "admin_demo_id",
                "role": "admin",
                "name": "Sonja Silas",
                "email": "sonjaxsilas@proton.me"
            }
            
        if not admin or admin["password"] != payload.password:
            raise HTTPException(status_code=401, detail="Invalid Admin email or password")
            
        return {
            "id": str(admin["_id"]),
            "role": "admin",
            "name": admin.get("name", "Admin User"),
            "email": admin["email"]
        }
        
    elif payload.role == "student":
        # Search student collection using student_email
        student = await students_collection.find_one({"student_email": email_query})
        if not student or student["student_password"] != payload.password:
            raise HTTPException(status_code=401, detail="Invalid Student email or password")
            
        # Map student_name/email -> name/email for React's currentUser profile layout
        return {
            "id": str(student["_id"]),
            "role": "student",
            "name": student.get("student_name"),
            "email": student.get("student_email"),
            "student_level": student.get("student_level", 0),
            "student_gpa": student.get("student_gpa", 0.0),
            "student_cgpa": student.get("student_cgpa", 0.0)
        }
        
    raise HTTPException(status_code=400, detail="Invalid role specified")


@app.post("/students", status_code=status.HTTP_201_CREATED)
async def add_student(student_data: StudentCreate):
    """
    Creates a new student record after cross-checking duplicates.
    """
    # Check for existing email duplicate
    existing_email = await students_collection.find_one({"student_email": student_data.student_email.lower()})
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already exists!")

    # Check for existing phone number duplicate
    existing_phone = await students_collection.find_one({"student_phone_no": student_data.student_phone_no})
    if existing_phone:
        raise HTTPException(status_code=400, detail="Phone number already exists!")

    # Convert Pydantic data to safe Dictionary to insert into DB
    new_student_dict = student_data.dict()
    new_student_dict["student_email"] = new_student_dict["student_email"].lower()
    
    result = await students_collection.insert_one(new_student_dict)
    inserted_student = await students_collection.find_one({"_id": result.inserted_id})
    
    return student_helper(inserted_student)


@app.get("/students", response_model=List[dict])
async def get_all_students():
    """
    Fetches all student records for the admin dashboard.
    """
    students = []
    async for student in students_collection.find():
        students.append(student_helper(student))
    return students


@app.delete("/students/{student_id}")
async def delete_student(student_id: str):
    """
    Deletes a specific student record by string ID reference.
    """
    try:
        object_id = ObjectId(student_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid database ID format")

    delete_result = await students_collection.delete_one({"_id": object_id})
    
    if delete_result.deleted_count == 1:
        return {"message": "Student successfully deleted"}
        
    raise HTTPException(status_code=404, detail="Student record not found")