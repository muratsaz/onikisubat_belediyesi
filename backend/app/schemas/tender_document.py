from datetime import datetime

from pydantic import BaseModel, ConfigDict


class TenderDocumentBase(BaseModel):
    file_name: str
    file_path: str


class TenderDocumentCreate(TenderDocumentBase):
    pass


class TenderDocumentResponse(TenderDocumentBase):
    id: int
    tender_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)