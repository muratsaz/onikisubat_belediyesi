from logging.config import fileConfig

from sqlalchemy import create_engine, pool
from alembic import context

from app.database.base import Base
from app.database.database import DATABASE_URL

# MODELLER
from app.models.user import User
from app.models.news import News
from app.models.announcement import Announcement
from app.models.event import Event
from app.models.gallery import Gallery
from app.models.page import Page

# YENİ MODELLER
from app.models.tender import Tender
from app.models.tender_document import TenderDocument
from app.models.contact_message import ContactMessage

config = context.config

config.set_main_option("sqlalchemy.url", DATABASE_URL)

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = Base.metadata


def run_migrations_offline() -> None:
    context.configure(
        url=DATABASE_URL,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
        compare_type=True,
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:

    connectable = create_engine(
        DATABASE_URL,
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,
            compare_server_default=True,
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()