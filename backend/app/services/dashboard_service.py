from datetime import datetime
from sqlalchemy.orm import Session

from app.models.news import News
from app.models.user import User


def get_dashboard_stats(db: Session) -> dict:
    total_users = db.query(User).count()
    total_news = db.query(News).count()
    published_news = db.query(News).filter(News.is_published.is_(True)).count()
    recent_news = (
        db.query(News)
        .order_by(News.published_at.desc())
        .limit(5)
        .all()
    )

    return {
        "total_users": total_users,
        "total_news": total_news,
        "published_news": published_news,
        "recent_news": [
            {
                "id": item.id,
                "title": item.title,
                "slug": item.slug,
                "published_at": item.published_at,
            }
            for item in recent_news
        ],
        "generated_at": datetime.utcnow(),
    }


def get_recent_activity(db: Session, limit: int = 10) -> list:
    return [
        {
            "id": item.id,
            "title": item.title,
            "slug": item.slug,
            "published_at": item.published_at,
            "is_published": item.is_published,
        }
        for item in db.query(News).order_by(News.updated_at.desc()).limit(limit).all()
    ]
