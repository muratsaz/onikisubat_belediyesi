from fastapi import FastAPI

from app.api.user import router as user_router
from app.api.news import router as news_router

from app.database.database import engine
from app.database.base import Base

from app.models.user import User
from app.models.news import News


app = FastAPI(
    title="Onikişubat Belediyesi API",
    description="Onikişubat Belediyesi Kurumsal Web Sitesi API",
    version="1.0.0"
)

Base.metadata.create_all(bind=engine)

app.include_router(user_router)
app.include_router(news_router)


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