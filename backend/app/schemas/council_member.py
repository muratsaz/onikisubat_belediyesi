from datetime import datetime

from pydantic import BaseModel, ConfigDict


class CouncilMemberCreate(BaseModel):
    name: str
    party: str
    image: str | None = None


class CouncilMemberUpdate(BaseModel):
    name: str
    party: str
    image: str | None = None


class CouncilMemberResponse(BaseModel):
    id: int
    name: str
    party: str
    image: str | None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )