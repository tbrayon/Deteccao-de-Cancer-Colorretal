import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import statsmodels.api as sm

from scipy.stats import mannwhitneyu, ttest_ind

df = pd.read_csv("colorectal_cancer_prediction.csv")


df = pd.read_csv("colorectal_cancer_prediction.csv")

### Sobrevivência por idade
survived_age = df[df["Survival_Status"] == 1]["Age"]
deceased_age = df[df["Survival_Status"] == 0]["Age"]

stat, p = mannwhitneyu(survived_age, deceased_age)
print(f"Estatística U: {stat}, p-valor: {p}")

stat, p = ttest_ind(survived_age, deceased_age, equal_var=False)
print(f"Estatística t: {stat}, p-valor: {p}")

# Definir X (idade) e y (sobrevivência)
X = sm.add_constant(df["Age"])
y = df["Survival_Status"].astype(int)
# Ajustar o modelo logístico
model = sm.Logit(y, X).fit()
print(model.summary())

# Calcular Q1 (25º percentil) e Q3 (75º percentil)
Q1 = df["Time_to_Recurrence"].quantile(0.25)
Q3 = df["Time_to_Recurrence"].quantile(0.75)
IQR = Q3 - Q1  # Intervalo interquartil

# Definir os limites para outliers
limite_inferior = Q1 - 1.5 * IQR
limite_superior = Q3 + 1.5 * IQR

# Filtrar outliers
outliers = df[
    (df["Time_to_Recurrence"] < limite_inferior)
    | (df["Time_to_Recurrence"] > limite_superior)
]
print(f"Número de outliers: {len(outliers)}")
print(outliers)

# Estatísticas básicas de tempo de recorrência e aderência ao acompanhamento
stats = df[["Time_to_Recurrence", "Follow_Up_Adherence"]].describe().T
stats["mode"] = df[["Time_to_Recurrence", "Follow_Up_Adherence"]].mode().iloc[0]  # Moda
print(stats)

### Boxplot do tempo de recorrência
plt.figure(figsize=(8, 5))
sns.boxplot(y=df["Time_to_Recurrence"], color="skyblue")
plt.ylabel("Tempo de Recorrência")
plt.title("Boxplot do Tempo de Recorrência")
plt.show()

### Idade por sobrevivência
plt.figure(figsize=(8, 5))
sns.histplot(
    df[df["Survival_Status"] == 1]["Age"],
    kde=True,
    color="#99CCFF",
    label="Sobreviveu",
    bins=20,
)
sns.histplot(
    df[df["Survival_Status"] == 0]["Age"],
    kde=True,
    color="#FF9999",
    label="Não Sobreviveu",
    bins=20,
)
plt.xlabel("Idade")
plt.ylabel("Frequência")
plt.title("Distribuição da Idade por Sobrevivência")
plt.legend()
plt.show()


### Sobrevivência por adesão ao acompanhamento
custom_palette = {0: "#FF9999", 1: "#99CCFF"}

plt.figure(figsize=(8, 5))
sns.countplot(
    x="Follow_Up_Adherence", hue="Survival_Status", data=df, palette=custom_palette
)
plt.xticks([0, 1], ["Baixa adesão", "Alta adesão"])
plt.xlabel("Categoria")
plt.ylabel("Pacientes")
plt.legend(title="Sobrevivência", labels=["Não", "Sim"])
plt.title("Sobrevivência por Adesão ao Acompanhamento")
plt.show()


correlation_matrix = df[
    ["Follow_Up_Adherence", "Time_to_Recurrence", "Survival_Status"]
].corr()

plt.figure(figsize=(6, 5))
sns.heatmap(correlation_matrix, annot=True, cmap="coolwarm", fmt=".2f")
plt.title("Correlação entre Variáveis Principais")
plt.show()
