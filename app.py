from fastapi import FastAPI
from routes.auth import auth
from routes.client import client

app = FastAPI()

app.include_router(auth)
app.include_router(client)
