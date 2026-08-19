from sqlalchemy.orm import Session

from app.models.navigation import Navigation
from app.schemas.navigation import (
    NavigationCreate,
    NavigationUpdate,
)


def get_all_navigation(
    db: Session,
    active_only: bool = False,
):
    query = db.query(Navigation)

    if active_only:
        query = query.filter(
            Navigation.is_active.is_(True)
        )

    return (
        query
        .order_by(
            Navigation.display_order.asc(),
            Navigation.id.asc(),
        )
        .all()
    )


def get_navigation(
    db: Session,
    navigation_id: int,
):
    return (
        db.query(Navigation)
        .filter(Navigation.id == navigation_id)
        .first()
    )


def create_navigation(
    db: Session,
    data: NavigationCreate,
):
    if data.parent_id is not None:
        parent = get_navigation(
            db,
            data.parent_id,
        )

        if not parent:
            raise ValueError(
                "Belirtilen üst menü bulunamadı."
            )

    navigation = Navigation(
        title=data.title,
        path=data.path,
        item_type=data.item_type,
        display_order=data.display_order,
        is_active=data.is_active,
        parent_id=data.parent_id,
    )

    db.add(navigation)
    db.commit()
    db.refresh(navigation)

    return navigation


def update_navigation(
    db: Session,
    navigation_id: int,
    data: NavigationUpdate,
):
    navigation = get_navigation(
        db,
        navigation_id,
    )

    if not navigation:
        return None

    if "parent_id" in data.model_fields_set:

        if data.parent_id == navigation_id:
            raise ValueError(
                "Bir menü kendisinin üst menüsü olamaz."
            )

        if data.parent_id is not None:
            parent = get_navigation(
                db,
                data.parent_id,
            )

            if not parent:
                raise ValueError(
                    "Belirtilen üst menü bulunamadı."
                )

        navigation.parent_id = data.parent_id

    if data.title is not None:
        navigation.title = data.title

    if data.path is not None:
        navigation.path = data.path

    if data.item_type is not None:
        navigation.item_type = data.item_type

    if data.display_order is not None:
        navigation.display_order = data.display_order

    if data.is_active is not None:
        navigation.is_active = data.is_active

    db.commit()
    db.refresh(navigation)

    return navigation


def delete_navigation(
    db: Session,
    navigation_id: int,
):
    navigation = get_navigation(
        db,
        navigation_id,
    )

    if not navigation:
        return None

    db.delete(navigation)
    db.commit()

    return navigation


def update_navigation_order(
    db: Session,
    items: list[dict],
):
    for item in items:
        navigation = get_navigation(
            db,
            item["id"],
        )

        if navigation:
            navigation.display_order = item[
                "display_order"
            ]

    db.commit()

    return get_all_navigation(db)
