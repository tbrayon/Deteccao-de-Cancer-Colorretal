import pandas as pd
import numpy as np
from datetime import datetime
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestClassifier
from sklearn.naive_bayes import GaussianNB
from xgboost import XGBClassifier
from imblearn.over_sampling import SMOTE
from sklearn.model_selection import train_test_split
import os
import joblib

read_path = r"C:\Users\aguzm\Documents\CancerColorretal\colorectal_cancer_prediction.csv"
os.makedirs("models", exist_ok=True)

# ----------------------
# 1. DATA PREPARATION
# ----------------------

# Load and clean data
df = pd.read_csv(read_path)
df = df.drop(columns=["Patient_ID"])

# Separate features and target
target = "Survival_Status"
features = df.drop(columns=[target])
# y = df[target]
y = (
    df["Survival_Status"]
    .replace({"Survived": 1, "Deceased": 0})
    .infer_objects(copy=False)
)

# Split before any transformations
X_train, X_test, y_train, y_test = train_test_split(
    features, y, test_size=0.2, stratify=y, random_state=42
)

# Detect feature types
numeric_features = X_train.select_dtypes(include=np.number).columns.tolist()
categorical_features = X_train.select_dtypes(
    include=["object", "category"]
).columns.tolist()

# Pipelines
numeric_transformer = Pipeline(
    steps=[("imputer", SimpleImputer(strategy="median")), ("scaler", StandardScaler())]
)

categorical_transformer = Pipeline(
    steps=[
        ("imputer", SimpleImputer(strategy="most_frequent")),
        ("onehot", OneHotEncoder(handle_unknown="ignore")),
    ]
)

preprocessor = ColumnTransformer(
    transformers=[
        ("num", numeric_transformer, numeric_features),
        ("cat", categorical_transformer, categorical_features),
    ]
)

# Fit preprocessor and transform training and test features
X_train_processed = preprocessor.fit_transform(X_train)
X_test_processed = preprocessor.transform(X_test)
feature_names = preprocessor.get_feature_names_out()

X_train_df = pd.DataFrame(X_train_processed, columns=feature_names)
X_test_df = pd.DataFrame(X_test_processed, columns=feature_names)

# ----------------------
# 2. HANDLE IMBALANCE
# ----------------------

# Option A: Oversample minority with SMOTE
smote = SMOTE(random_state=42)
X_resampled, y_resampled = smote.fit_resample(X_train_df, y_train)

# ----------------------
# 3. MODEL TRAINING
# ----------------------

# Not balanced fit
rf_model = RandomForestClassifier(random_state=42)
nb_model = GaussianNB()
xgb_model = XGBClassifier(eval_metric="logloss", random_state=42)

rf_model.fit(X_train_df, y_train)
nb_model.fit(X_train_df, y_train)
xgb_model.fit(X_train_df, y_train)

# SMOTE fit
rf_model_sm = RandomForestClassifier(random_state=42)
nb_model_sm = GaussianNB()
xgb_model_sm = XGBClassifier(eval_metric="logloss", random_state=42)

rf_model_sm.fit(X_resampled, y_resampled)
nb_model_sm.fit(X_resampled, y_resampled)
xgb_model_sm.fit(X_resampled, y_resampled)

# Class-weighted models
rf_model_w = RandomForestClassifier(class_weight="balanced", random_state=42)
nb_model_w = GaussianNB()  # GaussianNB does not support class_weight directly
xgb_model_w = XGBClassifier(
    eval_metric="logloss",
    scale_pos_weight=(y_train == 0).sum() / (y_train == 1).sum(),
    random_state=42,
)

rf_model_w.fit(X_train_df, y_train)
# For NB, manual sample weighting in fit
weights = np.where(
    y_train == 1,
    len(y_train) / (2 * (y_train == 1).sum()),
    len(y_train) / (2 * (y_train == 0).sum()),
)
nb_model_w.fit(X_train_df, y_train, sample_weight=weights)
xgb_model_w.fit(X_train_df, y_train)

# Collect models
models = {
    "RandomForest": rf_model,
    "NaiveBayes": nb_model,
    "XGBoost": xgb_model,
}

models_smote = {
    "RandomForest_SMOTE": rf_model_sm,
    "NaiveBayes_SMOTE": nb_model_sm,
    "XGBoost_SMOTE": xgb_model_sm,
}

models_weighted = {
    "RandomForest_Weighted": rf_model_w,
    "NaiveBayes_Weighted": nb_model_w,
    "XGBoost_Weighted": xgb_model_w,
}

# Save the models for each balancing method
joblib.dump(rf_model, "models/rf_model.pkl")
joblib.dump(nb_model, "models/nb_model.pkl")
joblib.dump(xgb_model, "models/xgb_model.pkl")

print("Not balanced models generated!")

joblib.dump(rf_model_sm, "models/rf_model_sm.pkl")
joblib.dump(nb_model_sm, "models/nb_model_sm.pkl")
joblib.dump(xgb_model_sm, "models/xgb_model_sm.pkl")

print("SMOTE models generated!")

joblib.dump(rf_model_w, "models/rf_model_w.pkl")
joblib.dump(nb_model_w, "models/nb_model_w.pkl")
joblib.dump(xgb_model_w, "models/xgb_model_w.pkl")

print("Weighted models generated!")

# Save the preprocessor
joblib.dump(preprocessor, "preprocessor.pkl")