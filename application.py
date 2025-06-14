from collections import defaultdict, Counter
from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
import pandas as pd
import joblib

from random_patient import generate_random_patient

application = Flask(__name__)
CORS(application)

# Load trained models and preprocessor
try:
    rf_model = joblib.load("models/rf_model.pkl")
    nb_model = joblib.load("models/nb_model.pkl")
    xgb_model = joblib.load("models/xgb_model.pkl")

    preprocessor = joblib.load("preprocessor.pkl")
    print("Models and preprocessor loaded successfully.")
except FileNotFoundError as e:
    print(f"Error loading models or preprocessor: {e}. Make sure you run models.py first.")
    exit() # Exit the application if models cannot be loaded

models = {
    "RandomForest": rf_model,
    "NaiveBayes": nb_model,
    "XGBoost": xgb_model,
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

def join_treatments(treatments, lang="en"):
    # Translations
    translations = {
        "Chemotherapy": {"pt": "quimioterapia"},
        "Radiotherapy": {"pt": "radioterapia"},
        "Surgery": {"pt": "cirurgia"},
    }

    # Choose display values
    if lang == "pt":
        treatments = [translations[t]["pt"] for t in treatments]
    else:
        treatments = [t.lower() for t in treatments]

    if not treatments:
        return "no treatment" if lang == "en" else "nenhum tratamento"
    elif len(treatments) == 1:
        return treatments[0]
    else:
        return ", ".join(treatments[:-1]) + " and " + treatments[-1] if lang == "en" else ", ".join(treatments[:-1]) + " e " + treatments[-1]

def summarize_recommendation(results, lang="en"):
    cleaned_results = []
    for r in results:
        combo_tuple = tuple(sorted(r["Combination"].items()))
        prob_float = float(r["Probability"].strip('%')) / 100
        cleaned_results.append((combo_tuple, prob_float))

    combo_counter = Counter()
    combo_probs = defaultdict(list)

    for combo, prob in cleaned_results:
        combo_counter[combo] += 1
        combo_probs[combo].append(prob)

    most_common = combo_counter.most_common()
    top_combo, count = most_common[0]
    avg_prob = sum(combo_probs[top_combo]) / len(combo_probs[top_combo])

    def get_treatments(combo):
        return [
            treatment.replace("_Received", "").replace("_", " ").title()
            for treatment, value in combo if value == "Yes"
        ]

    # Determine wording
    if count == 3:
        msg_en = f"All three models recommend {join_treatments(get_treatments(top_combo), lang)} with an estimated success rate of {avg_prob:.2%}."
        msg_pt = f"Todos os três modelos recomendam {join_treatments(get_treatments(top_combo), lang)} com uma confiabilidade de {avg_prob:.2%}."
        return msg_pt if lang == "pt" else msg_en

    elif count == 2:
        msg_en = f"Two models recommend {join_treatments(get_treatments(top_combo), lang)} with an estimated success rate of {avg_prob:.2%}. Consider this recommendation but validate with a specialist."
        msg_pt = f"Dois modelos recomendam {join_treatments(get_treatments(top_combo), lang)} com uma confiabilidade de {avg_prob:.2%}. Considere esta recomendação, mas a validação de um especialista é necessária."
        return msg_pt if lang == "pt" else msg_en

    else:
        best_combo, best_prob = max(cleaned_results, key=lambda x: x[1])
        best_treatments = get_treatments(best_combo)
        msg_en = (
            f"The models gave different recommendations. "
            f"The most promising is {join_treatments(best_treatments, lang)} with an estimated success rate of {best_prob:.2%}. "
            "A healthcare professional should assess this case."
        )
        msg_pt = (
            f"Os modelos deram recomendações diferentes. "
            f"A mais promissora é {join_treatments(best_treatments, lang)} com uma confiabilidade de {best_prob:.2%}. "
            f"O especialista deve avaliar este caso."
        )
        return msg_pt if lang == "pt" else msg_en

@application.route('/')
def index():
    """Renders the main prediction form page."""
    return render_template('index.html')

@application.route('/modal.html')
def serve_modal():
    return send_from_directory('templates', 'modal.html')


@application.route('/resultados')
def results_page():
    """Renders the results page."""
    return render_template('resultados.html')

@application.route('/random-patient', methods=['GET'])
def random_patient_endpoint():
    """Generates and returns a single random patient's data as JSON."""
    patient_df = generate_random_patient()
    # Convert the first row of the DataFrame to a dictionary
    patient_dict = patient_df.iloc[0].to_dict()
    return jsonify(patient_dict)

@application.route('/predict', methods=['POST'])
def predict():
    """Receives patient data from frontend, processes it, and returns predictions from multiple models."""
    data = request.json
    
    # df = pd.DataFrame([data])
    
    df = generate_random_patient()

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

    predictions = []

    initial_patient_features = df.iloc[0].drop(
        ['Chemotherapy_Received', 'Radiotherapy_Received', 'Surgery_Received'], errors='ignore'
    ).to_frame().T

    base_patient_columns = initial_patient_features.columns.tolist()


    for strategy, model_set in [
        ("Not balanced", models)
    ]:
        for name, model in model_set.items():
            combination, prob = recommend_treatment(
                initial_patient_features.copy(), model, preprocessor, base_patient_columns + ['Chemotherapy_Received', 'Radiotherapy_Received', 'Surgery_Received']
            )

            predictions.append({
                "Model": name,
                "Combination": combination,
                "Probability": f"{prob:.2%}"
            })

    response = {
        "predictions": predictions,
        "result": summarize_recommendation(predictions, lang="pt")
    }

    print("JSON sent to frontend:", response)
    return jsonify(response)


if __name__ == '__main__':
    application.run(debug=True)