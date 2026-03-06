import sys
import os
import torch
from fastapi import FastAPI, UploadFile, File
import numpy as np
import cv2

app = FastAPI()
# add yolov9 to path
sys.path.append(os.path.abspath("yolov9"))

# load model
model = torch.hub.load(
    'yolov9',
    'custom',
    path='models/agri_model.pt',
    source='local'
)

model.conf = 0.25
@app.post("/detect")

async def detect(file: UploadFile = File(...)):

    contents = await file.read()

    nparr = np.frombuffer(contents, np.uint8)

    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    results = model(image)

    detections = results.pandas().xyxy[0].to_dict(orient="records")

    return {"detections": detections}