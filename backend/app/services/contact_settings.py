from datetime import datetime

from sqlalchemy.orm import Session

from app.models.contact_settings import ContactSettings
from app.schemas.contact_settings import (
    ContactSettingsCreate,
    ContactSettingsUpdate,
)


def get_contact_settings(
    db: Session,
):
    return (
        db.query(ContactSettings)
        .order_by(ContactSettings.id.asc())
        .first()
    )


def create_contact_settings(
    db: Session,
    data: ContactSettingsCreate,
):
    now = datetime.utcnow()

    contact_settings = ContactSettings(
        phone=data.phone,
        fax=data.fax,
        email=data.email,
        kep=data.kep,
        website=data.website,
        working_hours=data.working_hours,
        address=data.address,
        instagram=data.instagram,
        facebook=data.facebook,
        x=data.x,
        youtube=data.youtube,
        whatsapp=data.whatsapp,
        alo_153=data.alo_153,
        e_belediye_url=data.e_belediye_url,
        updated_at=now,
    )

    db.add(contact_settings)
    db.commit()
    db.refresh(contact_settings)

    return contact_settings


def update_contact_settings(
    db: Session,
    data: ContactSettingsUpdate,
):
    contact_settings = get_contact_settings(db)

    if not contact_settings:
        return None

    update_data = data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(
            contact_settings,
            key,
            value,
        )

    contact_settings.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(contact_settings)

    return contact_settings