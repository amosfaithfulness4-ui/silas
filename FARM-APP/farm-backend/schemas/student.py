from pydantic import BaseModel, EmailStr, Field
from typing import Optional


class StudentResponse(BaseModel):
    id: str = Field(..., description="Unique student identifier")
    student_name: str = Field(..., description="The full name of the student")
    student_email: EmailStr = Field(..., description="The university or personal email address")
    student_phone_no: str = Field(..., description="Contact phone number")
    student_level: int = Field(..., description="Academic level, e.g., 300, 400")
    student_gpa: float = Field(..., description="Current Grade Point Average")
    student_cgpa: float = Field(..., description="Cumulative Grade Point Average")
    student_password: Optional[str] = Field(None, description="Student login password")
    admin_id: Optional[str] = Field(None, description="ID of the admin who created this student")

    class Config:
        json_schema_extra = {
            "example": {
                "id": "64b8f6e9f2b3d4e5f6a7b8c9",
                "student_name": "Faithfulness Silas",
                "student_email": "student@email.com",
                "student_phone_no": "08012345678",
                "student_level": 300,
                "student_gpa": 4.50,
                "student_cgpa": 4.65,
            }
        }