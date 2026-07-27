from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.models.page import Page
from app.schemas.page import (
    PageCreate,
    PageUpdate,
)
from app.utils.slug import slugify


def create_page(
    db: Session,
    page: PageCreate,
):
    page_data = page.model_dump()

    base_slug = slugify(page.title)
    slug = base_slug
    counter = 1

    while db.query(Page).filter(Page.slug == slug).first():
        slug = f"{base_slug}-{counter}"
        counter += 1

    page_data["slug"] = slug

    new_page = Page(**page_data)

    db.add(new_page)
    db.commit()
    db.refresh(new_page)

    return new_page


def get_all_pages(
    db: Session,
    skip: int = 0,
    limit: int = 10,
    search: str | None = None,
):
    query = db.query(Page)

    if search:
        query = query.filter(
            or_(
                Page.title.ilike(f"%{search}%"),
                Page.summary.ilike(f"%{search}%"),
                Page.content.ilike(f"%{search}%"),
            )
        )

    return (
        query
        .order_by(Page.id.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_page_by_id(
    db: Session,
    page_id: int,
):
    return (
        db.query(Page)
        .filter(Page.id == page_id)
        .first()
    )


def get_page_by_slug(
    db: Session,
    slug: str,
):
    return (
        db.query(Page)
        .filter(Page.slug == slug)
        .first()
    )


def update_page(
    db: Session,
    page_id: int,
    page: PageUpdate,
):
    existing_page = get_page_by_id(
        db,
        page_id,
    )

    if not existing_page:
        return None

    page_data = page.model_dump()

    if existing_page.title != page.title:
        base_slug = slugify(page.title)
        slug = base_slug
        counter = 1

        while (
            db.query(Page)
            .filter(
                Page.slug == slug,
                Page.id != page_id,
            )
            .first()
        ):
            slug = f"{base_slug}-{counter}"
            counter += 1

        page_data["slug"] = slug

    for key, value in page_data.items():
        setattr(existing_page, key, value)

    db.commit()
    db.refresh(existing_page)

    return existing_page


def delete_page(
    db: Session,
    page_id: int,
):
    existing_page = get_page_by_id(
        db,
        page_id,
    )

    if not existing_page:
        return None

    db.delete(existing_page)
    db.commit()

    return existing_page