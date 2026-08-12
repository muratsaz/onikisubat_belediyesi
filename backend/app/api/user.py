from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.security import (
    authenticate_user,
    create_access_token,
    get_current_user,
    require_superadmin,
)

from app.database.database import get_db

from app.schemas.user import (
    UserCreate,
    UserResponse,
    UserUpdate,
    UserPasswordChange,
    Token,
)

from app.services.user_service import (
    create_admin_user as service_create_admin_user,
    get_all_users,
    get_user_by_id,
    update_user,
    delete_user,
    change_own_password,
)


router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


# =========================================================
# TEST
# =========================================================

@router.get("/")
def test_users():
    return {
        "message": "Users API çalışıyor."
    }


# =========================================================
# LOGIN
# =========================================================

@router.post(
    "/login",
    response_model=Token
)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    db_user = authenticate_user(
        db,
        form_data.username,
        form_data.password
    )

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="E-posta veya şifre hatalı."
        )

    access_token = create_access_token(
        data={
            "sub": db_user.email
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


# =========================================================
# GET ALL USERS
# SADECE SUPERADMIN
# =========================================================

@router.get(
    "/admin",
    response_model=list[UserResponse]
)
def get_users(
    db: Session = Depends(get_db),
    current_user=Depends(require_superadmin)
):
    return get_all_users(db)


# =========================================================
# GET USER BY ID
# SADECE SUPERADMIN
# =========================================================

@router.get(
    "/admin/{user_id}",
    response_model=UserResponse
)
def get_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_superadmin)
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

    return user


# =========================================================
# CREATE ADMIN USER
# SADECE SUPERADMIN
#
# Yeni kullanıcı:
# is_admin = True
# is_superadmin = False
# is_active = True
# =========================================================

@router.post(
    "/admin",
    response_model=UserResponse
)
def create_admin_user(
    user: UserCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_superadmin)
):
    return service_create_admin_user(
        db,
        user
    )


# =========================================================
# UPDATE USER
# SADECE SUPERADMIN
#
# SuperAdmin:
# - Admin yetkisi verebilir/alabilir.
# - Kullanıcıyı SuperAdmin yapabilir.
# - SuperAdmin yetkisini kaldırabilir.
# - Kullanıcıyı aktif/pasif yapabilir.
#
# Son SuperAdmin'in korunması service katmanında
# kontrol edilmektedir.
# =========================================================

@router.put(
    "/admin/{user_id}",
    response_model=UserResponse
)
def update_admin_user(
    user_id: int,
    user_data: UserUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(require_superadmin)
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

    # Kendi hesabında kritik yetki değişikliklerine izin verilmez.
    if user.id == current_user.id:

        if (
            user_data.is_superadmin is not None
            and user_data.is_superadmin is False
        ):
            raise HTTPException(
                status_code=400,
                detail="Kendi superadmin yetkinizi kaldıramazsınız."
            )

        if (
            user_data.is_active is not None
            and user_data.is_active is False
        ):
            raise HTTPException(
                status_code=400,
                detail="Kendi hesabınızı pasif yapamazsınız."
            )

    return update_user(
        db,
        user_id,
        user_data
    )


# =========================================================
# DELETE USER
# SADECE SUPERADMIN
#
# SuperAdmin başka bir SuperAdmin'i silebilir.
#
# Ancak:
# - Kendi hesabını silemez.
# - Sistemdeki son SuperAdmin silinemez.
#
# Son SuperAdmin kontrolü service katmanındadır.
# =========================================================

@router.delete(
    "/admin/{user_id}"
)
def delete_admin_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_superadmin)
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

    # SuperAdmin silme kontrolü service katmanında yapılır.
    delete_user(
        db,
        user_id,
        current_user
    )

    return {
        "message": "Kullanıcı başarıyla silindi.",
        "user_id": user_id
    }
# =========================================================
# CURRENT USER
# GİRİŞ YAPMIŞ KULLANICININ BİLGİLERİ
# =========================================================

@router.get(
    "/me",
    response_model=UserResponse
)
def get_current_user_info(
    current_user=Depends(get_current_user)
):
    return current_user

# =========================================================
# CHANGE OWN PASSWORD
# GİRİŞ YAPMIŞ HER KULLANICI
# =========================================================

@router.put(
    "/me/password"
)
def change_my_password(
    password_data: UserPasswordChange,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return change_own_password(
        db=db,
        current_user=current_user,
        password_data=password_data
    )