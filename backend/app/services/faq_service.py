from datetime import datetime

from sqlalchemy.orm import Session

from app.models.faq import FAQ
from app.schemas.faq import (
    FAQCreate,
    FAQUpdate,
)


def get_all_faqs(
    db: Session,
):
    return (
        db.query(FAQ)
        .order_by(FAQ.id.asc())
        .all()
    )


def get_faq(
    db: Session,
    faq_id: int,
):
    return (
        db.query(FAQ)
        .filter(
            FAQ.id == faq_id
        )
        .first()
    )


def create_faq(
    db: Session,
    data: FAQCreate,
):
    now = datetime.utcnow()

    faq = FAQ(
        question=data.question,
        answer=data.answer,
        created_at=now,
        updated_at=now,
    )

    db.add(faq)
    db.commit()
    db.refresh(faq)

    return faq


def update_faq(
    db: Session,
    faq_id: int,
    data: FAQUpdate,
):
    faq = get_faq(
        db,
        faq_id,
    )

    if not faq:
        return None

    update_data = data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(
            faq,
            key,
            value,
        )

    faq.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(faq)

    return faq


def delete_faq(
    db: Session,
    faq_id: int,
):
    faq = get_faq(
        db,
        faq_id,
    )

    if not faq:
        return None

    db.delete(faq)
    db.commit()

    return faq