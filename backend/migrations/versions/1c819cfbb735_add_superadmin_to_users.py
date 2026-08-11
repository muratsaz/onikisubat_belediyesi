"""add superadmin to users

Revision ID: 1c819cfbb735
Revises: 57f62826a5ea
Create Date: 2026-08-11 15:05:42.033863
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "1c819cfbb735"
down_revision: Union[str, Sequence[str], None] = "57f62826a5ea"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""

    op.add_column(
        "users",
        sa.Column(
            "is_superadmin",
            sa.Boolean(),
            nullable=False,
            server_default=sa.text("0"),
        ),
    )

    op.alter_column(
        "users",
        "is_superadmin",
        server_default=None,
    )


def downgrade() -> None:
    """Downgrade schema."""

    op.drop_column(
        "users",
        "is_superadmin",
    )