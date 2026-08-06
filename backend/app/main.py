from fastapi import FastAPI
from app.api.dashboard import router as dashboard_router
from app.api.user import router as user_router
from app.api.news import router as news_router
from app.api.page import router as page_router
from app.database.database import engine
from app.database.base import Base
from app.api import tender, contact_message
from app.models.user import User
from app.models.news import News
from app.models.announcement import Announcement
from app.models.event import Event
from app.models.gallery import Gallery
from app.models.page import Page
from fastapi.staticfiles import StaticFiles
from app.models.tender import Tender
from app.models.tender_document import TenderDocument
from app.models.contact_message import ContactMessage
from fastapi.middleware.cors import CORSMiddleware
from app.models.project import Project
from app.api import (
    upload,
    announcement,
    event,
    gallery,
    project,
)



app = FastAPI(
    title="Onikişubat Belediyesi API",
    description="Onikişubat Belediyesi Kurumsal Web Sitesi API",
    version="1.0.0"
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
app.include_router(dashboard_router)
app.include_router(page_router)
app.include_router(tender.router)
app.include_router(contact_message.router)
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