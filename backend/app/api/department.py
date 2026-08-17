from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import require_admin
from app.database.database import get_db

from app.schemas.department import (
    DepartmentCreate,
    DepartmentResponse,
    DepartmentUpdate,
)

from app.services.department_service import (
    get_all_departments,
    get_department,
    create_department,
    update_department,
    delete_department,
)


router = APIRouter(
    prefix="/departments",
    tags=["Departments"],
)


@router.get(
    "/",
    response_model=list[DepartmentResponse],
)
def get_departments(
    db: Session = Depends(get_db),
):
    return get_all_departments(db)


@router.get(
    "/{department_id}",
    response_model=DepartmentResponse,
)
def get_department_data(
    department_id: int,
    db: Session = Depends(get_db),
):
    department = get_department(
        db,
        department_id,
    )

    if not department:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Müdürlük bulunamadı.",
        )

    return department


@router.post(
    "/",
    response_model=DepartmentResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_department_data(
    data: DepartmentCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    return create_department(
        db=db,
        data=data,
    )


@router.put(
    "/{department_id}",
    response_model=DepartmentResponse,
)
def update_department_data(
    department_id: int,
    data: DepartmentUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    department = update_department(
        db=db,
        department_id=department_id,
        data=data,
    )

    if not department:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Müdürlük bulunamadı.",
        )

    return department


@router.delete(
    "/{department_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_department_data(
    department_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    deleted = delete_department(
        db=db,
        department_id=department_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Müdürlük bulunamadı.",
        )

    return None