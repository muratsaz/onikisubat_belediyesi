from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class DepartmentBase(BaseModel):
    name: str

    manager_name: Optional[str] = None
    manager_image: Optional[str] = None

    phone: Optional[str] = None
    extension: Optional[str] = None
    email: Optional[str] = None


class DepartmentCreate(DepartmentBase):
    pass


class DepartmentUpdate(BaseModel):
    name: Optional[str] = None

    manager_name: Optional[str] = None
    manager_image: Optional[str] = None

    phone: Optional[str] = None
    extension: Optional[str] = None
    email: Optional[str] = None


class DepartmentResponse(DepartmentBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )