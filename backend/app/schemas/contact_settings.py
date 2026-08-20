from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class ContactSettingsBase(BaseModel):
    phone: Optional[str] = None
    fax: Optional[str] = None
    email: Optional[str] = None
    kep: Optional[str] = None
    website: Optional[str] = None
    working_hours: Optional[str] = None
    address: Optional[str] = None
    instagram: Optional[str] = None
    facebook: Optional[str] = None
    x: Optional[str] = None
    youtube: Optional[str] = None
    whatsapp: Optional[str] = None
    alo_153: Optional[str] = None
    e_belediye_url: Optional[str] = None


class ContactSettingsCreate(ContactSettingsBase):
    pass


class ContactSettingsUpdate(ContactSettingsBase):
    pass


class ContactSettingsResponse(ContactSettingsBase):
    id: int
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )
