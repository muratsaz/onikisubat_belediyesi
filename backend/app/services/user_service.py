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
# CREATE ADMIN USER
#
# SADECE SUPERADMIN TARAFINDAN ÇAĞRILIR
#
# Yeni oluşturulan kullanıcı:
# is_admin = True
# is_superadmin = False
# is_active = True
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

    new_user = User(
        username=user.username,
        email=user.email,
        password=hash_password(user.password),
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
#
# SUPERADMIN:
# - Admin yetkisi verebilir/alabilir.
# - SuperAdmin yapabilir.
# - SuperAdmin yetkisini kaldırabilir.
# - Son SuperAdmin'in yetkisini kaldıramaz.
# - Son SuperAdmin'i pasif yapamaz.
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

        # SuperAdmin yetkisi kaldırılmak isteniyor.
        if (
            user.is_superadmin
            and user_data.is_superadmin is False
        ):

            # Bu kullanıcı haricinde başka bir
            # SuperAdmin var mı?
            another_superadmin = (
                db.query(User)
                .filter(
                    User.is_superadmin == True,
                    User.id != user.id
                )
                .first()
            )

            # Başka SuperAdmin yoksa bu son SuperAdmin'dir.
            if another_superadmin is None:
                raise HTTPException(
                    status_code=400,
                    detail="Sistemde en az bir SuperAdmin bulunmalıdır. Son SuperAdmin'in yetkisi kaldırılamaz."
                )

        user.is_superadmin = user_data.is_superadmin

        # SuperAdmin aynı zamanda admin olarak kalır.
        if user.is_superadmin:
            user.is_admin = True

    # -----------------------------------------------------
    # ACTIVE
    # -----------------------------------------------------

    if user_data.is_active is not None:

        # Son SuperAdmin pasif yapılamaz.
        if (
            user.is_superadmin
            and user_data.is_active is False
        ):

            # Bu kullanıcı haricinde başka aktif SuperAdmin
            # bulunup bulunmadığını kontrol ediyoruz.
            another_superadmin = (
                db.query(User)
                .filter(
                    User.is_superadmin == True,
                    User.id != user.id,
                    User.is_active == True
                )
                .first()
            )

            if another_superadmin is None:
                raise HTTPException(
                    status_code=400,
                    detail="Sistemde aktif en az bir SuperAdmin bulunmalıdır. Son aktif SuperAdmin pasif duruma getirilemez."
                )

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

    # -----------------------------------------------------
    # SON SUPERADMIN KONTROLÜ
    # -----------------------------------------------------

    if (
        user.is_superadmin
        and not is_active
    ):

        another_superadmin = (
            db.query(User)
            .filter(
                User.is_superadmin == True,
                User.id != user.id,
                User.is_active == True
            )
            .first()
        )

        if another_superadmin is None:
            raise HTTPException(
                status_code=400,
                detail="Sistemde aktif en az bir SuperAdmin bulunmalıdır. Son aktif SuperAdmin pasif duruma getirilemez."
            )

    user.is_active = is_active

    db.commit()
    db.refresh(user)

    return user


# =========================================================
# DELETE USER
#
# SUPERADMIN:
# - Admin silebilir.
# - Başka SuperAdmin silebilir.
# - Kendini silemez.
# - Sistemdeki son SuperAdmin silinemez.
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

    # -----------------------------------------------------
    # KENDİ HESABINI SİLEMEZ
    # -----------------------------------------------------

    if user.id == current_user.id:
        raise HTTPException(
            status_code=400,
            detail="Kendi hesabınızı silemezsiniz."
        )

    # -----------------------------------------------------
    # SUPERADMIN SİLME KONTROLÜ
    # -----------------------------------------------------

    if user.is_superadmin:

        # Silinecek kullanıcı haricinde başka bir
        # SuperAdmin var mı?
        another_superadmin = (
            db.query(User)
            .filter(
                User.is_superadmin == True,
                User.id != user.id
            )
            .first()
        )

        # Başka SuperAdmin yoksa bu son SuperAdmin'dir.
        if another_superadmin is None:
            raise HTTPException(
                status_code=400,
                detail="Sistemdeki son SuperAdmin silinemez."
            )

    # -----------------------------------------------------
    # DELETE
    # -----------------------------------------------------

    db.delete(user)
    db.commit()

    return True


# =========================================================
# CHANGE OWN PASSWORD
#
# Admin ve SuperAdmin kendi şifresini değiştirebilir.
# =========================================================

def change_own_password(
    db: Session,
    current_user: User,
    password_data: UserPasswordChange
):

    # -----------------------------------------------------
    # MEVCUT ŞİFRE KONTROLÜ
    # -----------------------------------------------------

    if not verify_password(
        password_data.current_password,
        current_user.password
    ):
        raise HTTPException(
            status_code=400,
            detail="Mevcut şifreniz hatalı."
        )

    # -----------------------------------------------------
    # AYNI ŞİFRE KONTROLÜ
    # -----------------------------------------------------

    if (
        password_data.current_password
        == password_data.new_password
    ):
        raise HTTPException(
            status_code=400,
            detail="Yeni şifre mevcut şifre ile aynı olamaz."
        )

    # -----------------------------------------------------
    # YENİ ŞİFRE
    # -----------------------------------------------------

    current_user.password = hash_password(
        password_data.new_password
    )

    db.commit()
    db.refresh(current_user)

    return {
        "message": "Şifreniz başarıyla değiştirildi."
    }