from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib

from random_patient import generate_random_patient

app = Flask(__name__)
CORS(app)

# Carregar modelos treinados e pré-processador
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

        # Alinha as colunas antes da transformação
        patient = patient[base_features]

        # Transforma os dados corretamente
        processed = preprocessor.transform(patient)
        processed_df = pd.DataFrame(processed, columns=feature_names)

        # Garante que `predict_proba` funciona corretamente
        prob = model.predict_proba(processed_df)[0][1]

        if prob > best_prob:
            best_prob, best_combo = prob, combo

    return best_combo, best_prob


def test_recommendation(patient):
    results = []

    for strategy, model_set in [
        ("Not balanced", models),
        # ("SMOTE", models_smote),
        # ("Weighted", models_weighted),
    ]:
        for name, model in model_set.items():
            combination, prob = recommend_treatment(
                patient, model, preprocessor, patient.columns
            )

            results.append({
                # "Strategy": f"{strategy}",
                "Model": name,
                "Combination": combination,
                # "Probability": f"{prob:.4f}",
                "Probability": f"{prob:.2%}"
            })

    return results


@app.route('/predict', methods=['POST'])
def predict():
    """Recebe os dados do frontend, processa e retorna previsões de múltiplos modelos."""
    data = request.json
    # Converter entrada para DataFrame
    df = pd.DataFrame([data])

    # Garantir que todas as colunas esperadas estejam presentes
    expected_columns = [
        'Age', 'Gender', 'Socioeconomic_Status', 'Red_Meat_Consumption', 'Screening_Regularity',
        'Alcohol_Consumption', 'BMI', 'Tumor_Aggressiveness', 'Colonoscopy_Access', 'Region',
        'Chemotherapy_Received', 'Urban_or_Rural', 'Follow_Up_Adherence', 'Surgery_Received',
        'Physical_Activity_Level', 'Insurance_Coverage', 'Race', 'Fiber_Consumption',
        'Time_to_Recurrence', 'Diet_Type', 'Radiotherapy_Received', 'Previous_Cancer_History',
        'Family_History', 'Treatment_Access', 'Smoking_Status', 'Recurrence', 'Time_to_Diagnosis'
    ]

    for col in expected_columns:
        if col not in df.columns:
            df[col] = "No"  # Valor padrão; ajuste conforme necessário

    # Convertendo colunas numéricas para float
    numeric_cols = ['Age', 'BMI', 'Time_to_Recurrence']
    for col in numeric_cols:
        df[col] = pd.to_numeric(df[col], errors='coerce').fillna(0)

    print("Colunas corrigidas no DataFrame:", df.dtypes)  # Debug no terminal

    # Mudar o paciente para um paciente recebido via requisição
    predictions = test_recommendation(generate_random_patient())

    # Depuração
    print("JSON enviado ao frontend:", predictions)

    return jsonify(predictions)


if __name__ == '__main__':
    app.run(debug=True)
