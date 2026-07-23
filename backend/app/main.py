from fastapi import FastAPI

app = FastAPI(
    title="Onikişubat Belediyesi API",
    description="Onikişubat Belediyesi Kurumsal Web Sitesi API",
    version="1.0.0"
)

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
from app.database.database import engine
from app.database.base import Base
from app.models.user import User

Base.metadata.create_all(bind=engine)