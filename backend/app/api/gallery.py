from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.security import require_admin
from app.database.database import get_db
from app.schemas.gallery import (
    GalleryCreate,
    GalleryResponse,
    GalleryUpdate,
)
from app.services.gallery_service import (
    create_gallery,
    delete_gallery,
    get_all_galleries,
    get_gallery_by_id,
    update_gallery,
)

router = APIRouter(
    prefix="/gallery",
    tags=["Gallery"],
)


@router.post("/", response_model=GalleryResponse)
def create(
    gallery: GalleryCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    return create_gallery(db, gallery)


@router.get("/", response_model=list[GalleryResponse])
def get_all(
    skip: int = 0,
    limit: int = 10,
    search: str | None = None,
    db: Session = Depends(get_db),
):
    return get_all_galleries(
        db,
        skip,
        limit,
        search,
    )


@router.get("/{gallery_id}", response_model=GalleryResponse)
def get_one(
    gallery_id: int,
    db: Session = Depends(get_db),
):
    gallery = get_gallery_by_id(db, gallery_id)

    if not gallery:
        raise HTTPException(
            status_code=404,
            detail="Galeri öğesi bulunamadı",
        )

    return gallery


@router.put("/{gallery_id}", response_model=GalleryResponse)
def update(
    gallery_id: int,
    gallery: GalleryUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    updated = update_gallery(
        db,
        gallery_id,
        gallery,
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Galeri öğesi bulunamadı",
        )

    return updated


@router.delete("/{gallery_id}")
def delete(
    gallery_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    deleted = delete_gallery(
        db,
        gallery_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Galeri öğesi bulunamadı",
        )

    return {
        "message": "Galeri öğesi başarıyla silindi."
    }