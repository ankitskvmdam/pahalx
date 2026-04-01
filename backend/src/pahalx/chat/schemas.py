from datetime import datetime

from pydantic import BaseModel

from pahalx.chat.models import MessageRole, MessageStatus


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


class MessageGet(BaseModel):
    id: int
    chat_id: int
    role: MessageRole
    content: str
    created_at: datetime
    status: MessageStatus


class MessageCreate(BaseModel):
    id: int
    chat_id: int
    role: MessageRole
    content: str
    created_at: datetime
    status: MessageStatus
