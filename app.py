from fastapi import FastAPI,Request
from routes.auth import auth
from routes.client import client
from fastapi.staticfiles import StaticFiles
from starlette.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","http://localhost:2303"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth)
app.include_router(client)

app.mount("/", StaticFiles(directory="static", html=True), name="static")

def not_found(request: Request):
    with open("static/index.html", "r") as f:
        content = f.read()
    return HTMLResponse(content=content)

@app.middleware("http")
async def custom_not_found(request: Request, call_next):
    response = await call_next(request)
    if response.status_code == 404:
        return not_found(request)
    return response

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=2303)

