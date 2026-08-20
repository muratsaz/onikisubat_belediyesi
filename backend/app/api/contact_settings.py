from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.contact_settings import (
    ContactSettingsCreate,
    ContactSettingsResponse,
    ContactSettingsUpdate,
)
from app.services.contact_settings import (
    get_contact_settings,
    create_contact_settings,
    update_contact_settings,
)


router = APIRouter(
    prefix="/contact-settings",
    tags=["Contact Settings"],
)


@router.get(
    "",
    response_model=ContactSettingsResponse,
)
def read_contact_settings(
    db: Session = Depends(get_db),
):
    contact_settings = get_contact_settings(db)

    if not contact_settings:
        raise HTTPException(
            status_code=404,
            detail="İletişim ayarları bulunamadı.",
        )

    return contact_settings


@router.post(
    "",
    response_model=ContactSettingsResponse,
)
def create_contact_settings_endpoint(
    data: ContactSettingsCreate,
    db: Session = Depends(get_db),
):
    existing = get_contact_settings(db)

    if existing:
        raise HTTPException(
            status_code=400,
            detail="İletişim ayarları zaten mevcut.",
        )

    return create_contact_settings(
        db,
        data,
    )


@router.put(
    "",
    response_model=ContactSettingsResponse,
)
def update_contact_settings_endpoint(
    data: ContactSettingsUpdate,
    db: Session = Depends(get_db),
):
    contact_settings = update_contact_settings(
        db,
        data,
    )

    if not contact_settings:
        raise HTTPException(
            status_code=404,
            detail="İletişim ayarları bulunamadı.",
        )

    return contact_settings