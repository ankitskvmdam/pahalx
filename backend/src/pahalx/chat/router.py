from datetime import datetime
from typing import List, cast

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from pahalx.auth.check_user_authentication import check_user_authentication
from pahalx.chat.models import ChatModel
from pahalx.chat.schemas import ChatCreate, ChatGet
from pahalx.database.database import get_db

router = APIRouter(
    prefix="/v1/chat",
    tags=["chat"],
)


@router.post("/chat")
def create_chat(
    title: str, user=Depends(check_user_authentication), db: Session = Depends(get_db)
) -> ChatCreate:
    """
    Create a new chat.

    """
    now = datetime.now()
    new_chat = ChatModel(
        title=title,
        user_id=user.id,
        created_at=now,
        updated_at=now,
    )

    db.add(new_chat)
    db.commit()
    db.refresh(new_chat)

    return ChatCreate(
        id=cast(int, new_chat.id),
        title=str(new_chat.title),
        created_at=datetime.fromisoformat(new_chat.created_at.isoformat()),
        updated_at=datetime.fromisoformat(new_chat.updated_at.isoformat()),
    )


@router.get("/chats")
def get_chats(
    user=Depends(check_user_authentication), db: Session = Depends(get_db)
) -> List[ChatGet]:
    chats = db.query(ChatModel).filter(ChatModel.user_id == user.id).limit(10)

    return [
        ChatGet(
            id=cast(int, chat.id),
            title=str(chat.title),
            created_at=datetime.fromisoformat(chat.created_at.isoformat()),
            updated_at=datetime.fromisoformat(chat.updated_at.isoformat()),
        )
        for chat in chats
    ]
