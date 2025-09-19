from fastapi import APIRouter, Depends, HTTPException
from backend.app.schemas.irrigation import IrrigationRequest, IrrigationResponse
from backend.app.services import external_apis, irrigation_service
from backend.app.core.config import Settings, settings

router = APIRouter()

def get_settings() -> Settings:
    return settings

@router.post("/predict_frequency", response_model=IrrigationResponse, summary="Predict Irrigation Frequency")
async def predict_irrigation_endpoint(
    request: IrrigationRequest,
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
        # Pass all the data fetched from the external API service
        predicted_days = irrigation_service.predict_irrigation(
            crop=request.crop.lower(),
            temperature=weather_info["temperature_celsius"],
            humidity=weather_info["humidity_percent"],
            soil_moisture=weather_info["estimated_soil_moisture"],
            state=geo_info["state"]
        )
        recommendation = f"Based on current conditions, it is recommended to irrigate every {predicted_days} days."
    except (ValueError, RuntimeError) as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception:
        raise HTTPException(status_code=500, detail="An unexpected error occurred during prediction.")

    return IrrigationResponse(
        predicted_irrigation_days=predicted_days,
        recommendation_text=recommendation
    )