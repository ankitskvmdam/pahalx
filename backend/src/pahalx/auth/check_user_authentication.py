from fastapi.param_functions import Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from pahalx.auth.models import UserModel
from pahalx.auth.schemas import User
from pahalx.auth.utils import AuthErrorCode, verify_access_token
from pahalx.database.database import get_db
from pahalx.expection import TypedHTTPException

oauth2_schema = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")


def check_user_authentication(
    token: str = Depends(oauth2_schema),
    db: Session = Depends(get_db),
) -> User:
    payload = verify_access_token(token)
    username = payload.get("sub")
    user = db.query(UserModel).filter(UserModel.username == username).first()

    if not user:
        raise TypedHTTPException(
            status_code=404,
            msg="User not found",
            code=AuthErrorCode.USER_NOT_FOUND,
        )

    return User(username=str(user.username), name=str(user.name), id=str(user.id))
