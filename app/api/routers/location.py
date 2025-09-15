from fastapi import APIRouter, Query, Depends, HTTPException
from app.schemas.location import LocationDetailsResponse
from app.services import external_apis
from app.core.config import Settings, settings

def get_settings() -> Settings:
    return settings

router = APIRouter()

@router.get(
    "/details",
    response_model=LocationDetailsResponse,
    summary="Get Weather and Geographical Details"
)
async def get_details(
    lat: float = Query(..., description="Latitude of the location", ge=-90, le=90),
    lon: float = Query(..., description="Longitude of the location", ge=-180, le=180),
    app_settings: Settings = Depends(get_settings)
):
    """
    Provides combined weather and reverse-geocoded location data
    based on GPS coordinates.
    """
    try:
        data = await external_apis.get_location_and_weather_details(lat, lon, app_settings)
        return data
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))