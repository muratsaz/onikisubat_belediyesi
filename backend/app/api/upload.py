from fastapi import APIRouter, File, UploadFile

from app.services.upload_service import upload_file

router = APIRouter(
    prefix="/upload",
    tags=["Upload"],
)


@router.post("/{module}")
async def upload(
    module: str,
    file: UploadFile = File(...),
):
    return await upload_file(
        file=file,
        module=module,
    )