from datetime import datetime

from pydantic import BaseModel, ConfigDict


class TenderBase(BaseModel):
    title: str
    tender_number: str
    description: str | None = None
    publish_date: datetime
    deadline: datetime
    status: str = "ACTIVE"


class TenderCreate(TenderBase):
    pass


class TenderUpdate(BaseModel):
    title: str | None = None
    tender_number: str | None = None
    description: str | None = None
    publish_date: datetime | None = None
    deadline: datetime | None = None
    status: str | None = None


class TenderResponse(TenderBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)