from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.security import require_admin
from app.database.database import get_db
from app.schemas.page import (
    PageCreate,
    PageResponse,
    PageUpdate,
)
from app.services.page_service import (
    create_page,
    delete_page,
    get_all_pages,
    get_page_by_id,
    get_page_by_slug,
    update_page,
)

router = APIRouter(
    prefix="/pages",
    tags=["Pages"],
)


@router.post("/", response_model=PageResponse)
def create(
    page: PageCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    return create_page(db, page)


@router.get("/", response_model=list[PageResponse])
def get_all(
    skip: int = 0,
    limit: int = 10,
    search: str | None = None,
    db: Session = Depends(get_db),
):
    return get_all_pages(
        db,
        skip,
        limit,
        search,
    )


@router.get("/slug/{slug}", response_model=PageResponse)
def get_by_slug(
    slug: str,
    db: Session = Depends(get_db),
):
    page = get_page_by_slug(
        db,
        slug,
    )

    if not page:
        raise HTTPException(
            status_code=404,
            detail="Sayfa bulunamadı",
        )

    return page


@router.get("/{page_id}", response_model=PageResponse)
def get_one(
    page_id: int,
    db: Session = Depends(get_db),
):
    page = get_page_by_id(
        db,
        page_id,
    )

    if not page:
        raise HTTPException(
            status_code=404,
            detail="Sayfa bulunamadı",
        )

    return page


@router.put("/{page_id}", response_model=PageResponse)
def update(
    page_id: int,
    page: PageUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    updated = update_page(
        db,
        page_id,
        page,
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Sayfa bulunamadı",
        )

    return updated


@router.delete("/{page_id}")
def delete(
    page_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    deleted = delete_page(
        db,
        page_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Sayfa bulunamadı",
        )

    return {
        "message": "Sayfa başarıyla silindi."
    }