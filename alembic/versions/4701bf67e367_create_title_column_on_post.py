"""create title column on post

Revision ID: 4701bf67e367
Revises: 4d63dccd63a4
Create Date: 2022-07-20 13:20:33.211999

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4701bf67e367'
down_revision = '4d63dccd63a4'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        'posts',
        sa.Column('title', sa.String(256)),
    )


def downgrade() -> None:
    pass
