from sqlalchemy import or_

from app.utils.slug import slugify
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
    announcement_data = announcement.model_dump()

    base_slug = slugify(announcement.title)
    slug = base_slug
    counter = 1

    while db.query(Announcement).filter(Announcement.slug == slug).first():
        slug = f"{base_slug}-{counter}"
        counter += 1

    announcement_data["slug"] = slug

    new_announcement = Announcement(**announcement_data)

    db.add(new_announcement)
    db.commit()
    db.refresh(new_announcement)

    return new_announcement


def get_all_announcements(
    db: Session,
    skip: int = 0,
    limit: int = 10,
    search: str | None = None,
):
    query = db.query(Announcement)

    if search:
      query = query.filter(
        or_(
            Announcement.title.ilike(f"%{search}%"),
            Announcement.summary.ilike(f"%{search}%"),
            Announcement.content.ilike(f"%{search}%"),
        )
    )


    return (
    query
    .order_by(Announcement.id.desc())
    .offset(skip)
    .limit(limit)
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