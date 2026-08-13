from datetime import datetime

from sqlalchemy.orm import Session

from app.models.mayor import Mayor
from app.schemas.mayor import MayorUpdate


def get_mayor(db: Session) -> Mayor:
    mayor = (
        db.query(Mayor)
        .order_by(Mayor.id.asc())
        .first()
    )

    if not mayor:
        mayor = Mayor(
            name="Belediye Başkanı",
            title="Onikişubat Belediye Başkanı",
            description="",
            image=None,
        )

        db.add(mayor)
        db.commit()
        db.refresh(mayor)

    return mayor


def update_mayor(
    db: Session,
    data: MayorUpdate,
) -> Mayor:

    mayor = get_mayor(db)

    mayor.name = data.name
    mayor.title = data.title
    mayor.description = data.description
    mayor.image = data.image
    mayor.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(mayor)

    return mayor