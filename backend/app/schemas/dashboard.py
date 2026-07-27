from pydantic import BaseModel, ConfigDict

from app.schemas.news import NewsResponse
from app.schemas.announcement import AnnouncementResponse
from app.schemas.event import EventResponse


class DashboardResponse(BaseModel):
    news_count: int
    announcement_count: int
    event_count: int
    gallery_count: int

    latest_news: list[NewsResponse]
    latest_announcements: list[AnnouncementResponse]
    latest_events: list[EventResponse]

    model_config = ConfigDict(
        from_attributes=True
    )