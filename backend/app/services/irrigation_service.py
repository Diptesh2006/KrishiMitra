import pandas as pd
import joblib
from pathlib import Path

# --- Load all assets when the application starts ---
BASE_DIR = Path(__file__).resolve(strict=True).parent.parent
MODEL_PATH = BASE_DIR / "ml_models/irrigation_model_components.joblib"
DATA_PATH = BASE_DIR.parent.parent / "datasets/place.csv"

# Load model, scaler, encoder, and columns
try:
    components = joblib.load(MODEL_PATH)
    model = components["model"]
    scaler = components["scaler"]
    le_crop = components["le_crop"]
    columns = components["columns"]
except FileNotFoundError:
    components = None

# Load and process the state nutrient data to create the map
try:
    df_place = pd.read_csv(DATA_PATH)
    def get_dominant_nutrient_level(row, nutrient_type):
        nutrient_cols = [col for col in row.index if nutrient_type in col]
        return row[nutrient_cols].idxmax()
    df_place['Dominant_N'] = df_place.apply(lambda row: get_dominant_nutrient_level(row, 'Nitrogen'), axis=1)
    df_place['Dominant_P'] = df_place.apply(lambda row: get_dominant_nutrient_level(row, 'Phosphorous'), axis=1)
    df_place['Dominant_K'] = df_place.apply(lambda row: get_dominant_nutrient_level(row, 'Potassium'), axis=1)
    state_nutrient_map = df_place.set_index('State/UT')[['Dominant_N', 'Dominant_P', 'Dominant_K']].T.to_dict('dict')
except (FileNotFoundError, KeyError):
    state_nutrient_map = None

# --- Prediction function ---
def predict_irrigation(crop: str, temperature: float, humidity: float, soil_moisture: float, state: str) -> int:
    if not components or not state_nutrient_map:
        raise RuntimeError("Irrigation model or nutrient data not found.")
    if state not in state_nutrient_map:
        raise ValueError(f"State '{state}' not found in the nutrient data.")

    dominant_nutrients = state_nutrient_map[state]

    def simplify_nutrient_level(level_string):
        if 'Low' in level_string: return 'Low'
        elif 'M' in level_string: return 'Medium'
        else: return 'High'

    n_cat = simplify_nutrient_level(dominant_nutrients['Dominant_N'])
    p_cat = simplify_nutrient_level(dominant_nutrients['Dominant_P'])
    k_cat = simplify_nutrient_level(dominant_nutrients['Dominant_K'])

    try:
        crop_encoded = le_crop.transform([crop])[0]
    except ValueError:
        raise ValueError(f"Crop '{crop}' not recognized by the model.")

    input_dict = {
        'temperature': temperature, 'humidity': humidity, 'soil_moisture': soil_moisture,
        'label_encoded': crop_encoded,
        f'N_category_{n_cat}': 1, f'P_category_{p_cat}': 1, f'K_category_{k_cat}': 1
    }
    
    input_df = pd.DataFrame([input_dict]).reindex(columns=columns, fill_value=0)
    
    num_cols = ['temperature', 'humidity', 'soil_moisture']
    input_df[num_cols] = scaler.transform(input_df[num_cols])
    
    pred_class = model.predict(input_df)[0]
    return int(pred_class) + 1