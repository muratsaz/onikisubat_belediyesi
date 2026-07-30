from datetime import datetime

from sqlalchemy import DateTime, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class Tender(Base):
    __tablename__ = "tenders"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    title: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    tender_number: Mapped[str] = mapped_column(
        String(100),
        unique=True,
        nullable=False
    )

    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    publish_date: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=False
    )

    deadline: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=False
    )

    status: Mapped[str] = mapped_column(
        String(30),
        default="ACTIVE",
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )

    documents = relationship(
        "TenderDocument",
        back_populates="tender",
        cascade="all, delete-orphan"
    )