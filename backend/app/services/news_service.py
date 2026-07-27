from sqlalchemy import or_
from sqlalchemy.orm import Session
from app.utils.slug import slugify
from app.models.news import News
from app.schemas.news import NewsCreate, NewsUpdate


def create_news(db: Session, news: NewsCreate):
    news_data = news.model_dump()

    news_data["slug"] = slugify(news.title)

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

    for key, value in news.model_dump().items():
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