from fastapi import APIRouter, Depends, HTTPException, status

from sqlalchemy.orm import Session

from app.core.security import require_admin
from app.database.database import get_db

from app.schemas.faq import (
    FAQCreate,
    FAQResponse,
    FAQUpdate,
)

from app.services.faq_service import (
    get_all_faqs,
    get_faq,
    create_faq,
    update_faq,
    delete_faq,
)


router = APIRouter(
    prefix="/faqs",
    tags=["FAQs"],
)


@router.get(
    "/",
    response_model=list[FAQResponse],
)
def get_faqs(
    db: Session = Depends(get_db),
):
    return get_all_faqs(db)


@router.get(
    "/{faq_id}",
    response_model=FAQResponse,
)
def get_faq_data(
    faq_id: int,
    db: Session = Depends(get_db),
):
    faq = get_faq(
        db,
        faq_id,
    )

    if not faq:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="SSS bulunamadı.",
        )

    return faq


@router.post(
    "/",
    response_model=FAQResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_faq_data(
    data: FAQCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    return create_faq(
        db=db,
        data=data,
    )


@router.put(
    "/{faq_id}",
    response_model=FAQResponse,
)
def update_faq_data(
    faq_id: int,
    data: FAQUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    faq = update_faq(
        db=db,
        faq_id=faq_id,
        data=data,
    )

    if not faq:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="SSS bulunamadı.",
        )

    return faq


@router.delete(
    "/{faq_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_faq_data(
    faq_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    deleted = delete_faq(
        db=db,
        faq_id=faq_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="SSS bulunamadı.",
        )

    return None