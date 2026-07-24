from fastapi import HTTPException
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.security import (
    authenticate_user,
    create_access_token,
)
from app.database.database import get_db
from app.schemas.user import UserCreate, UserResponse, UserLogin,Token
from app.services.user_service import create_user

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.get("/")
def test_users():
    return {
        "message": "Users API çalışıyor."
    }

@router.post("/register",response_model=UserResponse)
def register_user(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    return create_user(db, user)

@router.post("/login", response_model=Token)
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):
    db_user = authenticate_user(
        db,
        user.email,
        user.password
    )

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="E-posta veya şifre hatalı."
        )

    token = create_access_token(
        {
            "sub": db_user.email
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }