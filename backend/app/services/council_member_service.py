from datetime import datetime

from sqlalchemy.orm import Session

from app.models.council_member import CouncilMember
from app.schemas.council_member import (
    CouncilMemberCreate,
    CouncilMemberUpdate,
)


def get_all_council_members(
    db: Session,
) -> list[CouncilMember]:
    return (
        db.query(CouncilMember)
        .order_by(CouncilMember.id.asc())
        .all()
    )


def get_council_member(
    db: Session,
    council_member_id: int,
) -> CouncilMember | None:
    return (
        db.query(CouncilMember)
        .filter(
            CouncilMember.id == council_member_id
        )
        .first()
    )


def create_council_member(
    db: Session,
    data: CouncilMemberCreate,
) -> CouncilMember:
    council_member = CouncilMember(
        name=data.name,
        party=data.party,
        image=data.image,
    )

    db.add(council_member)
    db.commit()
    db.refresh(council_member)

    return council_member


def update_council_member(
    db: Session,
    council_member_id: int,
    data: CouncilMemberUpdate,
) -> CouncilMember | None:
    council_member = get_council_member(
        db,
        council_member_id,
    )

    if not council_member:
        return None

    council_member.name = data.name
    council_member.party = data.party
    council_member.image = data.image
    council_member.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(council_member)

    return council_member


def delete_council_member(
    db: Session,
    council_member_id: int,
) -> bool:
    council_member = get_council_member(
        db,
        council_member_id,
    )

    if not council_member:
        return False

    db.delete(council_member)
    db.commit()

    return True