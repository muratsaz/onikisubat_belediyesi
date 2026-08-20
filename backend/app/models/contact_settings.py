from datetime import datetime

from sqlalchemy import DateTime, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class ContactSettings(Base):
    __tablename__ = "contact_settings"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    phone: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True,
    )

    fax: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True,
    )

    email: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    kep: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    website: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    working_hours: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    address: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    instagram: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    facebook: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    x: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    youtube: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    whatsapp: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    alo_153: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )

    e_belediye_url: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )