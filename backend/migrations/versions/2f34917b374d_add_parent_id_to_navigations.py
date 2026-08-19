"""add parent_id to navigations

Revision ID: 2f34917b374d
Revises: 1c819cfbb735
Create Date: 2026-08-19 09:23:36.912222
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.

revision: str = "2f34917b374d"
down_revision: Union[str, Sequence[str], None] = "1c819cfbb735"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""

    op.add_column(
        "navigations",
        sa.Column(
            "parent_id",
            sa.Integer(),
            nullable=True,
        ),
    )

    op.create_foreign_key(
        "fk_navigations_parent_id",
        "navigations",
        "navigations",
        ["parent_id"],
        ["id"],
        ondelete="NO ACTION",
        onupdate="NO ACTION",
    )


def downgrade() -> None:
    """Downgrade schema."""

    op.drop_constraint(
        "fk_navigations_parent_id",
        "navigations",
        type_="foreignkey",
    )

    op.drop_column(
        "navigations",
        "parent_id",
    )