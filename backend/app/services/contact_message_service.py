from sqlalchemy.orm import Session

from app.models.contact_message import ContactMessage
from app.schemas.contact_message import (
    ContactMessageCreate,
    ContactMessageUpdate,
)


def create_contact_message(
    db: Session,
    message: ContactMessageCreate,
):
    message_data = message.model_dump()

    new_message = ContactMessage(**message_data)

    db.add(new_message)
    db.commit()
    db.refresh(new_message)

    return new_message


def get_all_contact_messages(
    db: Session,
    skip: int = 0,
    limit: int = 10,
):
    return (
        db.query(ContactMessage)
        .order_by(ContactMessage.id.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_contact_message_by_id(
    db: Session,
    message_id: int,
):
    return (
        db.query(ContactMessage)
        .filter(ContactMessage.id == message_id)
        .first()
    )


def update_contact_message(
    db: Session,
    message_id: int,
    message: ContactMessageUpdate,
):
    existing_message = get_contact_message_by_id(
        db,
        message_id,
    )

    if not existing_message:
        return None

    for key, value in message.model_dump(exclude_unset=True).items():
        setattr(existing_message, key, value)

    db.commit()
    db.refresh(existing_message)

    return existing_message


def delete_contact_message(
    db: Session,
    message_id: int,
):
    existing_message = get_contact_message_by_id(
        db,
        message_id,
    )

    if not existing_message:
        return None

    db.delete(existing_message)
    db.commit()

    return existing_message