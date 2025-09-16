from fastapi import APIRouter, Query, Depends, HTTPException
from backend.app.schemas.location import LocationDetailsResponse
from backend.app.services import external_apis
from backend.app.core.config import Settings, settings
import traceback 

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
    except Exception as e:
        print("--- AN ERROR WAS CAUGHT! ---")
        traceback.print_exc() # This will print the full traceback
        raise HTTPException(status_code=500, detail=f"An internal error occurred: {e}")
    