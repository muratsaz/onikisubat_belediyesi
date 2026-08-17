from datetime import datetime

from sqlalchemy.orm import Session

from app.models.department import Department
from app.schemas.department import (
    DepartmentCreate,
    DepartmentUpdate,
)


def get_all_departments(
    db: Session,
) -> list[Department]:
    return (
        db.query(Department)
        .order_by(Department.id.asc())
        .all()
    )


def get_department(
    db: Session,
    department_id: int,
) -> Department | None:
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
) -> Department:

    department = Department(
        name=data.name,
        phone=data.phone,
        extension=data.extension,
        email=data.email,
        image=data.image,
    )

    db.add(department)
    db.commit()
    db.refresh(department)

    return department


def update_department(
    db: Session,
    department_id: int,
    data: DepartmentUpdate,
) -> Department | None:

    department = get_department(
        db,
        department_id,
    )

    if not department:
        return None

    department.name = data.name
    department.phone = data.phone
    department.extension = data.extension
    department.email = data.email
    department.image = data.image
    department.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(department)

    return department


def delete_department(
    db: Session,
    department_id: int,
) -> bool:

    department = get_department(
        db,
        department_id,
    )

    if not department:
        return False

    db.delete(department)
    db.commit()

    return True