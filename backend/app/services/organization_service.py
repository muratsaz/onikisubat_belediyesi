from datetime import datetime

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.organization import Organization

from app.schemas.organization import (
    OrganizationCreate,
    OrganizationUpdate,
)


def get_organization(
    db: Session,
) -> Organization | None:
    return (
        db.query(Organization)
        .order_by(Organization.id.asc())
        .first()
    )


def create_organization(
    db: Session,
    data: OrganizationCreate,
) -> Organization:
    organization = Organization(
        image_url=data.image_url,
    )

    db.add(organization)
    db.commit()
    db.refresh(organization)

    return organization


def update_organization(
    db: Session,
    data: OrganizationUpdate,
) -> Organization:
    organization = get_organization(db)

    if organization is None:
        return create_organization(
            db,
            OrganizationCreate(
                image_url=data.image_url,
            ),
        )

    organization.image_url = data.image_url
    organization.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(organization)

    return organization


def delete_organization(
    db: Session,
) -> None:
    organization = get_organization(db)

    if organization is None:
        raise HTTPException(
            status_code=404,
            detail="Organizasyon şeması bulunamadı.",
        )

    db.delete(organization)
    db.commit()