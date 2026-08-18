from datetime import datetime

from pydantic import BaseModel, ConfigDict


class OrganizationCreate(BaseModel):
    image_url: str


class OrganizationUpdate(BaseModel):
    image_url: str


class OrganizationResponse(BaseModel):
    id: int
    image_url: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )