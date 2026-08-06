from datetime import datetime, UTC

from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.models.project import Project
from app.schemas.project import (
    ProjectCreate,
    ProjectUpdate,
)
from app.utils.slug import slugify


def create_project(
    db: Session,
    project: ProjectCreate,
):
    project_data = project.model_dump()

    base_slug = slugify(project.title)
    slug = base_slug
    counter = 1

    while db.query(Project).filter(Project.slug == slug).first():
        slug = f"{base_slug}-{counter}"
        counter += 1

    project_data["slug"] = slug

    if project_data["is_published"]:
        project_data["published_at"] = datetime.now(UTC)

    new_project = Project(**project_data)

    db.add(new_project)
    db.commit()
    db.refresh(new_project)

    return new_project


def get_all_projects(
    db: Session,
    skip: int = 0,
    limit: int = 10,
    search: str | None = None,
    published: bool | None = None,
):
    query = db.query(Project)

    if search:
        query = query.filter(
            or_(
                Project.title.ilike(f"%{search}%"),
                Project.summary.ilike(f"%{search}%"),
                Project.content.ilike(f"%{search}%"),
                Project.location.ilike(f"%{search}%"),
                Project.status.ilike(f"%{search}%"),
            )
        )

    if published is not None:
        query = query.filter(
            Project.is_published == published
        )

    return (
        query
        .order_by(Project.id.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_project_by_id(
    db: Session,
    project_id: int,
):
    return (
        db.query(Project)
        .filter(Project.id == project_id)
        .first()
    )


def update_project(
    db: Session,
    project_id: int,
    project: ProjectUpdate,
):
    existing_project = get_project_by_id(
        db,
        project_id,
    )

    if not existing_project:
        return None

    update_data = project.model_dump()

    if (
        update_data["is_published"]
        and existing_project.published_at is None
    ):
        update_data["published_at"] = datetime.now(UTC)

    for key, value in update_data.items():
        setattr(existing_project, key, value)

    db.commit()
    db.refresh(existing_project)

    return existing_project


def delete_project(
    db: Session,
    project_id: int,
):
    existing_project = get_project_by_id(
        db,
        project_id,
    )

    if not existing_project:
        return None

    db.delete(existing_project)
    db.commit()

    return existing_project