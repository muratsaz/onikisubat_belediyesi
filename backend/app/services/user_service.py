from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import (
    UserCreate,
    UserUpdate,
    UserPasswordChange,
)
from app.core.security import (
    hash_password,
    verify_password,
)


# =========================================================
# CREATE USER
# =========================================================

def create_user(
    db: Session,
    user: UserCreate
):
    existing_user = (
        db.query(User)
        .filter(
            (User.username == user.username)
            | (User.email == user.email)
        )
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Bu kullanıcı adı veya e-posta zaten kayıtlı."
        )

    hashed_password = hash_password(
        user.password
    )

    new_user = User(
        username=user.username,
        email=user.email,
        password=hashed_password,
        is_admin=False,
        is_superadmin=False,
        is_active=True,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


# =========================================================
# CREATE ADMIN USER
# =========================================================

def create_admin_user(
    db: Session,
    user: UserCreate
):
    existing_user = (
        db.query(User)
        .filter(
            (User.username == user.username)
            | (User.email == user.email)
        )
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Bu kullanıcı adı veya e-posta zaten kayıtlı."
        )

    hashed_password = hash_password(
        user.password
    )

    new_user = User(
        username=user.username,
        email=user.email,
        password=hashed_password,
        is_admin=True,
        is_superadmin=False,
        is_active=True,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


# =========================================================
# GET ALL USERS
# =========================================================

def get_all_users(
    db: Session
):
    return (
        db.query(User)
        .order_by(User.id.desc())
        .all()
    )


# =========================================================
# GET USER BY ID
# =========================================================

def get_user_by_id(
    db: Session,
    user_id: int
):
    return (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )


# =========================================================
# UPDATE USER
# =========================================================

def update_user(
    db: Session,
    user_id: int,
    user_data: UserUpdate
):
    user = get_user_by_id(
        db,
        user_id
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="Kullanıcı bulunamadı."
        )

    # -----------------------------------------------------
    # USERNAME
    # -----------------------------------------------------

    if user_data.username is not None:

        existing_username = (
            db.query(User)
            .filter(
                User.username == user_data.username,
                User.id != user_id
            )
            .first()
        )

        if existing_username:
            raise HTTPException(
                status_code=400,
                detail="Bu kullanıcı adı zaten kullanılıyor."
            )

        user.username = user_data.username

    # -----------------------------------------------------
    # EMAIL
    # -----------------------------------------------------

    if user_data.email is not None:

        existing_email = (
            db.query(User)
            .filter(
                User.email == user_data.email,
                User.id != user_id
            )
            .first()
        )

        if existing_email:
            raise HTTPException(
                status_code=400,
                detail="Bu e-posta adresi zaten kullanılıyor."
            )

        user.email = user_data.email

    # -----------------------------------------------------
    # ADMIN
    # -----------------------------------------------------

    if user_data.is_admin is not None:
        user.is_admin = user_data.is_admin

    # -----------------------------------------------------
    # SUPERADMIN
    # -----------------------------------------------------

    if user_data.is_superadmin is not None:
        user.is_superadmin = user_data.is_superadmin

    # -----------------------------------------------------
    # ACTIVE
    # -----------------------------------------------------

    if user_data.is_active is not None:
        user.is_active = user_data.is_active

    db.commit()
    db.refresh(user)

    return user


# =========================================================
# SET USER ACTIVE
# =========================================================

def set_user_active(
    db: Session,
    user_id: int,
    is_active: bool
):
    user = get_user_by_id(
        db,
        user_id
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="Kullanıcı bulunamadı."
        )

    user.is_active = is_active

    db.commit()
    db.refresh(user)

    return user


# =========================================================
# DELETE USER
# =========================================================

def delete_user(
    db: Session,
    user_id: int,
    current_user: User
):
    user = get_user_by_id(
        db,
        user_id
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="Kullanıcı bulunamadı."
        )

    # Kendi hesabını silemez.
    if user.id == current_user.id:
        raise HTTPException(
            status_code=400,
            detail="Kendi hesabınızı silemezsiniz."
        )

    # Superadmin silinemez.
    if user.is_superadmin:
        raise HTTPException(
            status_code=400,
            detail="Superadmin hesabı silinemez."
        )

    db.delete(user)
    db.commit()

    return True


# =========================================================
# CHANGE OWN PASSWORD
# =========================================================

def change_own_password(
    db: Session,
    current_user: User,
    password_data: UserPasswordChange
):
    # Mevcut şifre kontrolü
    if not verify_password(
        password_data.current_password,
        current_user.password
    ):
        raise HTTPException(
            status_code=400,
            detail="Mevcut şifreniz hatalı."
        )

    # Yeni şifre mevcut şifreyle aynı olamaz.
    if (
        password_data.current_password
        == password_data.new_password
    ):
        raise HTTPException(
            status_code=400,
            detail="Yeni şifre mevcut şifre ile aynı olamaz."
        )

    current_user.password = hash_password(
        password_data.new_password
    )

    db.commit()
    db.refresh(current_user)

    return {
        "message": "Şifreniz başarıyla değiştirildi."
    }