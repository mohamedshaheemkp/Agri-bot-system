from fastapi import FastAPI, UploadFile, File
import torch
import numpy as np
import cv2

app = FastAPI()

model = torch.hub.load(
    'yolov9',
    'custom',
    path='models/agri_model.pt',
    source='local'
)

@app.post("/detect")

async def detect(file: UploadFile = File(...)):

    contents = await file.read()

    nparr = np.frombuffer(contents, np.uint8)

    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    results = model(image)

    detections = results.pandas().xyxy[0].to_dict(orient="records")

    return {"detections": detections}