from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.database.database import Base, engine
import backend.database.models

from backend.api.routes import router

app = FastAPI(
    title="FinRelief AI 🚀",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(router)


@app.get("/")
def read_root():

    return {
        "message": "Welcome to FinRelief AI 🚀",
        "status": "running"
    }