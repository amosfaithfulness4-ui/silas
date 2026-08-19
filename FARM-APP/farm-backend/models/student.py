from pydantic import BaseModel
from typing import Optional


class Student(BaseModel):
    student_name: str
    student_email: str
    student_phone_no: str
    student_level: int
    student_gpa: float = 0.0
    student_cgpa: float = 0.0
    student_password: Optional[str] = None
    admin_id: Optional[str] = None