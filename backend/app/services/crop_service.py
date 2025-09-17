import pandas as pd
import joblib
from pathlib import Path

# --- Load all assets when the application starts ---
BASE_DIR = Path(__file__).resolve(strict=True).parent.parent
MODEL_PATH = BASE_DIR / "ml_models/crop_recommender_components.joblib"
DATA_PATH = BASE_DIR.parent.parent / "datasets/place.csv"

# Load the dictionary containing the model, scaler, and encoders
try:
    components = joblib.load(MODEL_PATH)
    model = components["model"]
    scaler = components["scaler"]
    le_crop = components["le_crop"]
    le_nutrient = components["le_nutrient"]
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
def recommend_crop(state: str, temperature: float, humidity: float) -> str:
    if not components or not state_nutrient_map:
        raise RuntimeError("ML model or nutrient data not found.")

    if state not in state_nutrient_map:
        raise ValueError(f"State '{state}' not found in the nutrient data.")

    dominant_nutrients = state_nutrient_map[state]

    def simplify_nutrient_level(level_string):
        if 'Low' in level_string: return 'Low'
        elif 'M' in level_string: return 'Medium'
        else: return 'High'

    n_category = simplify_nutrient_level(dominant_nutrients['Dominant_N'])
    p_category = simplify_nutrient_level(dominant_nutrients['Dominant_P'])
    k_category = simplify_nutrient_level(dominant_nutrients['Dominant_K'])

    try:
        n_encoded = le_nutrient.transform([n_category])[0]
        p_encoded = le_nutrient.transform([p_category])[0]
        k_encoded = le_nutrient.transform([k_category])[0]
    except ValueError as e:
        raise ValueError(f"Error encoding nutrient categories: {e}")

    input_data = pd.DataFrame([[{
        'N_encoded': n_encoded, 'P_encoded': p_encoded, 'K_encoded': k_encoded,
        'temperature': temperature, 'humidity': humidity
    }]])

    # Scale the input data
    input_data_scaled = scaler.transform(input_data)

    # Predict the crop
    predicted_label_encoded = model.predict(input_data_scaled)[0]
    predicted_crop = le_crop.inverse_transform([predicted_label_encoded])[0]

    return predicted_crop