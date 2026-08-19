from datetime import datetime

from pydantic import BaseModel, ConfigDict


class NavigationCreate(BaseModel):
    title: str
    path: str
    item_type: str = "route"
    display_order: int = 0
    is_active: bool = True
    parent_id: int | None = None


class NavigationUpdate(BaseModel):
    title: str | None = None
    path: str | None = None
    item_type: str | None = None
    display_order: int | None = None
    is_active: bool | None = None
    parent_id: int | None = None


class NavigationResponse(BaseModel):
    id: int
    title: str
    path: str
    item_type: str
    display_order: int
    is_active: bool
    parent_id: int | None = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )