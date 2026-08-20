"""add faqs

Revision ID: 7cc3dfaafd17

Revises: 5909b3162502

"""

from typing import Sequence, Union

from alembic import op


revision: str = "7cc3dfaafd17"

down_revision: Union[str, Sequence[str], None] = "5909b3162502"

branch_labels: Union[str, Sequence[str], None] = None

depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass