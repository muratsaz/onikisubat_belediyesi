from sqlalchemy.orm import Session

from app.models.news import News
from app.models.announcement import Announcement
from app.models.event import Event
from app.models.gallery import Gallery


def get_dashboard_data(db: Session):
    news_count = db.query(News).count()
    announcement_count = db.query(Announcement).count()
    event_count = db.query(Event).count()
    gallery_count = db.query(Gallery).count()

    latest_news = (
        db.query(News)
        .order_by(News.created_at.desc())
        .limit(5)
        .all()
    )

    latest_announcements = (
        db.query(Announcement)
        .order_by(Announcement.created_at.desc())
        .limit(5)
        .all()
    )

    latest_events = (
        db.query(Event)
        .order_by(Event.created_at.desc())
        .limit(5)
        .all()
    )

    return {
        "news_count": news_count,
        "announcement_count": announcement_count,
        "event_count": event_count,
        "gallery_count": gallery_count,
        "latest_news": latest_news,
        "latest_announcements": latest_announcements,
        "latest_events": latest_events,
    }