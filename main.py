from fastapi import FastAPI
from backend.app.api.routers import location, prediction, fertilizer

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

app.include_router(
    prediction.router,
    prefix="/api/v1/yield",
    tags=["Crop Prediction"]
)

app.include_router(
    fertilizer.router,
    prefix="/api/v1/fertilizer",
    tags=["Fertilizer Recommendation"]
)

@app.get("/", tags=["Health Check"])
def read_root():
    return {"status": "API is healthy and running!"}