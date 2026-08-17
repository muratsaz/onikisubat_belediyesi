from datetime import datetime

from pydantic import BaseModel, ConfigDict


class DepartmentCreate(BaseModel):
    name: str
    phone: str | None = None
    extension: str | None = None
    email: str | None = None
    image: str | None = None


class DepartmentUpdate(BaseModel):
    name: str
    phone: str | None = None
    extension: str | None = None
    email: str | None = None
    image: str | None = None


class DepartmentResponse(BaseModel):
    id: int
    name: str
    phone: str | None
    extension: str | None
    email: str | None
    image: str | None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )