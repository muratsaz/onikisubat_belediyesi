from fastapi import FastAPI

from app.api.user import router as user_router
from app.api.news import router as news_router

from app.database.database import engine
from app.database.base import Base

from app.models.user import User
from app.models.news import News
from fastapi.staticfiles import StaticFiles


from app.api import upload,announcement



app = FastAPI(
    title="Onikişubat Belediyesi API",
    description="Onikişubat Belediyesi Kurumsal Web Sitesi API",
    version="1.0.0"
)

Base.metadata.create_all(bind=engine)

app.include_router(user_router)
app.include_router(news_router)
app.include_router(upload.router)
app.include_router(announcement.router)


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