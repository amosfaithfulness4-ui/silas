from fastapi import APIRouter, HTTPException, status
from bson import ObjectId
from schemas.student import StudentSchema
import config.database as db_module

router = APIRouter(prefix="/students", tags=["Students"])

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_student(student: StudentSchema):
    if db_module.db is None:
        raise HTTPException(status_code=500, detail="Database connection is not active")
        
    student_dict = student.model_dump() # Converts Pydantic data to a regular dictionary
    
    # Insert record into the 'students' collection
    result = await db_module.db.students.insert_one(student_dict)
    
    # Mutate the inserted document dictionary to return a string ID to React
    student_dict["_id"] = str(result.inserted_id)
    return student_dict

@router.get("/", response_model=list)
async def get_all_students():
    if db_module.db is None:
        raise HTTPException(status_code=500, detail="Database connection is not active")
        
    students_list = []
    # Fetch all records from the database collection cursor
    async for student in db_module.db.students.find():
        student["_id"] = str(student["_id"]) # Cast the MongoDB ObjectId to clean string
        students_list.append(student)
        
    return students_list

@router.delete("/{student_id}")
async def delete_student(student_id: str):
    if db_module.db is None:
        raise HTTPException(status_code=500, detail="Database connection is not active")
        
    try:
        query_id = ObjectId(student_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid student record ID format")
        
    delete_result = await db_module.db.students.delete_one({"_id": query_id})
    
    if delete_result.deleted_count == 1:
        return {"message": "Student record successfully deleted"}
        
    raise HTTPException(status_code=404, detail="Student record not found")