from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime

from app.database.base import Base


class Department(Base):
    __tablename__ = "departments"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    # Müdürlük
    name = Column(
        String(255),
        nullable=False,
    )

    # Müdür
    manager_name = Column(
        String(255),
        nullable=True,
    )

    manager_image = Column(
        String(500),
        nullable=True,
    )

    # İletişim
    phone = Column(
        String(50),
        nullable=True,
    )

    extension = Column(
        String(50),
        nullable=True,
    )

    email = Column(
        String(255),
        nullable=True,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )