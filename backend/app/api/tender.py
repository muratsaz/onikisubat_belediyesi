from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.tender import (
    TenderCreate,
    TenderUpdate,
    TenderResponse,
)
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
            detail="İhale bulunamadı."
        )

    return tender


@router.put("/{tender_id}", response_model=TenderResponse)
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
            detail="İhale bulunamadı."
        )

    return updated


@router.delete("/{tender_id}")
def delete(
    tender_id: int,
    db: Session = Depends(get_db),
):
    deleted = delete_tender(db, tender_id)

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="İhale bulunamadı."
        )

    return {
        "message": "İhale başarıyla silindi."
    }