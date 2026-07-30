from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr


class ContactMessageBase(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    subject: str
    message: str


class ContactMessageCreate(ContactMessageBase):
    pass


class ContactMessageUpdate(BaseModel):
    is_read: bool


class ContactMessageResponse(ContactMessageBase):
    id: int
    is_read: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)