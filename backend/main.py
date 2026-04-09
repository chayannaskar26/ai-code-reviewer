from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from reviewer import review_code

app = FastAPI()

class CodeRequest(BaseModel):
    code: str

@app.post("/review")
def review(req: CodeRequest):
    result = review_code(req.code)
    return result


app.mount("/", StaticFiles(directory="frontend", html=True), name="index")