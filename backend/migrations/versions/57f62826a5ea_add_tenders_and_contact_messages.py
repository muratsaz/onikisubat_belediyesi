"""add_tenders_and_contact_messages

Revision ID: 57f62826a5ea
Revises: 44a0b5ac1c17
Create Date: 2026-07-30 10:49:40.775346

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = "57f62826a5ea"
down_revision: Union[str, Sequence[str], None] = "44a0b5ac1c17"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""

    op.create_table(
        "contact_messages",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("full_name", sa.String(length=150), nullable=False),
        sa.Column("email", sa.String(length=150), nullable=False),
        sa.Column("phone", sa.String(length=20), nullable=False),
        sa.Column("subject", sa.String(length=255), nullable=False),
        sa.Column("message", sa.Text(), nullable=False),
        sa.Column("is_read", sa.Boolean(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_index(
        op.f("ix_contact_messages_id"),
        "contact_messages",
        ["id"],
        unique=False,
    )

    op.create_table(
        "tenders",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("title", sa.String(length=255), nullable=False),
        sa.Column("tender_number", sa.String(length=100), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("publish_date", sa.DateTime(), nullable=False),
        sa.Column("deadline", sa.DateTime(), nullable=False),
        sa.Column("status", sa.String(length=30), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("tender_number"),
    )

    op.create_index(
        op.f("ix_tenders_id"),
        "tenders",
        ["id"],
        unique=False,
    )

    op.create_table(
        "tender_documents",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("tender_id", sa.Integer(), nullable=False),
        sa.Column("file_name", sa.String(length=255), nullable=False),
        sa.Column("file_path", sa.String(length=500), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(
            ["tender_id"],
            ["tenders.id"],
            ondelete="CASCADE",
        ),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_index(
        op.f("ix_tender_documents_id"),
        "tender_documents",
        ["id"],
        unique=False,
    )


def downgrade() -> None:
    """Downgrade schema."""

    op.drop_index(
        op.f("ix_tender_documents_id"),
        table_name="tender_documents",
    )
    op.drop_table("tender_documents")

    op.drop_index(
        op.f("ix_tenders_id"),
        table_name="tenders",
    )
    op.drop_table("tenders")

    op.drop_index(
        op.f("ix_contact_messages_id"),
        table_name="contact_messages",
    )
    op.drop_table("contact_messages")