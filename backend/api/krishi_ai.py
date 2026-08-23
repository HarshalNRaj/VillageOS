from fastapi import APIRouter, UploadFile, File
import time

router = APIRouter()

@router.post("/detect")
async def detect_disease(file: UploadFile = File(...)):
    # Simulate processing delay
    time.sleep(2.5)
    
    # Mock Response
    return {
        "filename": file.filename,
        "disease": "Late Blight (Phytophthora infestans)",
        "confidence": 94.2,
        "severity": "High",
        "remedies": [
            "Apply fungicides containing chlorothalonil or copper promptly.",
            "Ensure proper plant spacing for air circulation.",
            "Avoid overhead watering to keep foliage dry."
        ]
    }
