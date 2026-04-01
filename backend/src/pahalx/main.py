from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pahalx.auth.router import router as auth_router
from pahalx.chat.router import router as chat_router

app = FastAPI(servers=[{"url": ""}])
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api")
app.include_router(chat_router, prefix="/api")
