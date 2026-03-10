import torch
import cv2
import sys
import os

# add yolov9 to path
sys.path.append("../yolov9")

MODEL_PATH = "models/agri_model.pt"

model = torch.hub.load(
    "../yolov9",
    "custom",
    path=MODEL_PATH,
    source="local"
)

def detect_image(image_path):

    results = model(image_path)

    detections = []

    for *box, conf, cls in results.xyxy[0]:

        label = model.names[int(cls)]

        detections.append({
            "disease": label,
            "confidence": float(conf)
        })

    return detections