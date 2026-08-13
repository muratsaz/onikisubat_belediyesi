from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.security import require_admin
from app.database.database import get_db
from app.schemas.mayor import MayorResponse, MayorUpdate
from app.services.mayor_service import (
    get_mayor,
    update_mayor,
)


router = APIRouter(
    prefix="/mayor",
    tags=["Mayor"],
)


@router.get(
    "/",
    response_model=MayorResponse,
)
def get_mayor_data(
    db: Session = Depends(get_db),
):
    return get_mayor(db)


@router.put(
    "/",
    response_model=MayorResponse,
)
def update_mayor_data(
    data: MayorUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    return update_mayor(
        db=db,
        data=data,
    )