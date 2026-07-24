from datetime import datetime

from pydantic import BaseModel, ConfigDict


class NewsCreate(BaseModel):
    title: str
    slug: str
    summary: str
    content: str
    image: str
    category: str


class NewsUpdate(BaseModel):
    title: str
    slug: str
    summary: str
    content: str
    image: str
    category: str
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