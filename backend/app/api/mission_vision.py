from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import require_admin
from app.database.database import get_db

from app.schemas.mission_vision import (
    MissionVisionResponse,
    MissionVisionUpdate,
)

from app.services.mission_vision_service import (
    get_mission_vision,
    update_mission_vision,
)


router = APIRouter(
    prefix="/mission-vision",
    tags=["Mission & Vision"],
)


@router.get(
    "/",
    response_model=MissionVisionResponse,
)
def get_mission_vision_data(
    db: Session = Depends(get_db),
):
    mission_vision = get_mission_vision(db)

    if not mission_vision:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Misyon ve vizyon bilgisi henüz oluşturulmadı.",
        )

    return mission_vision


@router.put(
    "/",
    response_model=MissionVisionResponse,
)
def update_mission_vision_data(
    data: MissionVisionUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    return update_mission_vision(
        db=db,
        data=data,
    )