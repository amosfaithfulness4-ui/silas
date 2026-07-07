from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime, date


class UserResponse(BaseModel):
    id: str

    role_id: Optional[str] = None
    admin_group_id: Optional[str] = None
    service_id: Optional[str] = None
    permission_id: Optional[str] = None

    full_name: str
    email: EmailStr
    password_hash: str

    phone: str
    address: str
    city: str
    state: str
    country: str

    date_of_birth: date

    profile_image_url: Optional[str] = None

    nin: str

    specialization: str

    marketing_consent: bool

    is_active: bool

    is_available: bool

    verification_status: str

    verification_token: Optional[str] = None

    email_verified_at: Optional[datetime] = None

    created_at: datetime

    updated_at: datetime

    last_login_at: Optional[datetime] = None

    class Config:
        from_attributes = True