"""Add relationship between post and user

Revision ID: 4d63dccd63a4
Revises: 7ef81ce6f6ca
Create Date: 2022-07-10 14:35:13.198598

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4d63dccd63a4'
down_revision = '7ef81ce6f6ca'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        'posts',
        sa.Column('owner_id', sa.Integer),
    )


def downgrade() -> None:
    pass
