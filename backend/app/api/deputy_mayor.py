from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import require_admin
from app.database.database import get_db

from app.schemas.deputy_mayor import (
    DeputyMayorCreate,
    DeputyMayorResponse,
    DeputyMayorUpdate,
)

from app.services.deputy_mayor_service import (
    get_all_deputy_mayors,
    get_deputy_mayor,
    create_deputy_mayor,
    update_deputy_mayor,
    delete_deputy_mayor,
)


router = APIRouter(
    prefix="/deputy-mayors",
    tags=["Deputy Mayors"],
)


@router.get(
    "/",
    response_model=list[DeputyMayorResponse],
)
def get_deputy_mayors(
    db: Session = Depends(get_db),
):
    return get_all_deputy_mayors(db)


@router.get(
    "/{deputy_mayor_id}",
    response_model=DeputyMayorResponse,
)
def get_deputy_mayor_data(
    deputy_mayor_id: int,
    db: Session = Depends(get_db),
):
    deputy_mayor = get_deputy_mayor(
        db,
        deputy_mayor_id,
    )

    if not deputy_mayor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Başkan yardımcısı bulunamadı.",
        )

    return deputy_mayor


@router.post(
    "/",
    response_model=DeputyMayorResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_deputy_mayor_data(
    data: DeputyMayorCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    return create_deputy_mayor(
        db=db,
        data=data,
    )


@router.put(
    "/{deputy_mayor_id}",
    response_model=DeputyMayorResponse,
)
def update_deputy_mayor_data(
    deputy_mayor_id: int,
    data: DeputyMayorUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    deputy_mayor = update_deputy_mayor(
        db=db,
        deputy_mayor_id=deputy_mayor_id,
        data=data,
    )

    if not deputy_mayor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Başkan yardımcısı bulunamadı.",
        )

    return deputy_mayor


@router.delete(
    "/{deputy_mayor_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_deputy_mayor_data(
    deputy_mayor_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    deleted = delete_deputy_mayor(
        db=db,
        deputy_mayor_id=deputy_mayor_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Başkan yardımcısı bulunamadı.",
        )

    return None