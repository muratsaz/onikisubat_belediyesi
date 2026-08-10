from fastapi import APIRouter, Depends, File, HTTPException, Query, UploadFile
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.tender_document import TenderDocument
from app.schemas.tender import TenderCreate, TenderUpdate, TenderResponse
from app.schemas.tender_document import TenderDocumentResponse
from app.services.tender_document_service import create_tender_document
from app.services.tender_service import (
    create_tender,
    get_all_tenders,
    get_tender_by_id,
    update_tender,
    delete_tender,
)

router = APIRouter(
    prefix="/tenders",
    tags=["Tenders"],
)


@router.post("/", response_model=TenderResponse)
def create(
    tender: TenderCreate,
    db: Session = Depends(get_db),
):
    return create_tender(db, tender)


@router.post(
    "/{tender_id}/documents",
    response_model=TenderDocumentResponse,
)
async def upload_tender_document(
    tender_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    return await create_tender_document(
        db=db,
        tender_id=tender_id,
        file=file,
    )


@router.get("/", response_model=list[TenderResponse])
def get_all(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db),
):
    return get_all_tenders(db, skip, limit)


@router.get("/{tender_id}", response_model=TenderResponse)
def get_by_id(
    tender_id: int,
    db: Session = Depends(get_db),
):
    tender = get_tender_by_id(db, tender_id)

    if not tender:
        raise HTTPException(
            status_code=404,
            detail="İhale bulunamadı.",
        )

    return tender


@router.get(
    "/{tender_id}/documents",
    response_model=list[TenderDocumentResponse],
)
def get_documents(
    tender_id: int,
    db: Session = Depends(get_db),
):
    tender = get_tender_by_id(db, tender_id)

    if not tender:
        raise HTTPException(
            status_code=404,
            detail="İhale bulunamadı.",
        )

    return (
        db.query(TenderDocument)
        .filter(
            TenderDocument.tender_id == tender_id
        )
        .order_by(TenderDocument.id.desc())
        .all()
    )


@router.put(
    "/{tender_id}",
    response_model=TenderResponse,
)
def update(
    tender_id: int,
    tender: TenderUpdate,
    db: Session = Depends(get_db),
):
    updated = update_tender(
        db,
        tender_id,
        tender,
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="İhale bulunamadı.",
        )

    return updated


@router.delete("/{tender_id}")
def delete(
    tender_id: int,
    db: Session = Depends(get_db),
):
    deleted = delete_tender(
        db,
        tender_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="İhale bulunamadı.",
        )

    return {
        "message": "İhale başarıyla silindi."
    }