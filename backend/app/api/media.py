from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.media import Media
from app.schemas.media import MediaResponse
from app.services.media_service import create_media


router = APIRouter(
    prefix="/media",
    tags=["Media"],
)


@router.post(
    "/upload",
    response_model=MediaResponse,
)
async def upload_media(
    file: UploadFile = File(...),
    category: str = Form("genel"),
    db: Session = Depends(get_db),
):
    return await create_media(
        db=db,
        file=file,
        category=category,
    )


@router.get(
    "/",
    response_model=list[MediaResponse],
)
def get_all_media(
    category: str | None = None,
    db: Session = Depends(get_db),
):
    query = db.query(Media)

    if category is not None:
        if category not in {"genel", "kurumsal"}:
            raise HTTPException(
                status_code=400,
                detail="Geçersiz medya kategorisi.",
            )

        query = query.filter(
            Media.category == category
        )

    return (
        query
        .order_by(Media.id.desc())
        .all()
    )


@router.get(
    "/{media_id}",
    response_model=MediaResponse,
)
def get_media(
    media_id: int,
    db: Session = Depends(get_db),
):
    media = (
        db.query(Media)
        .filter(Media.id == media_id)
        .first()
    )

    if not media:
        raise HTTPException(
            status_code=404,
            detail="Medya bulunamadı.",
        )

    return media


@router.delete(
    "/{media_id}",
)
def delete_media(
    media_id: int,
    db: Session = Depends(get_db),
):
    media = (
        db.query(Media)
        .filter(Media.id == media_id)
        .first()
    )

    if not media:
        raise HTTPException(
            status_code=404,
            detail="Medya bulunamadı.",
        )

    db.delete(media)
    db.commit()

    return {
        "message": "Medya başarıyla silindi.",
    }