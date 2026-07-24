from sqlalchemy.orm import Session

from app.models.announcement import Announcement
from app.schemas.announcement import (
    AnnouncementCreate,
    AnnouncementUpdate,
)


def create_announcement(
    db: Session,
    announcement: AnnouncementCreate,
):
    new_announcement = Announcement(**announcement.model_dump())

    db.add(new_announcement)
    db.commit()
    db.refresh(new_announcement)

    return new_announcement


def get_all_announcements(db: Session):
    return (
        db.query(Announcement)
        .order_by(Announcement.id.desc())
        .all()
    )


def get_announcement_by_id(
    db: Session,
    announcement_id: int,
):
    return (
        db.query(Announcement)
        .filter(Announcement.id == announcement_id)
        .first()
    )


def update_announcement(
    db: Session,
    announcement_id: int,
    announcement: AnnouncementUpdate,
):
    existing_announcement = get_announcement_by_id(
        db,
        announcement_id,
    )

    if not existing_announcement:
        return None

    for key, value in announcement.model_dump().items():
        setattr(existing_announcement, key, value)

    db.commit()
    db.refresh(existing_announcement)

    return existing_announcement


def delete_announcement(
    db: Session,
    announcement_id: int,
):
    existing_announcement = get_announcement_by_id(
        db,
        announcement_id,
    )

    if not existing_announcement:
        return None

    db.delete(existing_announcement)
    db.commit()

    return existing_announcement