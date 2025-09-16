from fastapi import APIRouter, Depends, HTTPException
from backend.app.schemas.fertilizer import FertilizerRequest, FertilizerResponse
from backend.app.services import external_apis, fertilizer_service
from backend.app.core.config import Settings, settings

router = APIRouter()

def get_settings() -> Settings:
    return settings

@router.post(
    "/recommend",
    response_model=FertilizerResponse,
    summary="Recommend Fertilizer"
)
async def recommend_fertilizer_endpoint(
    request: FertilizerRequest,
    app_settings: Settings = Depends(get_settings)
):
    """
    Recommends a fertilizer by combining user input with real-time weather
    and location data.
    """
    # 1. Reuse existing service to get weather and location data
    try:
        location_data = await external_apis.get_location_and_weather_details(
            request.latitude, request.longitude, app_settings
        )
        geo_info = location_data["geography"]
        weather_info = location_data["weather"]
    except Exception:
        raise HTTPException(status_code=400, detail="Could not fetch location/weather data.")

    # 2. Call the fertilizer service with all the required data
    try:
        recommended_fertilizer = fertilizer_service.recommend_fertilizer(
            state=geo_info["state"],
            temperature=weather_info["temperature_celsius"],
            humidity=weather_info["humidity_percent"],
            moisture=weather_info["estimated_soil_moisture"],
            crop_type=request.crop_type
        )
    except (ValueError, RuntimeError) as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception:
        raise HTTPException(status_code=500, detail="An unexpected error occurred during prediction.")

    return FertilizerResponse(
        recommended_fertilizer=recommended_fertilizer,
        location_used=f"{geo_info['city']}, {geo_info['state']}",
        weather_conditions={
            "temperature_celsius": weather_info["temperature_celsius"],
            "humidity_percent": weather_info["humidity_percent"]
        }
    )