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
    )


@router.post("/students", response_model=StudentResponse)
async def create_new_student(student: Student):
    try:
        student_dict = {
            "student_name": student.student_name,
            "student_email": student.student_email,
            "student_phone_no": student.student_phone_no,
            "student_level": student.student_level,
            "student_gpa": student.student_gpa,
            "student_cgpa": student.student_cgpa,
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
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error creating student: {str(e)}")


@router.delete("/students/{student_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_student(student_id: str):
    if not ObjectId.is_valid(student_id):
        raise HTTPException(status_code=400, detail="Invalid student ID")

    result = await db.students.delete_one({"_id": ObjectId(student_id)})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Student not found")

    return None