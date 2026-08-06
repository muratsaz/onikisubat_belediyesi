from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.security import require_admin
from app.database.database import get_db

from app.schemas.project import (
    ProjectCreate,
    ProjectResponse,
    ProjectUpdate,
)

from app.services.project_service import (
    create_project,
    delete_project,
    get_all_projects,
    get_project_by_id,
    update_project,
)

router = APIRouter(
    prefix="/projects",
    tags=["Projects"],
)


@router.post("/", response_model=ProjectResponse)
def create(
    project: ProjectCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    return create_project(db, project)


@router.get("/", response_model=list[ProjectResponse])
def get_all(
    skip: int = 0,
    limit: int = 10,
    search: str | None = None,
    published: bool | None = None,
    db: Session = Depends(get_db),
):
    return get_all_projects(
        db=db,
        skip=skip,
        limit=limit,
        search=search,
        published=published,
    )


@router.get("/{project_id}", response_model=ProjectResponse)
def get_one(
    project_id: int,
    db: Session = Depends(get_db),
):
    project = get_project_by_id(
        db,
        project_id,
    )

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Proje bulunamadı",
        )

    return project


@router.put("/{project_id}", response_model=ProjectResponse)
def update(
    project_id: int,
    project: ProjectUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    updated = update_project(
        db,
        project_id,
        project,
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Proje bulunamadı",
        )

    return updated


@router.delete("/{project_id}")
def delete(
    project_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    deleted = delete_project(
        db,
        project_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Proje bulunamadı",
        )

    return {
        "message": "Proje başarıyla silindi."
    }