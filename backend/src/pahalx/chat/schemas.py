from datetime import datetime

from pydantic import BaseModel


class ChatCreate(BaseModel):
    id: int
    title: str
    created_at: datetime
    updated_at: datetime


class ChatGet(BaseModel):
    id: int
    title: str
    created_at: datetime
    updated_at: datetime
