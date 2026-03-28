from pydantic import BaseModel


class UserCreate(BaseModel):
    username: str
    name: str
    password: str


class User(BaseModel):
    id: str
    username: str
    name: str


class UserAccessToken(BaseModel):
    access_token: str
    token_type: str
