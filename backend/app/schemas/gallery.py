from datetime import datetime

from pydantic import BaseModel, ConfigDict,Field


class GalleryCreate(BaseModel):
    title: str = Field(..., min_length=5, max_length=255)
    description: str = Field(..., min_length=10, max_length=1000)
    image: str
    category: str = Field(..., min_length=3, max_length=100)


class GalleryUpdate(BaseModel):
    title: str = Field(..., min_length=5, max_length=255)
    description: str = Field(..., min_length=10, max_length=1000)
    image: str
    category: str = Field(..., min_length=3, max_length=100)
    is_published: bool

class GalleryResponse(BaseModel):
    id: int
    title: str
    description: str
    image: str
    category: str
    is_published: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )