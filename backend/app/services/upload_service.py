from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.models.media import Media
from app.utils.file_upload import save_upload_file


MODULE_MEDIA_CATEGORIES = {
    "news": "haberler",
    "projects": "projeler",
}


async def upload_file(
    db: Session,
    file: UploadFile,
    module: str,
) -> dict:
    """
    Dosyayı yükler.

    Haber ve proje görselleri ayrıca Media tablosuna kaydedilir.
    """

    result = await save_upload_file(
        file=file,
        module=module,
    )

    media_category = MODULE_MEDIA_CATEGORIES.get(module)

    if media_category:
        media = Media(
            file_name=result["filename"],
            file_path=f"/uploads/{result['relative_path']}",
            category=media_category,
            mime_type=file.content_type,
            file_size=result["file_size"],
        )

        db.add(media)
        db.commit()
        db.refresh(media)

    return {
        "success": True,
        "message": "Dosya başarıyla yüklendi.",
        "filename": result["filename"],
        "path": f"/uploads/{result['relative_path']}",
        "url": f"http://localhost:8000/uploads/{result['relative_path']}",
    }