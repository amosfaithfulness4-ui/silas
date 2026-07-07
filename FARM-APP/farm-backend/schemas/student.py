from pydantic import BaseModel, EmailStr, Field

class StudentSchema(BaseModel):
    student_name: str = Field(..., description="The full name of the student")
    student_email: EmailStr = Field(..., description="The university or personal email address")
    student_phone_no: str = Field(..., description="Contact phone number")
    student_level: int = Field(..., description="Academic level, e.g., 300, 400")
    gpa: float = Field(..., description="Current Grade Point Average")
    cgpa: float = Field(..., description="Cumulative Grade Point Average")

    class Config:
        json_schema_extra = {
            "example": {
                "student_name": "Faithfulness Silas",
                "student_email": "student@email.com",
                "student_phone_no": "08012345678",
                "student_level": 300,
                "gpa": 4.50,
                "cgpa": 4.65
            }
        }