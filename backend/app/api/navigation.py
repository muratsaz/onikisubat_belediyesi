from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.security import require_admin
from app.database.database import get_db
from app.schemas.navigation import (
    NavigationCreate,
    NavigationResponse,
    NavigationUpdate,
)
from app.services.navigation_service import (
    create_navigation,
    delete_navigation,
    get_all_navigation,
    get_navigation,
    update_navigation,
    update_navigation_order,
)


router = APIRouter(
    prefix="/navigation",
    tags=["Navigation"],
)


# ==========================================
# FRONTEND + ADMIN
# ==========================================

@router.get(
    "/",
    response_model=list[NavigationResponse],
)
def get_navigation_items(
    active_only: bool = False,
    db: Session = Depends(get_db),
):
    return get_all_navigation(
        db,
        active_only,
    )


# ==========================================
# ADMIN - CREATE
# ==========================================

@router.post(
    "/",
    response_model=NavigationResponse,
)
def create_navigation_item(
    data: NavigationCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    try:
        return create_navigation(
            db,
            data,
        )
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


# ==========================================
# ADMIN - UPDATE ORDER
# ==========================================

@router.put(
    "/order/update",
    response_model=list[NavigationResponse],
)
def update_order(
    items: list[dict],
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    return update_navigation_order(
        db,
        items,
    )


# ==========================================
# ADMIN - GET ONE
# ==========================================

@router.get(
    "/{navigation_id}",
    response_model=NavigationResponse,
)
def get_navigation_item(
    navigation_id: int,
    db: Session = Depends(get_db),
):
    navigation = get_navigation(
        db,
        navigation_id,
    )

    if not navigation:
        raise HTTPException(
            status_code=404,
            detail="Menü öğesi bulunamadı.",
        )

    return navigation


# ==========================================
# ADMIN - UPDATE
# ==========================================

@router.put(
    "/{navigation_id}",
    response_model=NavigationResponse,
)
def update_navigation_item(
    navigation_id: int,
    data: NavigationUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    try:
        navigation = update_navigation(
            db,
            navigation_id,
            data,
        )
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )

    if not navigation:
        raise HTTPException(
            status_code=404,
            detail="Menü öğesi bulunamadı.",
        )

    return navigation


# ==========================================
# ADMIN - DELETE
# ==========================================

@router.delete(
    "/{navigation_id}",
)
def delete_navigation_item(
    navigation_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    navigation = delete_navigation(
        db,
        navigation_id,
    )

    if not navigation:
        raise HTTPException(
            status_code=404,
            detail="Menü öğesi bulunamadı.",
        )

    return {
        "message": "Menü öğesi başarıyla silindi.",
    }