from datetime import datetime, timedelta

import bcrypt
import jwt
from sqlalchemy.orm import Session

from pahalx.auth.models import UserModel
from pahalx.config import ACCESS_TOKEN_EXPIRE_MINUTES, ALGORITHM, SECRET_KEY
from pahalx.expection import AuthErrorCode, TypedHTTPException


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
            raise TypedHTTPException(
                status_code=401,
                msg="Invalid token",
                code=AuthErrorCode.INVALID_TOKEN,
            )
        return payload
    except jwt.ExpiredSignatureError:
        raise TypedHTTPException(
            status_code=401,
            msg="Token expired",
            code=AuthErrorCode.TOKEN_EXPIRED,
        )
    except jwt.PyJWTError:
        raise TypedHTTPException(
            status_code=401,
            msg="Invalid token",
            code=AuthErrorCode.INVALID_TOKEN,
        )


def authenticate_user(db: Session, username: str, password: str) -> UserModel:
    db_user: UserModel | None = (
        db.query(UserModel).filter(UserModel.username == username).first()
    )
    if not db_user:
        raise TypedHTTPException(
            status_code=404,
            msg="User not found",
            code=AuthErrorCode.USER_NOT_FOUND,
        )

    is_valid_password = verify_password(password, str(db_user.password))

    if not is_valid_password:
        raise TypedHTTPException(
            status_code=401,
            msg="Invalid credentials",
            code=AuthErrorCode.INVALID_CREDENTIALS,
        )
    return db_user
