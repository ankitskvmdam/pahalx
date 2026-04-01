import enum

from sqlalchemy import TIMESTAMP, Column, Enum, ForeignKey, Integer, String

from pahalx.database.database import Base


class MessageRole(enum.Enum):
    SYSTEM = "system"
    USER = "user"
    ASSISTANT = "assistant"


class MessageStatus(enum.Enum):
    STREAMING = "streaming"
    COMPLETED = "completed"


class ChatModel(Base):
    """
    Represents a chat.

    A chat can have multiple messages. Each chat acts as a room for messages.
    """

    __tablename__ = "chat"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(
        Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    title = Column(String, nullable=False)

    created_at = Column(TIMESTAMP, nullable=False)
    updated_at = Column(TIMESTAMP, nullable=False)


class MessageModel(Base):
    """
    Represents a message in a chat.

    Each message has a role (system, user, or assistant) and content.
    """

    __tablename__ = "message"

    id = Column(Integer, primary_key=True, index=True)
    chat_id = Column(Integer, ForeignKey("chat.id", ondelete="CASCADE"), nullable=False)
    role = Column(Enum(MessageRole, name="role"), nullable=False)
    content = Column(String, nullable=False)
    created_at = Column(TIMESTAMP, nullable=False)
    status = Column(
        Enum(MessageStatus, name="status"),
        nullable=False,
        default="streaming",
    )
