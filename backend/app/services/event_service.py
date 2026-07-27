from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.utils.slug import slugify
from app.models.event import Event
from app.schemas.event import (
    EventCreate,
    EventUpdate,
)


def create_event(
    db: Session,
    event: EventCreate,
):
    event_data = event.model_dump()

    base_slug = slugify(event.title)
    slug = base_slug
    counter = 1

    while db.query(Event).filter(Event.slug == slug).first():
        slug = f"{base_slug}-{counter}"
        counter += 1

    event_data["slug"] = slug

    new_event = Event(**event_data)

    db.add(new_event)
    db.commit()
    db.refresh(new_event)

    return new_event

def get_all_events(
    db: Session,
    skip: int = 0,
    limit: int = 10,
    search: str | None = None,
):
    query = db.query(Event)

    if search:
        query = query.filter(
            or_(
                Event.title.ilike(f"%{search}%"),
                Event.summary.ilike(f"%{search}%"),
                Event.content.ilike(f"%{search}%"),
                Event.location.ilike(f"%{search}%"),
            )
        )

    return (
        query
        .order_by(Event.id.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )

def get_event_by_id(
    db: Session,
    event_id: int,
):
    return (
        db.query(Event)
        .filter(Event.id == event_id)
        .first()
    )


def update_event(
    db: Session,
    event_id: int,
    event: EventUpdate,
):
    existing_event = get_event_by_id(
        db,
        event_id,
    )

    if not existing_event:
        return None

    for key, value in event.model_dump().items():
        setattr(existing_event, key, value)

    db.commit()
    db.refresh(existing_event)

    return existing_event


def delete_event(
    db: Session,
    event_id: int,
):
    existing_event = get_event_by_id(
        db,
        event_id,
    )

    if not existing_event:
        return None

    db.delete(existing_event)
    db.commit()

    return existing_event