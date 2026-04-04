import json
from datetime import datetime
from typing import cast

import httpx
from sqlalchemy.orm import Session

from pahalx.auth.schemas import User
from pahalx.chat.models import ChatModel, MessageModel, MessageRole, MessageStatus
from pahalx.chat.schemas import ChatGet, MessageGet
from pahalx.config import AI_ENDPOINT, LM_STUDIO_API_KEY
from pahalx.expection import ChatErrorCode, TypedHTTPException


def chat_model_to_chat(chat: ChatModel) -> ChatGet:
    return ChatGet(
        id=cast(int, chat.id),
        title=str(chat.title),
        created_at=datetime.fromisoformat(chat.created_at.isoformat()),
        updated_at=datetime.fromisoformat(chat.updated_at.isoformat()),
    )


def get_chat(chat_id: int, user: User, db: Session) -> ChatGet:
    chat = (
        db.query(ChatModel)
        .filter(ChatModel.id == chat_id, ChatModel.user_id == user.id)
        .first()
    )
    if chat is None:
        raise TypedHTTPException(
            status_code=404, msg="Chat not found", code=ChatErrorCode.CHAT_NOT_FOUND
        )
    return chat_model_to_chat(chat)


def message_model_to_message(message: MessageModel) -> MessageGet:
    return MessageGet(
        id=cast(int, message.id),
        chat_id=cast(int, message.chat_id),
        role=MessageRole(message.role),
        content=str(message.content),
        created_at=datetime.fromisoformat(message.created_at.isoformat()),
        status=MessageStatus(message.status),
    )


def message_model_messages_to_payload_message(
    messages: list[MessageModel],
) -> list[dict]:
    chat_messages = [message_model_to_message(message) for message in messages]

    return [
        {
            "role": message.role.value,
            "content": message.content,
        }
        for message in chat_messages
    ]


async def pahalx_llm_response_generator(
    payload,
    chat_id: int,
    db: Session,
):
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {LM_STUDIO_API_KEY}",
    }

    client = httpx.AsyncClient(
        timeout=httpx.Timeout(read=120.0, pool=None, write=30.0, connect=10.0)
    )
    async with client.stream(
        "POST", f"{AI_ENDPOINT}/v1/chat/completions", json=payload, headers=headers
    ) as response:
        count_token = 0
        content = ""

        async for chunk in response.aiter_lines():
            yield chunk
            if not chunk.startswith("data: "):
                continue

            if chunk == "data: [DONE]\n":
                break

            try:
                data = json.loads(chunk[6:])

                if "choices" in data and len(data["choices"]) > 0:
                    delta = data["choices"][0].get("delta", {})
                    content += delta.get("content", "")
                    count_token += len(delta.get("content", ""))

            except json.JSONDecodeError:
                continue

        # TODO: Make a better design.
        ai_response_content = MessageModel(
            content=content,
            chat_id=chat_id,
            role=MessageRole.ASSISTANT,
            status=MessageStatus.COMPLETED,
            created_at=datetime.now(),
        )

        db.add(ai_response_content)
        db.commit()


async def pahalx_get_chat_title(user_message: str) -> str:
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {LM_STUDIO_API_KEY}",
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{AI_ENDPOINT}/v1/chat/completions",
            headers=headers,
            json={
                "messages": [
                    {
                        "role": "system",
                        "content": """You are a title generator.

Rules:
- Output only a short title (max 5 words)
- No punctuation at the end
- No quotes
- No explanation or extra text
- Use plain, natural wording

Return only the title.""",
                    },
                    {"role": "user", "content": user_message},
                ]
            },
        )

    if response.status_code == 200:
        data = response.json()
        if "choices" in data and len(data["choices"]) > 0:
            message = data["choices"][0].get("message", {})
            return message.get("content", "").strip()
    return user_message[:20]
