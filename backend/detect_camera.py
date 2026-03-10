import torch
from agri_ai import explain_disease

model = torch.hub.load(
'ultralytics/yolov5',
'custom',
path='models/agri_model.pt'
)

def detect_image(image_path):

    results = model(image_path)

    detections = []

    for *box, conf, cls in results.xyxy[0]:

        disease = model.names[int(cls)]

        explanation = explain_disease(disease)

        detections.append({
            "disease": disease,
            "confidence": float(conf),
            "explanation": explanation
        })

    return detections