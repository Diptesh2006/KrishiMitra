from pydantic import BaseModel

class WeatherInfo(BaseModel):
    temperature_celsius: float
    humidity_percent: int
    condition: str
    wind_speed_mps: float

class GeoInfo(BaseModel):
    city: str
    state: str
    country: str

class LocationDetailsResponse(BaseModel):
    weather: WeatherInfo
    geography: GeoInfo
