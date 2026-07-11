from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List, Optional
import uvicorn

app = FastAPI(title="Student Farm App API")

# Enable CORS so your Render frontend can communicate with this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins; narrow this down to your production URL later if desired
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- DATABASE MODELS (MOCK) ---
# In-memory store for demo/testing purposes
ADMIN_DB = {
    "sonjaxsilas@proton.me": {
        "id": "admin_1",
        "name": "Silas Admin",
        "email": "sonjaxsilas@proton.me",
        "password": "1q2w3e4r",
        "role": "admin"
    }
}

STUDENTS_DB = []

# --- PYDANTIC SCHEMAS ---
class LoginRequest(BaseModel):
    email: str
    password: str
    role: str  # "admin" or "student"

class StudentCreate(BaseModel):
    student_name: str
    student_email: EmailStr
    student_phone_no: str
    student_password: str
    student_level: int
    student_gpa: float
    student_cgpa: float
    admin_id: Optional[str] = None

class StudentResponse(BaseModel):
    id: str
    student_name: str
    student_email: str
    student_phone_no: str
    student_level: int
    student_gpa: float
    student_cgpa: float
    admin_id: Optional[str] = None

# --- AUTH ROUTES ---
@app.post("/login")
async def login(payload: LoginRequest):
    email_clean = payload.email.strip()
    
    if payload.role == "admin":
        admin = ADMIN_DB.get(email_clean)
        if not admin or admin["password"] != payload.password:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid admin email or password"
            )
        return {
            "id": admin["id"],
            "name": admin["name"],
            "email": admin["email"],
            "role": "admin"
        }
        
    elif payload.role == "student":
        # Search for student in our mock array database
        student = next((s for s in STUDENTS_DB if s["student_email"] == email_clean), None)
        if not student or student["student_password"] != payload.password:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid student email or password"
            )
        
        # Returning structural combinations to handle both fallback variants on your frontend
        return {
            "id": student["id"],
            "name": student["student_name"],
            "email": student["student_email"],
            "student_name": student["student_name"],
            "student_email": student["student_email"],
            "student_phone_no": student["student_phone_no"],
            "student_level": student["student_level"],
            "student_gpa": student["student_gpa"],
            "student_cgpa": student["student_cgpa"],
            "role": "student"
        }
    
    raise HTTPException(status_code=400, detail="Invalid role specified")

# --- STUDENT MANAGEMENT ROUTES ---
@app.get("/students", response_model=List[StudentResponse])
async def get_students():
    return STUDENTS_DB

@app.post("/students", response_model=StudentResponse)
async def create_student(student: StudentCreate):
    # Check for duplicate email
    if any(s["student_email"] == student.student_email for s in STUDENTS_DB):
        raise HTTPException(status_code=400, detail="Email already exists!")
        
    # Check for duplicate phone number
    if any(s["student_phone_no"] == student.student_phone_no for s in STUDENTS_DB):
        raise HTTPException(status_code=400, detail="Phone number already exists!")

    # Create record
    new_student_dict = student.model_dump()
    new_student_dict["id"] = f"student_{len(STUDENTS_DB) + 1}"
    
    STUDENTS_DB.append(new_student_dict)
    return new_student_dict

@app.delete("/students/{student_id}")
async def delete_student(student_id: str):
    global STUDENTS_DB
    initial_length = len(STUDENTS_DB)
    STUDENTS_DB = [s for s in STUDENTS_DB if s["id"] != student_id]
    
    if len(STUDENTS_DB) == initial_length:
        raise HTTPException(status_code=404, detail="Student record not found")
        
    return {"detail": "Student deleted successfully"}

@app.get("/")
async def root():
    return {"message": "Student Farm App API is online!"}

if __name__ == "__main__":
    uvicorn.run("main.py", host="0.0.0.0", port=8000, reload=True)