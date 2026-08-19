from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database.base import Base


class Navigation(Base):
    __tablename__ = "navigations"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    title = Column(
        String(100),
        nullable=False,
    )

    path = Column(
        String(255),
        nullable=False,
    )

    item_type = Column(
        String(20),
        nullable=False,
        default="route",
    )

    display_order = Column(
        Integer,
        nullable=False,
        default=0,
        index=True,
    )

    is_active = Column(
        Boolean,
        nullable=False,
        default=True,
    )

    parent_id = Column(
        Integer,
        ForeignKey("navigations.id"),
        nullable=True,
        index=True,
    )

    parent = relationship(
        "Navigation",
        remote_side=[id],
        back_populates="children",
    )

    children = relationship(
        "Navigation",
        back_populates="parent",
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )
