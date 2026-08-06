from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Integer,
    String,
    Text,
)
from sqlalchemy.sql import func

from app.database.base import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(255), nullable=False)

    slug = Column(
        String(255),
        unique=True,
        nullable=False,
        index=True,
    )

    summary = Column(Text, nullable=False)

    content = Column(Text, nullable=False)

    image = Column(String(255), nullable=True)

    location = Column(String(255), nullable=False)

    status = Column(
        String(50),
        nullable=False,
    )

    is_published = Column(
        Boolean,
        nullable=False,
        default=False,
    )

    published_at = Column(
        DateTime(timezone=True),
        nullable=True,
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