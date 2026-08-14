from datetime import datetime

from sqlalchemy.orm import Session

from app.models.deputy_mayor import DeputyMayor
from app.schemas.deputy_mayor import (
    DeputyMayorCreate,
    DeputyMayorUpdate,
)


def get_all_deputy_mayors(
    db: Session,
) -> list[DeputyMayor]:
    return (
        db.query(DeputyMayor)
        .order_by(DeputyMayor.id.asc())
        .all()
    )


def get_deputy_mayor(
    db: Session,
    deputy_mayor_id: int,
) -> DeputyMayor | None:
    return (
        db.query(DeputyMayor)
        .filter(DeputyMayor.id == deputy_mayor_id)
        .first()
    )


def create_deputy_mayor(
    db: Session,
    data: DeputyMayorCreate,
) -> DeputyMayor:
    deputy_mayor = DeputyMayor(
        name=data.name,
        phone=data.phone,
        image=data.image,
    )

    db.add(deputy_mayor)
    db.commit()
    db.refresh(deputy_mayor)

    return deputy_mayor


def update_deputy_mayor(
    db: Session,
    deputy_mayor_id: int,
    data: DeputyMayorUpdate,
) -> DeputyMayor | None:
    deputy_mayor = get_deputy_mayor(
        db,
        deputy_mayor_id,
    )

    if not deputy_mayor:
        return None

    deputy_mayor.name = data.name
    deputy_mayor.phone = data.phone
    deputy_mayor.image = data.image
    deputy_mayor.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(deputy_mayor)

    return deputy_mayor


def delete_deputy_mayor(
    db: Session,
    deputy_mayor_id: int,
) -> bool:
    deputy_mayor = get_deputy_mayor(
        db,
        deputy_mayor_id,
    )

    if not deputy_mayor:
        return False

    db.delete(deputy_mayor)
    db.commit()

    return True
