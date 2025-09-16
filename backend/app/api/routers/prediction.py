import datetime
from fastapi import APIRouter, Depends, HTTPException
from backend.app.schemas.prediction import PredictionRequest, PredictionResponse
from backend.app.services import external_apis, prediction_service
from backend.app.core.config import Settings, settings

router = APIRouter()

# Dependency to get settings
def get_settings() -> Settings:
    return settings

@router.post(
    "/predict",
    response_model=PredictionResponse,
    summary="Predict Crop Yield"
)
async def predict_crop_yield(
    request: PredictionRequest,
    app_settings: Settings = Depends(get_settings)
):
    """
    This endpoint predicts the crop yield based on location and crop details.
    - It first fetches the State and District from the given latitude and longitude.
    - Then, it uses the trained ML model to predict the yield.
    """
    # 1. Get location details from our existing service
    try:
        location_data = await external_apis.get_location_and_weather_details(
            request.latitude, request.longitude, app_settings
        )
        geo_info = location_data["geography"]
        state = geo_info["state"]
        district = geo_info["city"] # Note: Geocoding often returns city as the district name
    except Exception:
        raise HTTPException(status_code=400, detail="Could not fetch location details for the given coordinates.")

    # 2. Prepare all inputs for the prediction service
    current_year = datetime.datetime.now().year
    
    # 3. Call the prediction service
    try:
        prediction_result = prediction_service.predict_yield(
            state=state,
            district=district,
            year=current_year,
            season=request.season,
            crop=request.crop,
            area=request.area_hectares
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Model prediction failed: {str(e)}")

    return PredictionResponse(
        **prediction_result,
        location_used=f"{district}, {state}"
    )