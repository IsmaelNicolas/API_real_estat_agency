from fastapi import FastAPI,Request
from routes.auth import auth
from routes.client import client
from fastapi.staticfiles import StaticFiles
from starlette.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn


app = FastAPI()

middleware = CORSMiddleware(
    app=app,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth)
app.include_router(client)

app.mount("/", StaticFiles(directory="static", html=True), name="static")

async def client_middleware(request: Request, call_next):
    response = await call_next(request)
    if response.status_code == 404:
        file_path = "./static/index.html"
        content = open(file_path, "r").read()
        return HTMLResponse(content=content)
    return response

app.middleware("https")(client_middleware)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=2303)

