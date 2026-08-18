from datetime import datetime

from sqlalchemy.orm import Session

from app.models.department import Department
from app.schemas.department import (
    DepartmentCreate,
    DepartmentUpdate,
)


def get_all_departments(
    db: Session,
):
    return (
        db.query(Department)
        .order_by(Department.id.asc())
        .all()
    )


def get_department(
    db: Session,
    department_id: int,
):
    return (
        db.query(Department)
        .filter(
            Department.id == department_id
        )
        .first()
    )


def create_department(
    db: Session,
    data: DepartmentCreate,
):
    now = datetime.utcnow()

    department = Department(
        name=data.name,
        manager_name=data.manager_name,
        manager_image=data.manager_image,
        phone=data.phone,
        extension=data.extension,
        email=data.email,
        created_at=now,
        updated_at=now,
    )

    db.add(department)
    db.commit()
    db.refresh(department)

    return department


def update_department(
    db: Session,
    department_id: int,
    data: DepartmentUpdate,
):
    department = get_department(
        db,
        department_id,
    )

    if not department:
        return None

    update_data = data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(
            department,
            key,
            value,
        )

    department.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(department)

    return department


def delete_department(
    db: Session,
    department_id: int,
):
    department = get_department(
        db,
        department_id,
    )

    if not department:
        return None

    db.delete(department)
    db.commit()

    return department