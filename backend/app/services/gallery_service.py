from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.models.gallery import Gallery
from app.schemas.gallery import (
    GalleryCreate,
    GalleryUpdate,
)


def create_gallery(
    db: Session,
    gallery: GalleryCreate,
):
    new_gallery = Gallery(**gallery.model_dump())

    db.add(new_gallery)
    db.commit()
    db.refresh(new_gallery)

    return new_gallery



def get_all_galleries(
    db: Session,
    skip: int = 0,
    limit: int = 10,
    search: str | None = None,
):
    query = db.query(Gallery)

    if search:
        query = query.filter(
            or_(
                Gallery.title.ilike(f"%{search}%"),
                Gallery.description.ilike(f"%{search}%"),
                Gallery.category.ilike(f"%{search}%"),
            )
        )

    return (
        query
        .order_by(Gallery.id.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_gallery_by_id(
    db: Session,
    gallery_id: int,
):
    return (
        db.query(Gallery)
        .filter(Gallery.id == gallery_id)
        .first()
    )


def update_gallery(
    db: Session,
    gallery_id: int,
    gallery: GalleryUpdate,
):
    existing_gallery = get_gallery_by_id(
        db,
        gallery_id,
    )

    if not existing_gallery:
        return None

    for key, value in gallery.model_dump().items():
        setattr(existing_gallery, key, value)

    db.commit()
    db.refresh(existing_gallery)

    return existing_gallery


def delete_gallery(
    db: Session,
    gallery_id: int,
):
    existing_gallery = get_gallery_by_id(
        db,
        gallery_id,
    )

    if not existing_gallery:
        return None

    db.delete(existing_gallery)
    db.commit()

    return existing_gallery