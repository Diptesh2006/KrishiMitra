# -*- coding: utf-8 -*-
"""Original file is located at
    https://colab.research.google.com/drive/1CxQIvtsXI0rFz9YAf8WGEdI--ASFow4J
"""

import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

df1 = pd.read_csv("fertilisers.csv")   # Crop-Fertilizer Dataset
df2 = pd.read_csv("nutrients by state.csv")   # State Nutrient Dataset

le_soil = LabelEncoder()
df1["Soil Type"] = le_soil.fit_transform(df1["Soil Type"])

le_crop = LabelEncoder()
df1["Crop Type"] = le_crop.fit_transform(df1["Crop Type"])

le_fert = LabelEncoder()
df1["Fertilizer Name"] = le_fert.fit_transform(df1["Fertilizer Name"])

# Features and target
X = df1[["Temparature","Humidity","Moisture","Soil Type","Crop Type","Nitrogen","Potassium","Phosphorous"]]
y = df1["Fertilizer Name"]

from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.05, random_state=42
)

# XGBoost model
model = XGBClassifier(
    n_estimators=200,     # number of trees
    max_depth=6,          # tree depth (can tune)
    learning_rate=0.1,    # shrinkage rate
    subsample=0.8,        # use 80% samples per tree
    colsample_bytree=0.8, # use 80% features per tree
    random_state=42,
    eval_metric="mlogloss",   # required to suppress warnings
)

# Train
model.fit(X_train, y_train)

# Evaluate
print("XGBoost Test Accuracy:", model.score(X_test, y_test))

def predict_fertilizer(state, temperature, humidity, moisture, crop_type):
    # Get state nutrient levels
    state_row = df2[df2["State/UT"] == state]
    if state_row.empty:
        raise ValueError("State not found in dataset2")

    # Approx nutrient classification: choose most frequent (Low/M/High)
    N = state_row[['Nitrogen(N)-Low','Nitrogen (N) - M','Nitrogen(N) - High']].idxmax(axis=1).values[0]
    P = state_row[['Phosphorous(P) - Low','Phosphorous (P) - M','Phosphorous(P) - High']].idxmax(axis=1).values[0]
    K = state_row[['Potassium(K) - Low','Potassium (K) - M','Potassium(K) - High']].idxmax(axis=1).values[0]

    # Map nutrient levels to numeric values
    def nutrient_value(x):
        if "Low" in x: return 5
        elif "M" in x: return 15
        else: return 30

    nitrogen = nutrient_value(N)
    phosphorous = nutrient_value(P)
    potassium = nutrient_value(K)

    # Encode categorical inputs
    crop_enc = le_crop.transform([crop_type])[0]
    soil_type = 1  # placeholder if soil type is not provided separately

    # Build DataFrame (so feature names match training)
    input_df = pd.DataFrame([{
        "Temparature": temperature,
        "Humidity": humidity,
        "Moisture": moisture,
        "Soil Type": soil_type,
        "Crop Type": crop_enc,
        "Nitrogen": nitrogen,
        "Potassium": potassium,
        "Phosphorous": phosphorous
    }])

    # Predict fertilizer
    fert_pred = model.predict(input_df)[0]
    return le_fert.inverse_transform([fert_pred])[0]

print(predict_fertilizer("Bihar", 30, 60, 40, "Maize"))
