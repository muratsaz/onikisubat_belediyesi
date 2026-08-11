from fastapi import APIRouter, Depends, File, UploadFile
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.services.upload_service import upload_file

router = APIRouter(
    prefix="/upload",
    tags=["Upload"],
)


@router.post("/{module}")
async def upload(
    module: str,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    return await upload_file(
        db=db,
        file=file,
        module=module,
    )