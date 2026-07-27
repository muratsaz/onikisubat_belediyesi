from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.news import NewsCreate, NewsResponse, NewsUpdate
from app.services.news_service import (
    create_news,
    get_all_news,
    get_news_by_id,
    update_news,
    delete_news,
)
from app.core.security import require_admin

router = APIRouter(
    prefix="/news",
    tags=["News"]
)


@router.post("/", response_model=NewsResponse)
def create(
    news: NewsCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return create_news(db, news)


@router.get("/", response_model=list[NewsResponse])
def get_all(
    skip: int = 0,
    limit: int = 10,
    search: str | None = None,
    db: Session = Depends(get_db),
):
    return get_all_news(
        db=db,
        skip=skip,
        limit=limit,
        search=search,
    )


@router.get("/{news_id}", response_model=NewsResponse)
def get_one(
    news_id: int,
    db: Session = Depends(get_db)
):
    news = get_news_by_id(db, news_id)

    if not news:
        raise HTTPException(
            status_code=404,
            detail="Haber bulunamadı"
        )

    return news


@router.put("/{news_id}", response_model=NewsResponse)
def update(
    news_id: int,
    news: NewsUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    updated = update_news(db, news_id, news)

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Haber bulunamadı"
        )

    return updated


@router.delete("/{news_id}")
def delete(
    news_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    deleted = delete_news(db, news_id)

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Haber bulunamadı"
        )

    return {
        "message": "Haber başarıyla silindi."
    }