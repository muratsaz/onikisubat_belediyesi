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

from app.models.tender import Tender
from app.models.tender_document import TenderDocument
from app.models.contact_message import ContactMessage

from app.models.project import Project
from app.models.media import Media

from app.models.mayor import Mayor
from app.models.mayor_page import MayorPage
from app.models.deputy_mayor import DeputyMayor

from app.models.council_member import CouncilMember
from app.models.department import Department
from app.models.mission_vision import MissionVision
from app.models.organization import Organization
from app.models.navigation import Navigation

from app.models.contact_settings import ContactSettings
from app.models.faq import FAQ


config = context.config

config.set_main_option(
    "sqlalchemy.url",
    DATABASE_URL,
)


if config.config_file_name is not None:
    fileConfig(config.config_file_name)


target_metadata = Base.metadata


def run_migrations_offline() -> None:

    context.configure(
        url=DATABASE_URL,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={
            "paramstyle": "named"
        },
        compare_type=True,
        compare_server_default=True,
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