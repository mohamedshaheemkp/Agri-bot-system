import torch
import cv2

MODEL_PATH = "models/agri_model.pt"

model = torch.hub.load(
    'yolov9',
    'custom',
    path=MODEL_PATH,
    source='local'
)

cap = cv2.VideoCapture(0)

while True:

    ret, frame = cap.read()

    results = model(frame)

    frame = results.render()[0]

    cv2.imshow("Agri Bot Detection", frame)

    if cv2.waitKey(1) == 27:
        break

cap.release()
cv2.destroyAllWindows()