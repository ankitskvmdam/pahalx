from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from pahalx.auth.models import UserModel
from pahalx.auth.schemas import User, UserAccessToken, UserCreate
from pahalx.auth.utils import (
    AuthErrorCode,
    authenticate_user,
    create_access_token,
    get_password_hash,
    verify_access_token,
)
from pahalx.database.database import get_db

router = APIRouter(
    prefix="/v1/auth",
    tags=["auth"],
)

oauth2_schema = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")


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
    token: str = Depends(oauth2_schema),
    db: Session = Depends(get_db),
) -> User:
    payload = verify_access_token(token)
    username = payload.get("sub")
    user = db.query(UserModel).filter(UserModel.username == username).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail={
                "msg": "User not found",
                "code": AuthErrorCode.USER_NOT_FOUND.value,
            },
        )

    return User(username=str(user.username), name=str(user.name), id=str(user.id))
