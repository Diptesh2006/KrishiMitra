# -*- coding: utf-8 -*-
"""Original file is located at
    https://colab.research.google.com/drive/1CxQIvtsXI0rFz9YAf8WGEdI--ASFow4J
"""

import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

df1 = pd.read_csv("../datasets/fertilisers.csv")   # Crop-Fertilizer Dataset
df2 = pd.read_csv("../datasets/nutrients by state.csv")   # State Nutrient Dataset

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
