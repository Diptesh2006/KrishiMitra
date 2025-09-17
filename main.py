from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.api.routers import location, prediction, fertilizer, crop

app = FastAPI(
    title="Crop Advisor API",
    description="Provides weather and location data for crop prediction.",
    version="1.0.0"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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

app.include_router(
    crop.router,
    prefix="/api/v1/crop",
    tags=["Crop Recommendation"]
)

@app.get("/", tags=["Health Check"])
def read_root():
    return {"status": "API is healthy and running!"}