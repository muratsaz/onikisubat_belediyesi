from fastapi import HTTPException, UploadFile
from sqlalchemy.orm import Session

from app.models.media import Media
from app.utils.file_upload import save_upload_file


ALLOWED_CATEGORIES = {
    "genel",
    "kurumsal",
}


async def create_media(
    db: Session,
    file: UploadFile,
    category: str = "genel",
) -> Media:
    if category not in ALLOWED_CATEGORIES:
        raise HTTPException(
            status_code=400,
            detail="Geçersiz medya kategorisi.",
        )

    result = await save_upload_file(
        file=file,
        module="media",
    )

    media = Media(
        file_name=result["filename"],
        file_path=f"/uploads/{result['relative_path']}",
        category=category,
        mime_type=file.content_type,
        file_size=result["file_size"],
    )

    db.add(media)
    db.commit()
    db.refresh(media)

    return media