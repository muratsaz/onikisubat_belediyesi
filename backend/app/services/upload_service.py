from fastapi import UploadFile

from app.utils.file_upload import save_upload_file


async def upload_file(
    file: UploadFile,
    module: str,
) -> dict:
    """
    Dosyayı yükler ve API'nin kullanacağı cevabı oluşturur.
    """

    result = await save_upload_file(
        file=file,
        module=module,
    )

    return {
        "success": True,
        "message": "Dosya başarıyla yüklendi.",
        "filename": result["filename"],
        "path": f"/uploads/{result['relative_path']}",
        "url": f"http://localhost:8000/uploads/{result['relative_path']}",
    }