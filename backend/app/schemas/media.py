from datetime import datetime

from pydantic import BaseModel, ConfigDict


class MediaResponse(BaseModel):
    id: int
    file_name: str
    file_path: str
    category: str
    mime_type: str | None = None
    file_size: int
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )