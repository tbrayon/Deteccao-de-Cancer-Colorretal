from flask import Flask, request, jsonify, render_template # ADDED render_template
from flask_cors import CORS
import pandas as pd
import joblib
import numpy as np

from random_patient import generate_random_patient

app = Flask(__name__)
CORS(app)

# Load trained models and preprocessor
try:
    rf_model = joblib.load("models/rf_model.pkl")
    nb_model = joblib.load("models/nb_model.pkl")
    xgb_model = joblib.load("models/xgb_model.pkl")

    rf_model_sm = joblib.load("models/rf_model_sm.pkl")
    nb_model_sm = joblib.load("models/nb_model_sm.pkl")
    xgb_model_sm = joblib.load("models/xgb_model_sm.pkl")

    rf_model_w = joblib.load("models/rf_model_w.pkl")
    nb_model_w = joblib.load("models/nb_model_w.pkl")
    xgb_model_w = joblib.load("models/xgb_model_w.pkl")

    preprocessor = joblib.load("preprocessor.pkl")
    print("Models and preprocessor loaded successfully.")
except FileNotFoundError as e:
    print(f"Error loading models or preprocessor: {e}. Make sure you run train_models.py first.")
    exit() # Exit the application if models cannot be loaded

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

def recommend_treatment(
    patient_features, model, preprocessor, base_features
):
    """
    Recommends the best treatment combination for a given patient
    based on the highest predicted survival probability.
    """
    combos = [
        {
            "Chemotherapy_Received": "Yes",
            "Radiotherapy_Received": "Yes",
            "Surgery_Received": "Yes",
        },
        {
            "Chemotherapy_Received": "Yes",
            "Radiotherapy_Received": "Yes",
            "Surgery_Received": "No",
        },
        {
            "Chemotherapy_Received": "Yes",
            "Radiotherapy_Received": "No",
            "Surgery_Received": "Yes",
        },
        {
            "Chemotherapy_Received": "Yes",
            "Radiotherapy_Received": "No",
            "Surgery_Received": "No",
        },
        {
            "Chemotherapy_Received": "No",
            "Radiotherapy_Received": "Yes",
            "Surgery_Received": "Yes",
        },
        {
            "Chemotherapy_Received": "No",
            "Radiotherapy_Received": "Yes",
            "Surgery_Received": "No",
        },
        {
            "Chemotherapy_Received": "No",
            "Radiotherapy_Received": "No",
            "Surgery_Received": "Yes",
        },
    ]

    best_prob, best_combo = -1, None

    feature_names = preprocessor.get_feature_names_out()

    for combo in combos:
        patient = patient_features.copy()
        for k, v in combo.items():
            patient[k] = v

        patient_aligned = patient[base_features]

        processed = preprocessor.transform(patient_aligned)
        processed_df = pd.DataFrame(processed, columns=feature_names)

        prob = model.predict_proba(processed_df)[0][1]

        if prob > best_prob:
            best_prob, best_combo = prob, combo

    return best_combo, best_prob


@app.route('/')
def index():
    """Renders the main prediction form page."""
    return render_template('index.html')


@app.route('/resultados')
def resultados_page():
    """Renders the results page."""
    return render_template('resultados.html')

@app.route('/random-patient', methods=['GET'])
def random_patient_endpoint():
    """Generates and returns a single random patient's data as JSON."""
    patient_df = generate_random_patient()
    # Convert the first row of the DataFrame to a dictionary
    patient_dict = patient_df.iloc[0].to_dict()
    return jsonify(patient_dict)

@app.route('/predict', methods=['POST'])
def predict():
    """Receives patient data from frontend, processes it, and returns predictions from multiple models."""
    data = request.json
    
    df = pd.DataFrame([data])

    expected_columns_order = [
        'Age', 'Gender', 'Race', 'Region', 'Urban_or_Rural', 'Socioeconomic_Status',
        'Family_History', 'Previous_Cancer_History', 'Stage_at_Diagnosis',
        'Tumor_Aggressiveness', 'Colonoscopy_Access', 'Screening_Regularity',
        'Diet_Type', 'BMI', 'Physical_Activity_Level', 'Smoking_Status',
        'Alcohol_Consumption', 'Red_Meat_Consumption', 'Fiber_Consumption',
        'Insurance_Coverage', 'Time_to_Diagnosis', 'Treatment_Access',
        'Chemotherapy_Received', 'Radiotherapy_Received', 'Surgery_Received',
        'Follow_Up_Adherence', 'Recurrence', 'Time_to_Recurrence'
    ]

    for col in expected_columns_order:
        if col not in df.columns:
            if col in ['Age', 'BMI', 'Time_to_Recurrence']:
                df[col] = 0.0
            else:
                df[col] = "No"

    df = df[expected_columns_order]

    numeric_cols = ['Age', 'BMI', 'Time_to_Recurrence']
    for col in numeric_cols:
        df[col] = pd.to_numeric(df[col], errors='coerce').fillna(0)

    print("Patient DataFrame after processing (head and dtypes):")
    print(df.head())
    print(df.dtypes)

    results = []

    initial_patient_features = df.iloc[0].drop(
        ['Chemotherapy_Received', 'Radiotherapy_Received', 'Surgery_Received'], errors='ignore'
    ).to_frame().T

    base_patient_columns = initial_patient_features.columns.tolist()


    for strategy, model_set in [
        ("Not balanced", models),
        ("SMOTE", models_smote),
        ("Weighted", models_weighted),
    ]:
        for name, model in model_set.items():
            combination, prob = recommend_treatment(
                initial_patient_features.copy(), model, preprocessor, base_patient_columns + ['Chemotherapy_Received', 'Radiotherapy_Received', 'Surgery_Received']
            )

            results.append({
                "Strategy": f"{strategy}",
                "Model": name,
                "Combination": combination,
                "Probability": f"{prob:.2%}"
            })

    print("JSON sent to frontend:", results)
    return jsonify(results)


if __name__ == '__main__':
    app.run(debug=True)