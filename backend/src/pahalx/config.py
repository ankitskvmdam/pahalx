import os

from dotenv import load_dotenv

load_dotenv(dotenv_path=".env.local")

DB_NAME = os.getenv("DB_NAME") if os.getenv("DB_NAME") else "DB_NAME_NOT_SET"
DB_HOST = os.getenv("DB_HOST") if os.getenv("DB_HOST") else "DB_HOST_NOT_SET"
DB_PORT = os.getenv("DB_PORT") if os.getenv("DB_PORT") else "DB_PORT_NOT_SET"
DB_USERNAME = (
    os.getenv("DB_USERNAME") if os.getenv("DB_USERNAME") else "DB_USER_NOT_SET"
)
DB_PASSWORD = (
    os.getenv("DB_PASSWORD") if os.getenv("DB_PASSWORD") else "DB_PASSWORD_NOT_SET"
)

DB_URL = f"postgresql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

SECRET_KEY: str = (
    os.getenv("SECRET_KEY") if os.getenv("SECRET_KEY") else "SECRET_KEY_NOT_SET"
)
ALGORITHM: str = (
    os.getenv("ALGORITHM") if os.getenv("ALGORITHM") else "ALGORITHM_NOT_SET"
)
ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES") or 30)
