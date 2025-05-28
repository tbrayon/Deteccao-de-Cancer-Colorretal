import pandas as pd
import numpy as np

def generate_random_patient():
    """Generate a synthetic colorectal cancer patient with realistic attributes"""
    patient = {
        # Demographics
        "Age": np.random.randint(20, 89),
        "Gender": np.random.choice(["Male", "Female"]),
        "Race": np.random.choice(["White", "Black", "Asian", "Other"]),
        "Region": np.random.choice(["North America", "Europe", "Asia", "Other"]),
        "Urban_or_Rural": np.random.choice(["Urban", "Rural"]),
        "Socioeconomic_Status": np.random.choice(["Low", "Middle", "High"]),
        # Medical History
        "Family_History": np.random.choice(["Yes", "No"], p=[0.3, 0.7]),
        "Previous_Cancer_History": np.random.choice(["Yes", "No"], p=[0.1, 0.9]),
        # Cancer Characteristics
        "Stage_at_Diagnosis": np.random.choice(["I", "II", "III", "IV"]),
        "Tumor_Aggressiveness": np.random.choice(["Low", "Medium", "High"]),
        # Screening/Prevention
        "Colonoscopy_Access": np.random.choice(["Yes", "No"]),
        "Screening_Regularity": np.random.choice(["Regular", "Irregular", "Never"]),
        # Lifestyle Factors
        "Diet_Type": np.random.choice(["Western", "Balanced", "Traditional"]),
        "BMI": np.round(np.random.uniform(18.5, 40.0), 1),
        "Physical_Activity_Level": np.random.choice(["Low", "Medium", "High"]),
        "Smoking_Status": np.random.choice(
            ["Never", "Former", "Current"], p=[0.5, 0.3, 0.2]
        ),
        "Alcohol_Consumption": np.random.choice(["Low", "Medium", "High"]),
        "Red_Meat_Consumption": np.random.choice(["Low", "Medium", "High"]),
        "Fiber_Consumption": np.random.choice(["Low", "Medium", "High"]),
        # Healthcare Access
        "Insurance_Coverage": np.random.choice(["Yes", "No"]),
        "Time_to_Diagnosis": np.random.choice(["Timely", "Delayed"]),
        "Treatment_Access": np.random.choice(["Good", "Limited"]),
        # Treatments (initialized to No for simulation)
        "Chemotherapy_Received": "No",
        "Radiotherapy_Received": "No",
        "Surgery_Received": "No",
        # Follow-up (not needed for prediction)
        "Follow_Up_Adherence": np.random.choice(["Good", "Poor"]),
        "Recurrence": np.random.choice(["Yes", "No"]),
        "Time_to_Recurrence": np.random.randint(0, 59),
    }

    return pd.DataFrame([patient])