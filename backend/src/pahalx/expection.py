from enum import Enum
from typing import Generic, TypeVar

from fastapi import HTTPException
from pydantic import BaseModel

E = TypeVar("E", bound=Enum)


class TypedHTTPExceptionDetails(BaseModel, Generic[E]):
    msg: str
    code: E


class TypedHTTPExceptionModel(BaseModel, Generic[E]):
    detail: TypedHTTPExceptionDetails[E]


class TypedHTTPException(HTTPException):
    def __init__(self, msg: str, code: Enum, status_code: int):
        super().__init__(
            status_code=status_code,
            detail={"msg": msg, "code": code.value},
        )


class AuthErrorCode(Enum):
    USER_NOT_FOUND = "user_not_found"
    INVALID_CREDENTIALS = "invalid_credentials"
    TOKEN_EXPIRED = "token_expired"
    INVALID_TOKEN = "invalid_token"
    USER_ALREADY_EXISTS = "user_already_exists"
    UNKNOWN_ERROR = "unknown_error"


class ChatErrorCode(Enum):
    CHAT_NOT_FOUND = "chat_not_found"
    MESSAGE_NOT_FOUND = "message_not_found"
