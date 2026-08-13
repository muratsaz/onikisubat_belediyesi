from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api.dashboard import router as dashboard_router
from app.api.user import router as user_router
from app.api.news import router as news_router
from app.api.page import router as page_router

from app.api import (
    upload,
    announcement,
    event,
    gallery,
    project,
    media,
    mayor_page,
    mayor,
)

from app.api import tender, contact_message, tender_document

from app.database.database import engine
from app.database.base import Base

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


app = FastAPI(
    title="Onikişubat Belediyesi API",
    description="Onikişubat Belediyesi Kurumsal Web Sitesi API",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


Base.metadata.create_all(bind=engine)


app.include_router(user_router)
app.include_router(news_router)

app.include_router(upload.router)
app.include_router(announcement.router)
app.include_router(event.router)
app.include_router(gallery.router)
app.include_router(project.router)
app.include_router(media.router)

app.include_router(mayor_page.router)

app.include_router(dashboard_router)
app.include_router(page_router)

app.include_router(tender.router)
app.include_router(tender_document.router)
app.include_router(contact_message.router)
app.include_router(mayor.router)

@app.get("/")
def root():
    return {
        "message": "Onikişubat Belediyesi API'ye Hoş Geldiniz!"
    }


@app.get("/health")
def health():
    return {
        "status": "OK"
    }


app.mount(
    "/uploads",
    StaticFiles(directory="app/uploads"),
    name="uploads",
)