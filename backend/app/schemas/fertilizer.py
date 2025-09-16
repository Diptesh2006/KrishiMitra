from pydantic import BaseModel, Field

class FertilizerRequest(BaseModel):
    latitude: float = Field(..., ge=-90, le=90)
    longitude: float = Field(..., ge=-180, le=180)
    crop_type: str = Field(..., example="Maize")

class FertilizerResponse(BaseModel):
    recommended_fertilizer: str
    location_used: str
    weather_conditions: dict