from fastapi import APIRouter
from pydantic import BaseModel
import time

router = APIRouter()

class DemographicData(BaseModel):
    age: int
    gender: str
    occupation: str
    income: int

@router.post("/recommend")
async def recommend_schemes(data: DemographicData):
    time.sleep(1.5)
    
    # Simple logic-based mock response
    schemes = []
    if data.occupation.lower() in ["farmer", "farmer (landowner)"]:
        schemes.append({
            "id": 1,
            "name": "PM Kisan Samman Nidhi",
            "match": 98,
            "amount": "₹6,000/year",
            "desc": "Direct income support for all landholding farmers' families in the country."
        })
    if data.income < 100000:
        schemes.append({
            "id": 2,
            "name": "Ayushman Bharat PM-JAY",
            "match": 95,
            "amount": "Up to ₹5 Lakh/year",
            "desc": "Health insurance coverage for secondary and tertiary care hospitalization."
        })
        
    schemes.append({
        "id": 3,
        "name": "Kisan Credit Card Scheme",
        "match": 85,
        "amount": "Up to ₹3 Lakh",
        "desc": "Provides adequate and timely credit support from the banking system for agricultural needs."
    })
    
    return {"schemes": schemes[:3]}
