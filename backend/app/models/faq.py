from datetime import datetime

from sqlalchemy import Column, Integer, String, Text, DateTime

from app.database.base import Base


class FAQ(Base):
    __tablename__ = "faqs"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    question = Column(
        String(500),
        nullable=False,
    )

    answer = Column(
        Text,
        nullable=False,
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