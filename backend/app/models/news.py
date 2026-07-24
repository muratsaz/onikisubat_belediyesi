from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Integer,
    String,
    Text
)
from sqlalchemy.sql import func

from app.database.base import Base


class News(Base):
    __tablename__ = "news"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(255), nullable=False)

    slug = Column(String(255), unique=True, nullable=False)

    summary = Column(Text)

    content = Column(Text, nullable=False)

    image = Column(String(255))

    category = Column(String(100))

    is_published = Column(
        Boolean,
        default=True
    )

    published_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )