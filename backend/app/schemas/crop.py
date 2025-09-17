from pydantic import BaseModel, Field

class CropRequest(BaseModel):
    latitude: float = Field(..., ge=-90, le=90)
    longitude: float = Field(..., ge=-180, le=180)

class CropResponse(BaseModel):
    recommended_crop: str
    location_used: str