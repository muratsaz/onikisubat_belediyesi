from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.security import require_admin
from app.database.database import get_db
from app.schemas.mayor_page import (
    MayorPageResponse,
    MayorPageUpdate,
)
from app.services.mayor_page_service import (
    get_mayor_page,
    update_mayor_page,
)


router = APIRouter(
    prefix="/mayor-page",
    tags=["Mayor Page"],
)


@router.get(
    "/",
    response_model=MayorPageResponse,
)
def get_mayor_page_data(
    db: Session = Depends(get_db),
):
    return get_mayor_page(db)


@router.put(
    "/",
    response_model=MayorPageResponse,
)
def update_mayor_page_data(
    data: MayorPageUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    return update_mayor_page(
        db=db,
        data=data,
    )
