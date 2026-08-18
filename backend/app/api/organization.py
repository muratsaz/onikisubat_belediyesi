from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.security import require_admin
from app.database.database import get_db

from app.schemas.organization import (
    OrganizationResponse,
    OrganizationUpdate,
)

from app.services.organization_service import (
    get_organization,
    update_organization,
    delete_organization,
)


router = APIRouter(
    prefix="/organization",
    tags=["Organization"],
)


@router.get(
    "/",
    response_model=OrganizationResponse | None,
)
def get_organization_data(
    db: Session = Depends(get_db),
):
    return get_organization(db)


@router.put(
    "/",
    response_model=OrganizationResponse,
)
def update_organization_data(
    data: OrganizationUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    return update_organization(
        db=db,
        data=data,
    )


@router.delete(
    "/",
    status_code=204,
)
def delete_organization_data(
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    delete_organization(db=db)

    return None