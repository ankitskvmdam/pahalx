from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from pahalx.auth.check_user_authentication import check_user_authentication
from pahalx.auth.models import UserModel
from pahalx.auth.schemas import User, UserAccessToken, UserCreate
from pahalx.auth.utils import (
    authenticate_user,
    create_access_token,
    get_password_hash,
)
from pahalx.database.database import get_db

router = APIRouter(
    prefix="/v1/auth",
    tags=["auth"],
)


@router.post("/users")
def create_user(user: UserCreate, db: Session = Depends(get_db)) -> User:
    db_user = db.query(UserModel).filter(UserModel.username == user.username).first()

    if db_user:
        raise HTTPException(status_code=400, detail="Username already exists")

    new_user = UserModel(
        username=user.username,
        name=user.name,
        password=get_password_hash(user.password),
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return User(
        id=str(new_user.id),
        username=str(new_user.username),
        name=str(new_user.name),
    )


@router.post("/login")
def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Session = Depends(get_db),
) -> UserAccessToken:

    user = authenticate_user(db, form_data.username, form_data.password)
    access_token = create_access_token({"sub": user.username})

    return UserAccessToken(access_token=access_token, token_type="bearer")


@router.get("/users/me")
def get_current_user(
    user: User = Depends(check_user_authentication),
) -> User:
    return user
