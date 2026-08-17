from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import require_admin
from app.database.database import get_db

from app.schemas.council_member import (
    CouncilMemberCreate,
    CouncilMemberResponse,
    CouncilMemberUpdate,
)

from app.services.council_member_service import (
    get_all_council_members,
    get_council_member,
    create_council_member,
    update_council_member,
    delete_council_member,
)


router = APIRouter(
    prefix="/council-members",
    tags=["Council Members"],
)


@router.get(
    "/",
    response_model=list[CouncilMemberResponse],
)
def get_council_members(
    db: Session = Depends(get_db),
):
    return get_all_council_members(db)


@router.get(
    "/{council_member_id}",
    response_model=CouncilMemberResponse,
)
def get_council_member_data(
    council_member_id: int,
    db: Session = Depends(get_db),
):
    council_member = get_council_member(
        db,
        council_member_id,
    )

    if not council_member:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Meclis üyesi bulunamadı.",
        )

    return council_member


@router.post(
    "/",
    response_model=CouncilMemberResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_council_member_data(
    data: CouncilMemberCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    return create_council_member(
        db=db,
        data=data,
    )


@router.put(
    "/{council_member_id}",
    response_model=CouncilMemberResponse,
)
def update_council_member_data(
    council_member_id: int,
    data: CouncilMemberUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    council_member = update_council_member(
        db=db,
        council_member_id=council_member_id,
        data=data,
    )

    if not council_member:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Meclis üyesi bulunamadı.",
        )

    return council_member


@router.delete(
    "/{council_member_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_council_member_data(
    council_member_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    deleted = delete_council_member(
        db=db,
        council_member_id=council_member_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Meclis üyesi bulunamadı.",
        )

    return None