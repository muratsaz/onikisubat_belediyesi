from datetime import datetime

from pydantic import BaseModel, ConfigDict


class MissionVisionCreate(BaseModel):
    mission: str
    vision: str


class MissionVisionUpdate(BaseModel):
    mission: str
    vision: str


class MissionVisionResponse(BaseModel):
    id: int
    mission: str
    vision: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )
    