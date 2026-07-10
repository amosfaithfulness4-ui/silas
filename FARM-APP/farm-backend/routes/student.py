from fastapi import APIRouter, HTTPException, status
from bson import ObjectId

from config.database import db
from models.student import Student
from schemas.student import StudentResponse

router = APIRouter(tags=["Students"])


@router.get("/students", response_model=list[StudentResponse])
async def get_list_of_students():
    students = []

    async for student in db.students.find():
        students.append(
            StudentResponse(
                id=str(student["_id"]),
                student_name=student.get("student_name") or student.get("name"),
                student_email=student.get("student_email") or student.get("email"),
                student_phone_no=student.get("student_phone_no") or student.get("phone"),
                student_level=student.get("student_level") or student.get("level"),
                student_gpa=student.get("student_gpa") or student.get("gpa", 0.0),
                student_cgpa=student.get("student_cgpa") or student.get("cgpa", 0.0),
                student_password=student.get("student_password"),
                admin_id=student.get("admin_id"),
            )
        )

    return students


@router.get("/students/by-admin/{admin_id}", response_model=list[StudentResponse])
async def get_students_by_admin(admin_id: str):
    students = []
    
    async for student in db.students.find({"admin_id": admin_id}):
        students.append(
            StudentResponse(
                id=str(student["_id"]),
                student_name=student.get("student_name") or student.get("name"),
                student_email=student.get("student_email") or student.get("email"),
                student_phone_no=student.get("student_phone_no") or student.get("phone"),
                student_level=student.get("student_level") or student.get("level"),
                student_gpa=student.get("student_gpa") or student.get("gpa", 0.0),
                student_cgpa=student.get("student_cgpa") or student.get("cgpa", 0.0),
                student_password=student.get("student_password"),
                admin_id=student.get("admin_id"),
            )
        )
    
    return students


@router.get("/students/{student_id}", response_model=StudentResponse)
async def get_one_student(student_id: str):
    if not ObjectId.is_valid(student_id):
        raise HTTPException(status_code=400, detail="Invalid student ID")

    student = await db.students.find_one({"_id": ObjectId(student_id)})

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    return StudentResponse(
        id=str(student["_id"]),
        student_name=student.get("student_name") or student.get("name"),
        student_email=student.get("student_email") or student.get("email"),
        student_phone_no=student.get("student_phone_no") or student.get("phone"),
        student_level=student.get("student_level") or student.get("level"),
        student_gpa=student.get("student_gpa") or student.get("gpa", 0.0),
        student_cgpa=student.get("student_cgpa") or student.get("cgpa", 0.0),
        student_password=student.get("student_password"),
        admin_id=student.get("admin_id"),
    )


@router.post("/students", response_model=StudentResponse)
async def create_new_student(student: Student):
    try:
        # Check for duplicate email
        existing_email = await db.students.find_one({"student_email": student.student_email})
        if existing_email:
            raise HTTPException(status_code=400, detail="Email already exists")
        
        # Check for duplicate phone number
        existing_phone = await db.students.find_one({"student_phone_no": student.student_phone_no})
        if existing_phone:
            raise HTTPException(status_code=400, detail="Phone number already exists")
        
        student_dict = {
            "student_name": student.student_name,
            "student_email": student.student_email,
            "student_phone_no": student.student_phone_no,
            "student_level": student.student_level,
            "student_gpa": student.student_gpa,
            "student_cgpa": student.student_cgpa,
            "student_password": student.student_password,
            "admin_id": student.admin_id,
        }

        result = await db.students.insert_one(student_dict)
        new_student = await db.students.find_one({"_id": result.inserted_id})

        if not new_student:
            raise HTTPException(status_code=500, detail="Failed to retrieve created student")

        return StudentResponse(
            id=str(new_student["_id"]),
            student_name=new_student.get("student_name"),
            student_email=new_student.get("student_email"),
            student_phone_no=new_student.get("student_phone_no"),
            student_level=new_student.get("student_level"),
            student_gpa=new_student.get("student_gpa", 0.0),
            student_cgpa=new_student.get("student_cgpa", 0.0),
            student_password=new_student.get("student_password"),
            admin_id=new_student.get("admin_id"),
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error creating student: {str(e)}")


@router.post("/login")
async def login(email: str, password: str, role: str = "student"):
    """
    Login endpoint for both admin and student.
    - Admin login: Use admin email directly (hardcoded credentials)
    - Student login: Use student email and password
    """
    
    if role == "admin":
        # Admin login with specific credentials
        if email == "sonjaxsilas@proton.me" and password == "1q2w3e4r":
            return {
                "success": True,
                "role": "admin",
                "email": email,
                "name": "Farm Admin",
                "id": "admin_001"
            }
        else:
            raise HTTPException(status_code=401, detail="Invalid admin credentials")
    
    elif role == "student":
        # Student login with email and password
        student = await db.students.find_one({"student_email": email})
        
        if not student:
            raise HTTPException(status_code=401, detail="Student not found")
        
        if student.get("student_password") != password:
            raise HTTPException(status_code=401, detail="Invalid password")
        
        return {
            "success": True,
            "role": "student",
            "email": email,
            "name": student.get("student_name"),
            "id": str(student["_id"]),
            "admin_id": student.get("admin_id"),
            "student_level": student.get("student_level"),
            "student_gpa": student.get("student_gpa"),
            "student_cgpa": student.get("student_cgpa"),
        }
    
    else:
        raise HTTPException(status_code=400, detail="Invalid role")


@router.delete("/students/{student_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_student(student_id: str):
    if not ObjectId.is_valid(student_id):
        raise HTTPException(status_code=400, detail="Invalid student ID")

    result = await db.students.delete_one({"_id": ObjectId(student_id)})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Student not found")

    return None