from __future__ import annotations

from datetime import datetime
from pathlib import Path
from uuid import uuid4

from fastapi import HTTPException, UploadFile


# =============================================================================
# CONFIGURATION
# =============================================================================

BASE_DIR = Path(__file__).resolve().parents[2]

UPLOAD_ROOT = BASE_DIR / "app" / "uploads"

ALLOWED_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
}

MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB


# =============================================================================
# VALIDATION
# =============================================================================

def validate_module(module: str) -> None:
    """
    Upload yapılabilecek modülleri doğrular.
    """

    allowed_modules = {
        "news",
        "announcements",
        "events",
        "gallery",
        "mayor",
    }

    if module not in allowed_modules:
        raise HTTPException(
            status_code=400,
            detail="Geçersiz upload modülü."
        )


def validate_extension(filename: str) -> str:
    """
    Dosya uzantısını doğrular.
    """

    extension = Path(filename).suffix.lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Sadece JPG, JPEG, PNG ve WEBP dosyaları yüklenebilir."
        )

    return extension


async def validate_file_size(file: UploadFile) -> None:
    """
    Dosya boyutunu doğrular.
    """

    contents = await file.read()

    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail="Dosya boyutu maksimum 5 MB olabilir."
        )

    await file.seek(0)


# =============================================================================
# FILE HELPERS
# =============================================================================

def generate_filename(extension: str) -> str:
    """
    UUID tabanlı benzersiz dosya adı üretir.
    """

    return f"{uuid4()}{extension}"


def create_upload_directory(module: str) -> Path:
    """
    uploads/module/yyyy/mm klasörünü oluşturur.
    """

    now = datetime.now()

    directory = (
        UPLOAD_ROOT
        / module
        / str(now.year)
        / f"{now.month:02d}"
    )

    directory.mkdir(
        parents=True,
        exist_ok=True,
    )

    return directory


# =============================================================================
# PUBLIC FUNCTION
# =============================================================================

async def save_upload_file(
    file: UploadFile,
    module: str,
) -> dict:
    """
    Dosyayı kaydeder.

    Returns:
        {
            filename,
            relative_path,
            absolute_path
        }
    """

    validate_module(module)

    extension = validate_extension(file.filename)

    await validate_file_size(file)

    filename = generate_filename(extension)

    directory = create_upload_directory(module)

    file_path = directory / filename

    contents = await file.read()

    with open(file_path, "wb") as buffer:
        buffer.write(contents)

    await file.seek(0)

    relative_path = file_path.relative_to(UPLOAD_ROOT).as_posix()

    return {
        "filename": filename,
        "relative_path": relative_path,
        "absolute_path": str(file_path),
    }