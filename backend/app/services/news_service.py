from sqlalchemy import or_
from sqlalchemy.orm import Session
from app.utils.slug import slugify
from app.models.news import News
from app.schemas.news import NewsCreate, NewsUpdate
from datetime import datetime, UTC

def create_news(db: Session, news: NewsCreate):
    news_data = news.model_dump()

    news_data["slug"] = slugify(news.title)

    if news_data["is_published"]:
        news_data["published_at"] = datetime.now(UTC)

    new_news = News(**news_data)

    db.add(new_news)
    db.commit()
    db.refresh(new_news)

    return new_news

def get_all_news(
    db: Session,
    skip: int = 0,
    limit: int = 10,
    search: str | None = None,
    published: bool | None = None
):
    query = db.query(News)

    if search:
        query = query.filter(
            or_(
                News.title.ilike(f"%{search}%"),
                News.summary.ilike(f"%{search}%"),
                News.category.ilike(f"%{search}%"),
            )
        )

    if published is not None:
        query = query.filter(News.is_published == published)
        

    return (
        query
        .order_by(News.id.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_news_by_id(db: Session, news_id: int):
    return db.query(News).filter(News.id == news_id).first()


def update_news(db: Session, news_id: int, news: NewsUpdate):
    existing_news = get_news_by_id(db, news_id)

    if not existing_news:
        return None

    update_data = news.model_dump(exclude_unset=True)

    if "title" in update_data:
        update_data["slug"] = slugify(update_data["title"])

    if (
        "is_published" in update_data
        and update_data["is_published"]
        and existing_news.published_at is None
    ):
        update_data["published_at"] = datetime.now(UTC)

    for key, value in update_data.items():
        setattr(existing_news, key, value)

    db.commit()
    db.refresh(existing_news)

    return existing_news

def delete_news(db: Session, news_id: int):
    existing_news = get_news_by_id(db, news_id)

    if not existing_news:
        return None

    db.delete(existing_news)
    db.commit()

    return existing_news