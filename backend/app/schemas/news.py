from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class NewsCreate(BaseModel):
    title: str = Field(..., min_length=3, max_length=255)
    summary: str = Field(..., min_length=10, max_length=500)
    content: str = Field(..., min_length=10)
    image: str = Field(..., min_length=1)
    category: str = Field(..., min_length=2, max_length=100)


class NewsUpdate(BaseModel):
    title: str = Field(..., min_length=3, max_length=255)
    slug: str = Field(..., min_length=3, max_length=255)
    summary: str = Field(..., min_length=10, max_length=500)
    content: str = Field(..., min_length=10)
    image: str = Field(..., min_length=1)
    category: str = Field(..., min_length=2, max_length=100)
    is_published: bool


class NewsResponse(BaseModel):
    id: int
    title: str
    slug: str
    summary: str
    content: str
    image: str
    category: str
    is_published: bool
    published_at: datetime
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )