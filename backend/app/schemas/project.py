from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class ProjectCreate(BaseModel):
    title: str = Field(..., min_length=5, max_length=255)

    summary: str = Field(..., min_length=10, max_length=500)

    content: str = Field(..., min_length=20)

    image: str

    location: str = Field(..., min_length=2, max_length=255)

    status: str = Field(..., max_length=50)

    is_published: bool = False


class ProjectUpdate(BaseModel):
    title: str = Field(..., min_length=5, max_length=255)

    summary: str = Field(..., min_length=10, max_length=500)

    content: str = Field(..., min_length=20)

    image: str

    location: str = Field(..., min_length=2, max_length=255)

    status: str = Field(..., max_length=50)

    is_published: bool


class ProjectResponse(BaseModel):
    id: int

    title: str

    slug: str

    summary: str

    content: str

    image: str

    location: str

    status: str

    is_published: bool

    published_at: datetime | None

    created_at: datetime

    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )