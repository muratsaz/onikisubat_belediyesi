from datetime import datetime

from pydantic import BaseModel, ConfigDict


class MayorUpdate(BaseModel):
    name: str
    title: str
    description: str | None = None
    image: str | None = None


class MayorResponse(BaseModel):
    id: int
    name: str
    title: str
    description: str | None
    image: str | None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )