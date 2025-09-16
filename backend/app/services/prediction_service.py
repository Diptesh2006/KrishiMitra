import joblib
import pandas as pd
import numpy as np
from pathlib import Path


BASE_DIR = Path(__file__).resolve(strict=True).parent.parent
MODEL_PATH = BASE_DIR / "ml_models/crop_yield_pipeline.joblib"

# Load the model once when the application starts
try:
    model = joblib.load(MODEL_PATH)
except FileNotFoundError:
    model = None # Handle case where model isn't found

def predict_yield(state: str, district: str, year: int, season: str, crop: str, area: float) -> dict:
    """
    Predicts the crop yield using the loaded model.
    """
    if model is None:
        raise RuntimeError("ML model not found. Please train and save the model.")

    # Create a pandas DataFrame from the input, matching the model's training columns
    input_data = pd.DataFrame([{
        "State_Name": state,
        "District_Name": district,
        "Crop_Year": year,
        "Season": season,
        "Crop": crop,
        "Area": area
    }])
    
    # Predict the log-transformed yield
    log_yield_prediction = model.predict(input_data)[0]
    
    actual_yield = np.expm1(log_yield_prediction)
    
    # Calculate the total production
    total_production = actual_yield * area
    
    return {
        "predicted_yield_tons_per_hectare": actual_yield,
        "predicted_total_production_tons": total_production
    }