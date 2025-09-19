from pydantic import BaseModel, Field

class IrrigationRequest(BaseModel):
    latitude: float = Field(..., ge=-90, le=90)
    longitude: float = Field(..., ge=-180, le=180)
    crop: str = Field(..., example="rice")

class IrrigationResponse(BaseModel):
    predicted_irrigation_days: int
    recommendation_text: str