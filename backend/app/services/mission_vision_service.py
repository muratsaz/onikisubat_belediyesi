from datetime import datetime

from sqlalchemy.orm import Session

from app.models.mission_vision import MissionVision
from app.schemas.mission_vision import (
    MissionVisionCreate,
    MissionVisionUpdate,
)


def get_mission_vision(
    db: Session,
) -> MissionVision | None:
    return (
        db.query(MissionVision)
        .order_by(MissionVision.id.asc())
        .first()
    )


def create_mission_vision(
    db: Session,
    data: MissionVisionCreate,
) -> MissionVision:
    mission_vision = MissionVision(
        mission=data.mission,
        vision=data.vision,
    )

    db.add(mission_vision)
    db.commit()
    db.refresh(mission_vision)

    return mission_vision


def update_mission_vision(
    db: Session,
    data: MissionVisionUpdate,
) -> MissionVision:
    mission_vision = get_mission_vision(db)

    if mission_vision is None:
        return create_mission_vision(
            db,
            MissionVisionCreate(
                mission=data.mission,
                vision=data.vision,
            ),
        )

    mission_vision.mission = data.mission
    mission_vision.vision = data.vision
    mission_vision.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(mission_vision)

    return mission_vision