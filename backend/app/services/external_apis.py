import httpx
import asyncio
from fastapi import HTTPException
from app.core.config import Settings

WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather"
GEOCODING_URL = "http://api.openweathermap.org/geo/1.0/reverse"

async def get_location_and_weather_details(lat: float, lon: float, settings: Settings):
    api_key = settings.OPENWEATHER_API_KEY
    
    async with httpx.AsyncClient() as client:
        weather_task = client.get(
            WEATHER_URL,
            params={"lat": lat, "lon": lon, "appid": api_key, "units": "metric"}
        )
        geocoding_task = client.get(
            GEOCODING_URL,
            params={"lat": lat, "lon": lon, "limit": 1, "appid": api_key}
        )

        try:
            weather_response, geocoding_response = await asyncio.gather(
                weather_task,
                geocoding_task
            )
            weather_response.raise_for_status()
            geocoding_response.raise_for_status()
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail="Error fetching data from external service.")

    weather_data = weather_response.json()
    geocoding_data = geocoding_response.json()

    if not geocoding_data:
        raise HTTPException(status_code=404, detail="Could not find location details for the given coordinates.")

    combined_data = {
        "weather": {
            "temperature_celsius": weather_data["main"]["temp"],
            "humidity_percent": weather_data["main"]["humidity"],
            "condition": weather_data["weather"][0]["main"],
            "wind_speed_mps": weather_data["wind"]["speed"]
        },
        "geography": {
            "city": geocoding_data[0].get("name", "Unknown"),
            "state": geocoding_data[0].get("state", "Unknown"),
            "country": geocoding_data[0].get("country", "Unknown")
        }
    }
    return combined_data
