from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class PageCreate(BaseModel):
    title: str = Field(..., min_length=5, max_length=255)
    summary: str = Field(..., min_length=10, max_length=500)
    content: str = Field(..., min_length=20)
    cover_image: str | None = None
    seo_title: str | None = Field(default=None, max_length=255)
    seo_description: str | None = Field(default=None, max_length=500)
    is_published: bool = True


class PageUpdate(BaseModel):
    title: str = Field(..., min_length=5, max_length=255)
    summary: str = Field(..., min_length=10, max_length=500)
    content: str = Field(..., min_length=20)
    cover_image: str | None = None
    seo_title: str | None = Field(default=None, max_length=255)
    seo_description: str | None = Field(default=None, max_length=500)
    is_published: bool


class PageResponse(BaseModel):
    id: int
    title: str
    slug: str
    summary: str
    content: str
    cover_image: str | None
    seo_title: str | None
    seo_description: str | None
    is_published: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )