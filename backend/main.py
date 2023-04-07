# src/main.py


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.card_router import router as card_router
from routes.auth_router import router as auth_router
from routes.image_router import router as image_router

from database.connection import Base, engine

app = FastAPI()

Base.metadata.create_all(bind=engine)

# Allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

origins = [
    "http://192.168.154.232:8080",
    "http://localhost",
    "http://localhost:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api", tags=["auth"])
app.include_router(card_router, prefix="/api", tags=["cards"])
app.include_router(image_router, prefix="/api", tags=["images"])
# Setup templates

# Define index route
@app.get("/")
async def index():
    return "Welcome to FastAPI"




