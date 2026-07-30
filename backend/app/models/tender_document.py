from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base
from app.models.tender import Tender


class TenderDocument(Base):
    __tablename__ = "tender_documents"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    tender_id: Mapped[int] = mapped_column(
        ForeignKey("tenders.id", ondelete="CASCADE"),
        nullable=False
    )

    file_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    file_path: Mapped[str] = mapped_column(
        String(500),
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    tender: Mapped["Tender"] = relationship(
        "Tender",
        back_populates="documents"
    )