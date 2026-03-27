from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pahalx.auth.router import router as auth_router

app = FastAPI()
app.add_middleware(CORSMiddleware)
app.include_router(auth_router)
