from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from pahalx.auth.models import UserModel
from pahalx.auth.schemas import User, UserCreate
from pahalx.auth.utils import get_password_hash, verify_password
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


@router.get("/users/{username}")
def check_username_exists(username: str, db: Session = Depends(get_db)) -> bool:
    db_user = db.query(UserModel).filter(UserModel.username == username).first()
    return True if db_user else False


@router.post("/login")
def login(username: str, password: str, db: Session = Depends(get_db)) -> bool:
    db_user = db.query(UserModel).filter(UserModel.username == username).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    is_valid_password = verify_password(password, str(db_user.password))

    if not is_valid_password:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # TODO: Send JWT token
    return True
