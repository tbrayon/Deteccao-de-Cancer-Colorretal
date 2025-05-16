import os
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from scipy.stats import chi2_contingency
from scipy.stats import spearmanr
import statsmodels.api as sm
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
from sklearn.manifold import TSNE
from sklearn.feature_selection import mutual_info_classif
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
from xgboost import XGBClassifier
from imblearn.under_sampling import RandomUnderSampler
from imblearn.over_sampling import SMOTE


# Set global style for plots
sns.set_palette("husl")
plt.rcParams['figure.dpi'] = 100
plt.rcParams['savefig.dpi'] = 100

# Make output dirs if they don't exist
os.makedirs("graphs", exist_ok=True)
os.makedirs("csv", exist_ok=True)
os.makedirs("cluster_graphs", exist_ok=True)

# Conectar o Google Drive ao ambiente do Colab.
# drive.mount('/content/drive')

# Defina o caminho correto para o arquivo no Google Colab
file_path = "c:/Users/gina_/OneDrive/Área de Trabalho/PUC/AULAS 7 SEMESTRE/Projeto/Projeto/Etapa 3/colorectal_cancer_prediction_csv.csv"

# Carregar o dataset diretamente usando pandas
df = pd.read_csv(file_path)

df = df.drop(columns=['Patient_ID'])

# Separate features and targets
targets = ['Survival_Status']
features = df.drop(columns=targets)

# Define preprocessing pipeline
numeric_features = features.select_dtypes(include=np.number).columns.tolist()
categorical_features = features.select_dtypes(exclude=np.number).columns.tolist()

print("Start of data transformation...")

numeric_transformer = Pipeline(steps=[
	('imputer', SimpleImputer(strategy='median')),
	('scaler', StandardScaler())])

categorical_transformer = Pipeline(steps=[
	('imputer', SimpleImputer(strategy='most_frequent')),
	('onehot', OneHotEncoder(handle_unknown='ignore'))])

preprocessor = ColumnTransformer(
	transformers=[
    	('num', numeric_transformer, numeric_features),
    	('cat', categorical_transformer, categorical_features)])

# Fit and transform the data
preprocessed_data = preprocessor.fit_transform(features)

# Get feature names after preprocessing
numeric_names = numeric_features
categorical_names = preprocessor.named_transformers_['cat'].named_steps['onehot']\
                 	.get_feature_names_out(categorical_features)
all_feature_names = np.concatenate([numeric_names, categorical_names])

# Convert to DataFrame for analysis (if sparse matrix)
if hasattr(preprocessed_data, "toarray"):
	preprocessed_df = pd.DataFrame(preprocessed_data.toarray(), columns=all_feature_names)
else:
	preprocessed_df = pd.DataFrame(preprocessed_data, columns=all_feature_names)

print("End of data transformation...")

# Separação entre features (X) e target (y)
# Separação de Dados: Os dados são divididos entre X (features) e y (target, no caso a sobrevivência).
# Dados tratados
# Define X como os dados que foram pré-processados no código anterior.
X = preprocessed_df
# Conversão da Target: Transformamos "Survived" em 1 e "Deceased" em 0.
# Converte a variável alvo ("Survived" → 1 e "Deceased" → 0) para valores numéricos.
y = df['Survival_Status'].replace({'Survived': 1, 'Deceased': 0}).infer_objects(copy=False)

# Divisão dos dados em treinamento (80%) e teste (20%)
# Divisão do Dataset: O dataset é dividido em treinamento (80%) e teste (20%) para avaliar o desempenho dos modelos.
# Treinamento dos Modelos: Cada modelo recebe os dados de treinamento (X_train, y_train) e aprende padrões para fazer previsões.
# Divide os dados em: 80% treino → usados para ensinar os modelos. 20% teste → usados para validar os modelos.
# Garante que a divisão seja reprodutível (os mesmos conjuntos sempre que o código for executado).
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print(f"Número de linhas em X_train: {X_train.shape[0]}")
print(f"Número de colunas em X_train: {X_train.shape[1]}")

print(f"Número de linhas em X_test: {X_test.shape[0]}")
print(f"Número de colunas em X_test: {X_test.shape[1]}")


# ----------------------
# 1. ANÁLISE RANDON FOREST, MODELO XGBBOOST E MODELO BAYES
# ----------------------

# 1️⃣ Modelo Random Forest
# Cria um modelo Random Forest com 100 árvores.
# O Random Forest é um algoritmo baseado em múltiplas árvores de decisão. Cada árvore aprende um pequeno aspecto dos dados e, no final, todas as árvores juntas fazem uma votação para dar uma previsão mais robusta.
# 🔹 Mais árvores = mais estabilidade Quando o modelo tem poucas árvores, ele pode ter mais variações e ser sensível a mudanças nos dados. Com mais árvores, ele generaliza melhor, reduzindo o risco de tomar decisões erradas devido a dados
# específicos do treino.
# 🔹 Aprimora a precisão Geralmente, aumentar o número de árvores melhora a precisão, pois cada árvore traz uma perspectiva diferente sobre os dados.
# 🔹 Compromisso entre desempenho e tempo de execução Testes práticos mostram que 100 árvores é um bom número para equilibrar qualidade e velocidade.
# Se tivermos milhares de árvores, o treinamento pode ficar muito lento sem ganhos significativos na precisão.
# O Bagging ocorre quando está sendo instanciado um modelo RandomForestClassifier com n_estimators=100, ou seja, 100 árvores de decisão serão treinadas usando
# subconjuntos aleatórios do seu dataset.
rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
# Treina o modelo nos dados de treino.
# O Random Forest também aplica Feature Selection automaticamente ao treinar o modelo (rf_model.fit(X_train, y_train)).
# Ele seleciona aleatoriamente um subconjunto de atributos para cada árvore, reduzindo a dependência de atributos irrelevantes
rf_model.fit(X_train, y_train)
# Obter importância das features (Feature Selection)
feature_importances = rf_model.feature_importances_
# Ordenar e visualizar
indices = np.argsort(feature_importances)[::-1]  # Ordena do maior para o menor
plt.figure(figsize=(30, 20))
plt.title("Importância das Features no Random Forest")
plt.barh(range(X_train.shape[1]), feature_importances[indices])
plt.yticks(range(X_train.shape[1]), np.array(all_feature_names)[indices])
plt.gca().invert_yaxis()  # Opcional: coloca a feature mais importante no topo
plt.xlabel("Importância")
plt.ylabel("Features")
plt.show()
# Faz previsões no conjunto de teste.
rf_pred = rf_model.predict(X_test)

# Matriz de Confusão para Random Forest
# Ela compara os valores reais (y_test) com os valores preditos (rf_pred) pelo modelo Random Forest.
cm_rf = confusion_matrix(y_test, rf_pred)
# Cria uma nova área de figura do matplotlib, definindo o tamanho dela: 8 de largura por 6 de altura.
plt.figure(figsize=(8, 6))
# sns.heatmap é a função do Seaborn que desenha uma mapa de calor (heatmap).
sns.heatmap(cm_rf, annot=True, fmt='d', cmap='Greens',
            xticklabels=['Deceased', 'Survived'], yticklabels=['Deceased', 'Survived'])
# Define o título do eixo X como "Valores Previstos".
plt.xlabel('Valores Previstos')
# Define o título do eixo Y como "Valores Reais".
plt.ylabel('Valores Reais')
# Define o título do gráfico.
plt.title('Matriz de Confusão: Random Forest')
# Exibe o gráfico na tela.
plt.show()

# 2️⃣ Modelo XGBoost
# Cria um modelo XGBoost.
xgb_model = XGBClassifier(use_label_encoder=False, eval_metric='logloss')
# Treina o modelo com os dados de treino.
xgb_model.fit(X_train, y_train)
xgb_importances = xgb_model.feature_importances_
indices = np.argsort(xgb_importances)[::-1]

plt.figure(figsize=(30, 20))
plt.title("Importância das Features no XGBoost")
plt.barh(range(X_train.shape[1]), xgb_importances[indices])
plt.yticks(range(X_train.shape[1]), np.array(all_feature_names)[indices])
plt.gca().invert_yaxis()
plt.xlabel("Importância")
plt.ylabel("Features")
plt.show()
# Faz previsões no conjunto de teste.
xgb_pred = xgb_model.predict(X_test)

# Matriz de Confusão para XGBoost
cm_xgb = confusion_matrix(y_test, xgb_pred)
plt.figure(figsize=(8, 6))
sns.heatmap(cm_xgb, annot=True, fmt='d', cmap='Blues',
            xticklabels=['Deceased', 'Survived'], yticklabels=['Deceased', 'Survived'])
plt.xlabel('Valores Previstos')
plt.ylabel('Valores Reais')
plt.title('Matriz de Confusão: XGBoost')
plt.show()

# 3️⃣ Modelo Naive Bayes
# Cria um modelo Naive Bayes baseado na distribuição normal.
nb_model = GaussianNB()
# Treina o modelo com os dados de treino.
nb_model.fit(X_train, y_train)
# Obtemos as médias das features para cada classe
means = nb_model.theta_  # shape: (n_classes, n_features)

# Calculamos a diferença absoluta entre as médias das classes
# Para problemas binários, podemos fazer isso assim:
mean_diff = np.abs(means[1] - means[0])

# Ordena as features pela diferença
indices = np.argsort(mean_diff)[::-1]

# Plota as diferenças como "importâncias"
plt.figure(figsize=(30, 20))
plt.title("Diferença entre médias das classes (interpretação de importância) - Naive Bayes")
plt.barh(range(X_train.shape[1]), mean_diff[indices])
plt.yticks(range(X_train.shape[1]), np.array(all_feature_names)[indices])
plt.gca().invert_yaxis()
plt.xlabel("Diferença entre médias")
plt.ylabel("Features")
plt.show()
# Faz previsões no conjunto de teste.
nb_pred = nb_model.predict(X_test)

# Matriz de Confusão para Naive Bayes
cm_nb = confusion_matrix(y_test, nb_pred)
plt.figure(figsize=(8, 6))
sns.heatmap(cm_nb, annot=True, fmt='d', cmap='Oranges',
            xticklabels=['Deceased', 'Survived'], yticklabels=['Deceased', 'Survived'])
plt.xlabel('Valores Previstos')
plt.ylabel('Valores Reais')
plt.title('Matriz de Confusão: Naive Bayes')
plt.show()

# Função para calcular e exibir as métricas
# Avaliação dos Modelos: O código mede o desempenho dos três modelos usando as métricas: 🔹 Acurácia (quantidade de previsões corretas) 🔹 Precisão (quão correto é quando prevê sobrevivência)
# 🔹 Recall (quantos casos de sobrevivência foram corretamente identificados) 🔹 F1-score (média harmônica entre precisão e recall)
# Define uma função evaluate_model(name, y_test, y_pred), que recebe: name → Nome do modelo. // y_test → Verdadeiro status de sobrevivência. // y_pred → Previsões do modelo.
# Calcula e exibe as métricas de desempenho: Acurácia → Percentagem de previsões corretas. // Precisão → Quão correto é quando prevê sobrevivência. // Recall → Quantos casos de sobrevivência foram identificados corretamente.
# F1-score → Combinação entre precisão e recall.
def evaluate_model(name, y_test, y_pred):
    print(f"\nResultados para {name}:")
    print(f"Acurácia: {accuracy_score(y_test, y_pred):.4f}")
    print(f"Precisão: {precision_score(y_test, y_pred):.4f}")
    print(f"Recall: {recall_score(y_test, y_pred):.4f}")
    print(f"F1-Score: {f1_score(y_test, y_pred):.4f}")

# Avaliação dos modelos
# Chama a função evaluate_model para cada modelo, imprimindo os resultados das métricas.
evaluate_model("Random Forest", y_test, rf_pred)
evaluate_model("XGBoost", y_test, xgb_pred)
evaluate_model("Naive Bayes", y_test, nb_pred)