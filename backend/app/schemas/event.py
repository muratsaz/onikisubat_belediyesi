from datetime import datetime

from pydantic import BaseModel, ConfigDict,Field

class EventCreate(BaseModel):
    title: str = Field(..., min_length=5, max_length=255)
    summary: str = Field(..., min_length=10, max_length=500)
    content: str = Field(..., min_length=20)

    image: str
    location: str = Field(..., min_length=3, max_length=255)
    event_date: datetime

class EventUpdate(BaseModel):
    title: str = Field(..., min_length=5, max_length=255)
    summary: str = Field(..., min_length=10, max_length=500)
    content: str = Field(..., min_length=20)

    image: str
    location: str = Field(..., min_length=3, max_length=255)
    event_date: datetime
    is_published: bool

class EventResponse(BaseModel):
    id: int
    title: str
    slug: str
    summary: str
    content: str
    image: str
    location: str
    event_date: datetime
    is_published: bool
    published_at: datetime
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )