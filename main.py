from fastapi import FastAPI
from app.api.routers import location

app = FastAPI(
    title="Crop Advisor API",
    description="Provides weather and location data for crop prediction.",
    version="1.0.0"
)

app.include_router(
    location.router,
    prefix="/api/v1/location",
    tags=["Location & Weather"]
)

@app.get("/", tags=["Health Check"])
def read_root():
    return {"status": "API is healthy and running!"}