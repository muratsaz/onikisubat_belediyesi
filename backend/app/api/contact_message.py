from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.contact_message import (
    ContactMessageCreate,
    ContactMessageUpdate,
    ContactMessageResponse,
)
from app.services.contact_message_service import (
    create_contact_message,
    get_all_contact_messages,
    get_contact_message_by_id,
    update_contact_message,
    delete_contact_message,
)

router = APIRouter(
    prefix="/contact-messages",
    tags=["Contact Messages"],
)


@router.post("/", response_model=ContactMessageResponse)
def create(
    message: ContactMessageCreate,
    db: Session = Depends(get_db),
):
    return create_contact_message(db, message)


@router.get("/", response_model=list[ContactMessageResponse])
def get_all(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db),
):
    return get_all_contact_messages(
        db,
        skip,
        limit,
    )


@router.get("/{message_id}", response_model=ContactMessageResponse)
def get_by_id(
    message_id: int,
    db: Session = Depends(get_db),
):
    message = get_contact_message_by_id(
        db,
        message_id,
    )

    if not message:
        raise HTTPException(
            status_code=404,
            detail="Mesaj bulunamadı."
        )

    return message


@router.put("/{message_id}", response_model=ContactMessageResponse)
def update(
    message_id: int,
    message: ContactMessageUpdate,
    db: Session = Depends(get_db),
):
    updated = update_contact_message(
        db,
        message_id,
        message,
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Mesaj bulunamadı."
        )

    return updated


@router.delete("/{message_id}")
def delete(
    message_id: int,
    db: Session = Depends(get_db),
):
    deleted = delete_contact_message(
        db,
        message_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Mesaj bulunamadı."
        )

    return {
        "message": "Mesaj başarıyla silindi."
    }