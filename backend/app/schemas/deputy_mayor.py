from datetime import datetime

from pydantic import BaseModel, ConfigDict


class DeputyMayorCreate(BaseModel):
    name: str
    phone: str
    image: str | None = None


class DeputyMayorUpdate(BaseModel):
    name: str
    phone: str
    image: str | None = None


class DeputyMayorResponse(BaseModel):
    id: int
    name: str
    phone: str
    image: str | None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )