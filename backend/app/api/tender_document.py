from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.tender_document import (
    TenderDocumentCreate,
    TenderDocumentResponse,
)
from app.services.tender_document_service import (
    create_tender_document,
    get_tender_documents,
    delete_tender_document,
)

router = APIRouter(
    prefix="/tenders",
    tags=["Tender Documents"],
)


@router.post(
    "/{tender_id}/documents",
    response_model=TenderDocumentResponse,
)
def create_document(
    tender_id: int,
    document: TenderDocumentCreate,
    db: Session = Depends(get_db),
):
    result = create_tender_document(
        db,
        tender_id,
        document,
    )

    if not result:
        raise HTTPException(
            status_code=404,
            detail="İhale bulunamadı.",
        )

    return result


@router.get(
    "/{tender_id}/documents",
    response_model=list[TenderDocumentResponse],
)
def get_documents(
    tender_id: int,
    db: Session = Depends(get_db),
):
    return get_tender_documents(
        db,
        tender_id,
    )


@router.delete(
    "/{tender_id}/documents/{document_id}",
)
def delete_document(
    tender_id: int,
    document_id: int,
    db: Session = Depends(get_db),
):
    result = delete_tender_document(
        db,
        tender_id,
        document_id,
    )

    if not result:
        raise HTTPException(
            status_code=404,
            detail="İhale belgesi bulunamadı.",
        )

    return {
        "message": "İhale belgesi başarıyla silindi."
    }