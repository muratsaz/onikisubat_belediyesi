from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field


class NewsBase(BaseModel):
    title: str = Field(..., min_length=3, max_length=255)
    summary: str = Field(..., min_length=10, max_length=500)
    content: str = Field(..., min_length=10)

    category: str = Field(..., min_length=2, max_length=100)

    author: str = Field(..., min_length=2, max_length=100)

    image: Optional[str] = None

    is_published: bool = False


class NewsCreate(NewsBase):
    pass


class NewsUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=3, max_length=255)

    summary: Optional[str] = Field(
        None,
        min_length=10,
        max_length=500,
    )

    content: Optional[str] = Field(
        None,
        min_length=10,
    )

    category: Optional[str] = Field(
        None,
        min_length=2,
        max_length=100,
    )

    author: Optional[str] = Field(
        None,
        min_length=2,
        max_length=100,
    )

    image: Optional[str] = None

    is_published: Optional[bool] = None


class NewsResponse(BaseModel):
    id: int

    title: str

    slug: str

    summary: str

    content: str

    category: str

    author: str

    image: Optional[str]

    is_published: bool

    published_at: Optional[datetime]

    created_at: datetime

    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )