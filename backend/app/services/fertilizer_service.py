import pandas as pd
import joblib
from pathlib import Path

# --- Load all assets when the application starts ---
BASE_DIR = Path(__file__).resolve(strict=True).parent.parent
MODEL_PATH = BASE_DIR / "ml_models/fertilizer_model_components.joblib"
DATA_PATH = BASE_DIR.parent.parent / "datasets/nutrients by state.csv"

# Load the dictionary containing the model and encoders
try:
    model_components = joblib.load(MODEL_PATH)
    model = model_components["model"]
    le_crop = model_components["le_crop"]
    le_fert = model_components["le_fert"]
except FileNotFoundError:
    model = None # Handle case where model isn't found

# Load the state nutrient dataset
try:
    df_nutrients = pd.read_csv(DATA_PATH)
except FileNotFoundError:
    df_nutrients = None

# --- Prediction function ---
def recommend_fertilizer(state: str, temperature: float, humidity: float, moisture: float, crop_type: str) -> str:
    """
    Recommends a fertilizer based on environmental and crop data.
    """
    if model is None or df_nutrients is None:
        raise RuntimeError("ML model or nutrient data not found.")

    # 1. Get state nutrient levels from the dataframe
    state_row = df_nutrients[df_nutrients["State/UT"].str.lower() == state.lower()]
    if state_row.empty:
        raise ValueError(f"State '{state}' not found in the nutrient dataset.")

    def nutrient_value(x):
        if "Low" in x: return 5
        elif "M" in x: return 15
        else: return 30

    N = state_row[['Nitrogen(N)-Low','Nitrogen (N) - M','Nitrogen(N) - High']].idxmax(axis=1).values[0]
    P = state_row[['Phosphorous(P) - Low','Phosphorous (P) - M','Phosphorous(P) - High']].idxmax(axis=1).values[0]
    K = state_row[['Potassium(K) - Low','Potassium (K) - M','Potassium(K) - High']].idxmax(axis=1).values[0]

    # 2. Prepare the input for the model
    try:
        crop_enc = le_crop.transform([crop_type])[0]
    except ValueError:
        raise ValueError(f"Crop type '{crop_type}' not recognized by the model.")

    input_df = pd.DataFrame([{
        "Temparature": temperature,
        "Humidity": humidity,
        "Moisture": moisture,
        "Soil Type": 1, # Using placeholder as per your original script
        "Crop Type": crop_enc,
        "Nitrogen": nutrient_value(N),
        "Potassium": nutrient_value(K),
        "Phosphorous": nutrient_value(P)
    }])

    # 3. Predict and decode the result
    fert_pred_encoded = model.predict(input_df)[0]
    fertilizer_name = le_fert.inverse_transform([fert_pred_encoded])[0]
    
    return fertilizer_name