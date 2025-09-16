from pydantic import BaseModel, Field

class PredictionRequest(BaseModel):
    latitude: float = Field(..., ge=-90, le=90)
    longitude: float = Field(..., ge=-180, le=180)
    crop: str = Field(..., example="Rice")
    season: str = Field(..., example="Rabi")
    area_hectares: float = Field(..., gt=0, example=50.0)

class PredictionResponse(BaseModel):
    predicted_yield_tons_per_hectare: float
    predicted_total_production_tons: float
    location_used: str