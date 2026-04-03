from datetime import datetime
from typing import List, cast

from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from pahalx.auth.check_user_authentication import check_user_authentication
from pahalx.chat.models import ChatModel, MessageModel, MessageRole, MessageStatus
from pahalx.chat.schemas import ChatCreate, ChatGet, MessageGet
from pahalx.chat.utils import (
    get_chat,
    message_model_messages_to_payload_message,
    message_model_to_message,
    pahalx_get_chat_title,
    pahalx_llm_response_generator,
)
from pahalx.database.database import get_db
from pahalx.expection import (
    AuthErrorCode,
    ChatErrorCode,
    TypedHTTPException,
    TypedHTTPExceptionModel,
)

router = APIRouter(
    prefix="/v1/chat",
    tags=["chat"],
    responses={401: {"model": TypedHTTPExceptionModel[AuthErrorCode]}},
)


@router.post("/")
async def create_chat(
    user_message: str,
    system_prompt: str = "Keep message small and professional.",
    user=Depends(check_user_authentication),
    db: Session = Depends(get_db),
) -> ChatCreate:
    """
    Create a new chat.

    """
    title = await pahalx_get_chat_title(user_message=user_message)

    now = datetime.now()
    new_chat = ChatModel(
        title=title if title != "" else user_message,
        user_id=user.id,
        created_at=now,
        updated_at=now,
    )

    db.add(new_chat)
    db.commit()
    db.refresh(new_chat)

    system_prompt = MessageModel(
        chat_id=new_chat.id,
        content=system_prompt,
        role=MessageRole.SYSTEM,
        status=MessageStatus.COMPLETED,
        created_at=datetime.now(),
    )
    db.add(system_prompt)
    db.commit()

    return ChatCreate(
        id=cast(int, new_chat.id),
        title=str(new_chat.title),
        created_at=datetime.fromisoformat(new_chat.created_at.isoformat()),
        updated_at=datetime.fromisoformat(new_chat.updated_at.isoformat()),
    )


@router.delete(
    "/{chat_id}", responses={404: {"model": TypedHTTPExceptionModel[ChatErrorCode]}}
)
def delete_chat(
    chat_id: int, user=Depends(check_user_authentication), db: Session = Depends(get_db)
):
    chat = (
        db.query(ChatModel)
        .filter(ChatModel.id == chat_id, ChatModel.user_id == user.id)
        .first()
    )

    if not chat:
        raise TypedHTTPException(
            status_code=404, msg="Chat not found", code=ChatErrorCode.CHAT_NOT_FOUND
        )

    db.delete(chat)
    db.commit()

    return {"success": True}


@router.get("/all")
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


@router.get("/{chat_id}/messages")
def get_chat_messages(
    chat_id: int, user=Depends(check_user_authentication), db: Session = Depends(get_db)
) -> list[MessageGet]:
    # To check whether user is authorize to access the chat messages
    get_chat(chat_id, user, db)

    messages = (
        db.query(MessageModel)
        .filter(
            MessageModel.chat_id == chat_id, MessageModel.role != MessageRole.SYSTEM
        )
        .all()
    )

    return [message_model_to_message(message) for message in messages]


@router.get(
    "/{chat_id}/messages/{message_id}",
    responses={404: {"model": TypedHTTPExceptionModel[ChatErrorCode]}},
)
def get_chat_message(
    chat_id: int,
    message_id: int,
    user=Depends(check_user_authentication),
    db: Session = Depends(get_db),
) -> MessageGet:
    get_chat(chat_id, user, db)
    message = db.query(MessageModel).filter(MessageModel.id == message_id).first()

    if message is None:
        raise TypedHTTPException(
            status_code=404,
            msg="Message not found",
            code=ChatErrorCode.MESSAGE_NOT_FOUND,
        )

    return message_model_to_message(message)


@router.post("/chat/{chat_id}/response")
async def create_pahalx_response(
    chat_id: int,
    # For now keep it as string, soon we will have it more rich.
    user_message: str,
    user=Depends(check_user_authentication),
    db: Session = Depends(get_db),
    model: str = "nvidia/nemotron-3-nano-4b",
):
    # To check whether user is authorize to access the chat messages
    get_chat(chat_id, user, db)

    messages = db.query(MessageModel).filter(MessageModel.chat_id == chat_id).all()

    if str(messages[-1].role) == str(MessageRole.USER):
        # This means last message was not successful. We will remove that from the prompt.
        db.delete(messages[-1])
        db.commit()
        messages = messages[:-1]

    payload = {
        "model": model,
        "messages": [
            *message_model_messages_to_payload_message(messages),
            {"role": "user", "content": user_message},
        ],
        "temperature": 0.7,
        "max_tokens": -1,
        "stream": True,
    }

    user_message = MessageModel(
        chat_id=chat_id,
        content=user_message,
        role=MessageRole.USER,
        status=MessageStatus.COMPLETED,
        created_at=datetime.now(),
    )
    db.add(user_message)
    db.commit()

    return StreamingResponse(
        pahalx_llm_response_generator(payload, chat_id, db),
        media_type="text/plain",
    )
