from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.security import require_admin
from app.database.database import get_db
from app.schemas.event import (
    EventCreate,
    EventResponse,
    EventUpdate,
)
from app.services.event_service import (
    create_event,
    get_all_events,
    get_event_by_id,
    update_event,
    delete_event,
)

router = APIRouter(
    prefix="/events",
    tags=["Events"],
)


@router.post("/", response_model=EventResponse)
def create(
    event: EventCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    return create_event(db, event)

@router.get("/", response_model=list[EventResponse])
def get_all(
    skip: int = 0,
    limit: int = 10,
    search: str | None = None,
    db: Session = Depends(get_db),
):
    return get_all_events(
        db,
        skip,
        limit,
        search,
    )


@router.get("/{event_id}", response_model=EventResponse)
def get_one(
    event_id: int,
    db: Session = Depends(get_db),
):
    event = get_event_by_id(
        db,
        event_id,
    )

    if not event:
        raise HTTPException(
            status_code=404,
            detail="Etkinlik bulunamadı",
        )

    return event


@router.put("/{event_id}", response_model=EventResponse)
def update(
    event_id: int,
    event: EventUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    updated = update_event(
        db,
        event_id,
        event,
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Etkinlik bulunamadı",
        )

    return updated


@router.delete("/{event_id}")
def delete(
    event_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    deleted = delete_event(
        db,
        event_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Etkinlik bulunamadı",
        )

    return {
        "message": "Etkinlik başarıyla silindi."
    }