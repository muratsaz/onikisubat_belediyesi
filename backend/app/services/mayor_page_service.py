from datetime import datetime

from sqlalchemy.orm import Session

from app.models.mayor_page import MayorPage
from app.schemas.mayor_page import MayorPageUpdate


def get_mayor_page(db: Session) -> MayorPage:
    mayor_page = (
        db.query(MayorPage)
        .order_by(MayorPage.id.asc())
        .first()
    )

    if not mayor_page:
        mayor_page = MayorPage(
            name="Hanifi Toptaş",
            title="Onikişubat Belediye Başkanı",
            description="",
            image=None,
        )

        db.add(mayor_page)
        db.commit()
        db.refresh(mayor_page)

    return mayor_page


def update_mayor_page(
    db: Session,
    data: MayorPageUpdate,
) -> MayorPage:

    mayor_page = get_mayor_page(db)

    mayor_page.name = data.name
    mayor_page.title = data.title
    mayor_page.description = data.description
    mayor_page.image = data.image
    mayor_page.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(mayor_page)

    return mayor_page