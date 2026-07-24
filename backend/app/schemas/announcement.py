from datetime import datetime

from pydantic import BaseModel, ConfigDict


class AnnouncementCreate(BaseModel):
    title: str
    slug: str
    summary: str
    content: str
    image: str


class AnnouncementUpdate(BaseModel):
    title: str
    slug: str
    summary: str
    content: str
    image: str
    is_published: bool


class AnnouncementResponse(BaseModel):
    id: int
    title: str
    slug: str
    summary: str
    content: str
    image: str
    is_published: bool
    published_at: datetime
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )