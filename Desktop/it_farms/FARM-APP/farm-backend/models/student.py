from pydantic import BaseModel
class Student(BaseModel):
    student_id: str
    student_name : str
    student_email : str
    student_phone_no : str
    student_level : int
    gpa: float
    cgpa: float