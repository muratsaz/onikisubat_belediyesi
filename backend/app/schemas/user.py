from datetime import datetime

from pydantic import BaseModel, EmailStr, ConfigDict


class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    is_admin: bool
    is_superadmin: bool
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class UserUpdate(BaseModel):
    username: str | None = None
    email: EmailStr | None = None
    is_admin: bool | None = None
    is_superadmin: bool | None = None
    is_active: bool | None = None


class UserPasswordChange(BaseModel):
    current_password: str
    new_password: str


class UserAdminCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    is_admin: bool = False


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str