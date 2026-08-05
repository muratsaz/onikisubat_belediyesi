from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


from pydantic import BaseModel, ConfigDict, Field


class AnnouncementCreate(BaseModel):
    title: str = Field(..., min_length=5, max_length=255)
    summary: str = Field(..., min_length=10, max_length=500)
    content: str = Field(..., min_length=20)
    


class AnnouncementUpdate(BaseModel):
    title: str = Field(..., min_length=5, max_length=255)
    summary: str = Field(..., min_length=10, max_length=500)
    content: str = Field(..., min_length=20)

    
    is_published: bool

class AnnouncementResponse(BaseModel):
    id: int
    title: str
    slug: str
    summary: str
    content: str
    
    is_published: bool
    published_at: datetime
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )