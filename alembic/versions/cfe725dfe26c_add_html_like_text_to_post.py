"""Add html-like text to post

Revision ID: cfe725dfe26c
Revises: 4701bf67e367
Create Date: 2022-07-21 12:36:55.493121

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cfe725dfe26c'
down_revision = '4701bf67e367'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        'posts',
        sa.Column('textHtml', sa.String(256)),
    )


def downgrade() -> None:
    pass
