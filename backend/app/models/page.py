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


class Page(Base):
    __tablename__ = "pages"

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

    cover_image = Column(
    String(255),
    nullable=True,
)

    seo_title = Column(
    String(255),
    nullable=True,
)

    seo_description = Column(
    Text,
    nullable=True,
)

    is_published = Column(
        Boolean,
        default=True,
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