from dataclasses import dataclass
from datetime import datetime, timedelta
from enum import Enum
from typing import TypedDict

import bcrypt
import jwt
from fastapi import HTTPException
from sqlalchemy.orm import Session

from pahalx.auth.models import UserModel
from pahalx.config import ACCESS_TOKEN_EXPIRE_MINUTES, ALGORITHM, SECRET_KEY


class AuthErrorCode(Enum):
    USER_NOT_FOUND = "user_not_found"
    INVALID_CREDENTIALS = "invalid_credentials"
    TOKEN_EXPIRED = "token_expired"
    INVALID_TOKEN = "invalid_token"
    UNKNOWN_ERROR = "unknown_error"


@dataclass
class AuthError(TypedDict):
    code: AuthErrorCode


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(
        plain_password.encode("utf-8"), hashed_password.encode("utf-8")
    )


def get_password_hash(password: str) -> str:
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")


def create_access_token(
    data: dict, delta: timedelta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + delta
    to_encode.update(
        {
            "exp": expire,
            "iat": datetime.utcnow(),
        }
    )

    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def verify_access_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(
                status_code=401,
                detail={
                    "msg": "Invalid token",
                    "code": AuthErrorCode.INVALID_TOKEN.value,
                },
            )
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=401,
            detail={
                "msg": "Token expired",
                "code": AuthErrorCode.TOKEN_EXPIRED.value,
            },
        )
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=401,
            detail={
                "msg": "Invalid token",
                "code": AuthErrorCode.INVALID_TOKEN.value,
            },
        )


def authenticate_user(db: Session, username: str, password: str) -> UserModel:
    db_user: UserModel | None = (
        db.query(UserModel).filter(UserModel.username == username).first()
    )
    if not db_user:
        raise HTTPException(
            status_code=404,
            detail={
                "msg": "User not found",
                "code": AuthErrorCode.USER_NOT_FOUND.value,
            },
        )

    is_valid_password = verify_password(password, str(db_user.password))

    if not is_valid_password:
        raise HTTPException(
            status_code=401,
            detail={
                "msg": "Invalid credentials",
                "code": AuthErrorCode.INVALID_CREDENTIALS.value,
            },
        )
    return db_user
