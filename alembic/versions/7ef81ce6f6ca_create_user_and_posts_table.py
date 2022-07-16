"""create user and posts table

Revision ID: 7ef81ce6f6ca
Revises: 
Create Date: 2022-07-10 14:12:14.492409

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7ef81ce6f6ca'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        'users',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('username', sa.String(256), unique=False),
        sa.Column('password', sa.String(256)),
    )

    op.create_table(
        'posts', 
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('text', sa.String(256)),
    )


def downgrade() -> None:
    pass
