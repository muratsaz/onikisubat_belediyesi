from fastapi import HTTPException, UploadFile
from sqlalchemy.orm import Session

from app.models.tender import Tender
from app.models.tender_document import TenderDocument
from app.utils.file_upload import save_upload_file


async def create_tender_document(
    db: Session,
    tender_id: int,
    file: UploadFile,
):
    tender = (
        db.query(Tender)
        .filter(Tender.id == tender_id)
        .first()
    )

    if not tender:
        raise HTTPException(
            status_code=404,
            detail="İhale bulunamadı.",
        )

    result = await save_upload_file(
        file=file,
        module="tenders",
    )

    document = TenderDocument(
        tender_id=tender_id,
        file_name=result["filename"],
        file_path=f"/uploads/{result['relative_path']}",
    )

    db.add(document)
    db.commit()
    db.refresh(document)

    return document


def get_tender_documents(
    db: Session,
    tender_id: int,
):
    tender = (
        db.query(Tender)
        .filter(Tender.id == tender_id)
        .first()
    )

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


def get_tender_document(
    db: Session,
    document_id: int,
):
    document = (
        db.query(TenderDocument)
        .filter(TenderDocument.id == document_id)
        .first()
    )

    return document


def delete_tender_document(
    db: Session,
    document_id: int,
):
    document = (
        db.query(TenderDocument)
        .filter(TenderDocument.id == document_id)
        .first()
    )

    if not document:
        return None

    db.delete(document)
    db.commit()

    return document