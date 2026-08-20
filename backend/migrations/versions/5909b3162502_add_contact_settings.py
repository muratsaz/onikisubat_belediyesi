"""add contact settings

Revision ID: 5909b3162502

Revises: 2f34917b374d

Create Date: 2026-08-20 09:00:26.778235

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.

revision: str = "5909b3162502"

down_revision: Union[str, Sequence[str], None] = "2f34917b374d"

branch_labels: Union[str, Sequence[str], None] = None

depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""

    op.create_table(
        "contact_settings",

        sa.Column(
            "id",
            sa.Integer(),
            nullable=False,
        ),

        sa.Column(
            "phone",
            sa.String(length=50),
            nullable=True,
        ),

        sa.Column(
            "fax",
            sa.String(length=50),
            nullable=True,
        ),

        sa.Column(
            "email",
            sa.String(length=255),
            nullable=True,
        ),

        sa.Column(
            "kep",
            sa.String(length=255),
            nullable=True,
        ),

        sa.Column(
            "website",
            sa.String(length=255),
            nullable=True,
        ),

        sa.Column(
            "working_hours",
            sa.String(length=255),
            nullable=True,
        ),

        sa.Column(
            "address",
            sa.String(length=500),
            nullable=True,
        ),

        sa.Column(
            "instagram",
            sa.String(length=500),
            nullable=True,
        ),

        sa.Column(
            "facebook",
            sa.String(length=500),
            nullable=True,
        ),

        sa.Column(
            "x",
            sa.String(length=500),
            nullable=True,
        ),

        sa.Column(
            "youtube",
            sa.String(length=500),
            nullable=True,
        ),

        sa.Column(
            "whatsapp",
            sa.String(length=500),
            nullable=True,
        ),

        sa.Column(
            "alo_153",
            sa.String(length=100),
            nullable=True,
        ),

        sa.Column(
            "e_belediye_url",
            sa.String(length=500),
            nullable=True,
        ),

        sa.Column(
            "updated_at",
            sa.DateTime(),
            nullable=False,
        ),

        sa.PrimaryKeyConstraint("id"),
    )

    op.create_index(
        op.f("ix_contact_settings_id"),
        "contact_settings",
        ["id"],
        unique=False,
    )


def downgrade() -> None:
    """Downgrade schema."""

    op.drop_index(
        op.f("ix_contact_settings_id"),
        table_name="contact_settings",
    )

    op.drop_table("contact_settings")