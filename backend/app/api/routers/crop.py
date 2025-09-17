from fastapi import APIRouter, Depends, HTTPException
from backend.app.schemas.crop import CropRequest, CropResponse
from backend.app.services import external_apis, crop_service
from backend.app.core.config import Settings, settings

router = APIRouter()

def get_settings() -> Settings:
    return settings

@router.post("/recommend", response_model=CropResponse, summary="Recommend Crop")
async def recommend_crop_endpoint(
    request: CropRequest,
    app_settings: Settings = Depends(get_settings)
):
    try:
        location_data = await external_apis.get_location_and_weather_details(
            request.latitude, request.longitude, app_settings
        )
        geo_info = location_data["geography"]
        weather_info = location_data["weather"]
    except Exception:
        raise HTTPException(status_code=400, detail="Could not fetch location/weather data.")

    try:
        recommended_crop = crop_service.recommend_crop(
            state=geo_info["state"],
            temperature=weather_info["temperature_celsius"],
            humidity=weather_info["humidity_percent"]
        )
    except (ValueError, RuntimeError) as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception:
        raise HTTPException(status_code=500, detail="An unexpected error occurred during prediction.")

    return CropResponse(
        recommended_crop=recommended_crop,
        location_used=f"{geo_info['city']}, {geo_info['state']}"
    )