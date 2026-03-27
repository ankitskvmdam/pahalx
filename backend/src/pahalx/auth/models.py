from sqlalchemy import Column, Integer, String

from pahalx.database.database import Base, engine


class UserModel(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    name = Column(String)
    password = Column(String)


Base.metadata.create_all(bind=engine)
