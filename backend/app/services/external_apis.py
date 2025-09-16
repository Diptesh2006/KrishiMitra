# backend/app/services/external_apis.py
import httpx
import asyncio
from fastapi import HTTPException
from backend.app.core.config import Settings


WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather"
GEOCODING_URL = "http://api.openweathermap.org/geo/1.0/reverse"

def estimate_soil_moisture(weather_condition: str, air_humidity: int, temp: float) -> int:
    """
    Estimates soil moisture based on the CURRENT weather condition and humidity.
    Returns a value roughly between 20 (dry) and 80 (wet).
    """
    condition = weather_condition.lower()
    
    if "rain" in condition or "drizzle" in condition or "thunderstorm" in condition:
        return 80  # Very moist
    elif air_humidity > 85:
        return 65  # Moist
    elif "clear" in condition and temp > 30:
        return 25  # Dry
    elif air_humidity > 60:
        return 50  # Average
    else:
        return 40  # Below average

async def get_location_and_weather_details(lat: float, lon: float, settings: Settings):
    api_key = settings.OPENWEATHER_API_KEY
    
    async with httpx.AsyncClient() as client:
        weather_task = client.get(WEATHER_URL, params={"lat": lat, "lon": lon, "appid": api_key, "units": "metric"})
        geocoding_task = client.get(GEOCODING_URL, params={"lat": lat, "lon": lon, "limit": 1, "appid": api_key})

        try:
            weather_response, geocoding_response = await asyncio.gather(weather_task, geocoding_task)
            weather_response.raise_for_status()
            geocoding_response.raise_for_status()
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail="Error fetching data from external weather service.")

    weather_data = weather_response.json()
    geocoding_data = geocoding_response.json()

    if not geocoding_data:
        raise HTTPException(status_code=404, detail="Could not find location details for the given coordinates.")

    weather_list = weather_data.get("weather", [])
    weather_main = weather_list[0] if weather_list else {}
    geo_main = geocoding_data[0] if geocoding_data else {}
    
    main_data = weather_data.get("main", {})
    wind_data = weather_data.get("wind", {})
    
    current_condition = weather_main.get("main", "N/A")
    current_humidity = main_data.get("humidity", 0)
    current_temp = main_data.get("temp", 0.0)
    
    estimated_moisture = estimate_soil_moisture(current_condition, current_humidity, current_temp)

    combined_data = {
        "weather": {
            "temperature_celsius": current_temp,
            "humidity_percent": current_humidity,
            "estimated_soil_moisture": estimated_moisture,
            "condition": current_condition,
            "wind_speed_mps": wind_data.get("speed", 0.0)
        },
        "geography": {
            "city": geo_main.get("name", "Unknown"),
            "state": geo_main.get("state", "Unknown"),
            "country": geo_main.get("country", "Unknown")
        }
    }
    return combined_data