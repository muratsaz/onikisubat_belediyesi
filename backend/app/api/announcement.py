from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.security import require_admin
from app.database.database import get_db
from app.schemas.announcement import (
    AnnouncementCreate,
    AnnouncementResponse,
    AnnouncementUpdate,
)
from app.services.announcement_service import (
    create_announcement,
    delete_announcement,
    get_all_announcements,
    get_announcement_by_id,
    update_announcement,
)

router = APIRouter(
    prefix="/announcements",
    tags=["Announcements"],
)


@router.post("/", response_model=AnnouncementResponse)
def create(
    announcement: AnnouncementCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    return create_announcement(db, announcement)


@router.get("/", response_model=list[AnnouncementResponse])
def get_all(
    db: Session = Depends(get_db),
):
    return get_all_announcements(db)


@router.get("/{announcement_id}", response_model=AnnouncementResponse)
def get_one(
    announcement_id: int,
    db: Session = Depends(get_db),
):
    announcement = get_announcement_by_id(
        db,
        announcement_id,
    )

    if not announcement:
        raise HTTPException(
            status_code=404,
            detail="Duyuru bulunamadı",
        )

    return announcement


@router.put("/{announcement_id}", response_model=AnnouncementResponse)
def update(
    announcement_id: int,
    announcement: AnnouncementUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    updated = update_announcement(
        db,
        announcement_id,
        announcement,
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Duyuru bulunamadı",
        )

    return updated


@router.delete("/{announcement_id}")
def delete(
    announcement_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    deleted = delete_announcement(
        db,
        announcement_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Duyuru bulunamadı",
        )

    return {
        "message": "Duyuru başarıyla silindi."
    }