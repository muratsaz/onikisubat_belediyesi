from pathlib import Path
from uuid import uuid4

from fastapi import HTTPException, UploadFile
from sqlalchemy.orm import Session


BASE_UPLOAD_DIR = Path(__file__).resolve().parent.parent / "uploads"


ALLOWED_MODULES = {
    "news",
    "projects",
    "announcement",
    "event",
    "gallery",
    "mayor",
    "media",
    "tenders",
    "deputy_mayor",
    "council_members",
    "departments",
}


ALLOWED_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".gif",
    ".pdf",
    ".doc",
    ".docx",
    ".xls",
    ".xlsx",
}


async def upload_file(
    db: Session,
    file: UploadFile,
    module: str,
):
    module = module.lower().strip()

    if module not in ALLOWED_MODULES:
        raise HTTPException(
            status_code=400,
            detail="Geçersiz upload modülü."
        )

    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="Dosya seçilmedi."
        )

    extension = Path(file.filename).suffix.lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Bu dosya türüne izin verilmiyor."
        )

    from datetime import datetime

    now = datetime.now()

    upload_dir = (
        BASE_UPLOAD_DIR
        / module
        / str(now.year)
        / f"{now.month:02d}"
    )

    upload_dir.mkdir(
        parents=True,
        exist_ok=True
    )

    unique_filename = (
        f"{uuid4().hex}{extension}"
    )

    file_path = upload_dir / unique_filename

    try:
        content = await file.read()

        if not content:
            raise HTTPException(
                status_code=400,
                detail="Yüklenen dosya boş."
            )

        file_path.write_bytes(content)

    except HTTPException:
        raise

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail="Dosya yüklenirken bir hata oluştu."
        ) from exc

    finally:
        await file.close()

    relative_path = (
        Path("uploads")
        / module
        / str(now.year)
        / f"{now.month:02d}"
        / unique_filename
    )

    return {
        "message": "Dosya başarıyla yüklendi.",
        "filename": unique_filename,
        "original_filename": file.filename,
        "module": module,
        "path": relative_path.as_posix(),
        "url": f"/{relative_path.as_posix()}",
    }