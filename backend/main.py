from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from reviewer import review_code
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS (React dev server)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodeRequest(BaseModel):
    code: str

@app.post("/review")
def review(req: CodeRequest):
    result = review_code(req.code)
    return result


app.mount("/", StaticFiles(directory="frontend/dist", html=True), name="index")