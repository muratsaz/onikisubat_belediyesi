from sqlalchemy.orm import Session

from app.models.tender import Tender
from app.schemas.tender import TenderCreate, TenderUpdate


def create_tender(db: Session, tender: TenderCreate):
    tender_data = tender.model_dump()

    new_tender = Tender(**tender_data)

    db.add(new_tender)
    db.commit()
    db.refresh(new_tender)

    return new_tender


def get_all_tenders(
    db: Session,
    skip: int = 0,
    limit: int = 10,
):
    return (
        db.query(Tender)
        .order_by(Tender.id.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_tender_by_id(db: Session, tender_id: int):
    return (
        db.query(Tender)
        .filter(Tender.id == tender_id)
        .first()
    )


def update_tender(
    db: Session,
    tender_id: int,
    tender: TenderUpdate,
):
    existing_tender = get_tender_by_id(db, tender_id)

    if not existing_tender:
        return None

    for key, value in tender.model_dump(exclude_unset=True).items():
        setattr(existing_tender, key, value)

    db.commit()
    db.refresh(existing_tender)

    return existing_tender


def delete_tender(db: Session, tender_id: int):
    existing_tender = get_tender_by_id(db, tender_id)

    if not existing_tender:
        return None

    db.delete(existing_tender)
    db.commit()

    return existing_tender