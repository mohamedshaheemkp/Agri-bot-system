from fastapi import FastAPI, UploadFile, File
import shutil
from detect import detect_image

app = FastAPI()

@app.get("/")
def home():
    return {"message":"Agri AI system running"}

@app.post("/detect")
async def detect(file: UploadFile = File(...)):

    path = "temp.jpg"

    with open(path,"wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = detect_image(path)

    return {"detections": result}