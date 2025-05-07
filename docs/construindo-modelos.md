# Preparação dos dados

<p align="justify">No contexto de projetos de análise de dados e construção de modelos preditivos, a etapa de preparação dos dados assume um papel fundamental. O código apresentado demonstra um fluxo de trabalho bem estruturado para o pré-processamento de um conjunto de dados possivelmente relacionado à previsão de câncer colorretal. Cada etapa visa garantir que os modelos subsequentes recebam dados limpos, tratados e em um formato adequado para o aprendizado eficaz.</p>

(Nesta etapa, deverão ser descritas todas as técnicas utilizadas para pré-processamento/tratamento dos dados.)

(Algumas das etapas podem estar relacionadas à:)

## 1. Separação de features e targets:

<p align="justify">Nesta etapa incial é feito a separação das colunas features (colunas gerais do dataset) e das colunas targets (colunas alvo a qual tratá as respostas. </p>

```python
targets = ['Survival_Status', 'Chemotherapy_Received', 'Radiotherapy_Received', 'Surgery_Received']
# O restante dos dados em features (excluindo as colunas de targets) são as variáveis explicativas ou inputs usadas como base para
# realizar as previsões.
features = df.drop(columns=targets)
```

## 2. Conversão e tratamento de valores numéricos e categóricos (Imputação):

<p align="justify"> Identificação de tipos de dados os quais foram separados em dois grupos, numéricos e categóricos. </p>

```python
# colunas com valores numéricos (ex.: idade, IMC).
numeric_features = features.select_dtypes(include=np.number).columns.tolist()
# colunas com valores categóricos/texto (ex.: gênero, raça, região).
categorical_features = features.select_dtypes(exclude=np.number).columns.tolist()
```

No código, a classe `SimpleImputer` do `scikit-learn` é utilizada com estratégias diferentes para variáveis numéricas e categóricas:

* **Variáveis numéricas:** utiliza-se a **mediana**, uma medida robusta à presença de outliers.
* **Variáveis categóricas:** aplica-se a **moda** (valor mais frequente), preservando a categoria mais representativa.

```python
# Criar pipelines de pré-processamento
# Dados Numéricos
numeric_transformer = Pipeline(steps=[
     # Substitui valores faltantes pela mediana dos dados
    ('imputer', SimpleImputer(strategy='median')), # Trata valores ausentes em colunas numéricas
     # Converte os valores numéricos para uma escala comum (média 0 e desvio padrão 1) com o StandardScaler. Isso é importante para
     # garantir que todas as variáveis numéricas sejam tratadas igualmente pelos modelos.
    ('scaler', StandardScaler())])

# Dados Categóricos
categorical_transformer = Pipeline(steps=[
    # Substitui valores faltantes com o valor mais frequente em cada categoria
    ('imputer', SimpleImputer(strategy='most_frequent')), # Trata valores ausentes em colunas categóricas
    # Converte valores de texto (categorias) em variáveis numéricas binárias (0 ou 1) usando o OneHotEncoder. Isso permite que os
    # modelos entendam as informações categóricas. Em situações como codificação "One-Hot" (quando convertemos categorias em
    # variáveis binárias), frequentemente temos matrizes esparsas,pois cada categoria corresponde a um único 1 em um vetor cheio de 0s.
    ('onehot', OneHotEncoder(handle_unknown='ignore'))])

# Criar o preprocessor usando ColumnTransformer. Combinação dos Preprocessamentos. Isso organiza o preprocessamento de todas as colunas
# de forma eficiente. O ColumnTransformer aplica:
preprocessor = ColumnTransformer(
    transformers=[
        # O pipeline de dados numéricos (numeric_transformer) nas colunas definidas como numeric_features.
        ('num', numeric_transformer, numeric_features),
        # O pipeline de dados categóricos (categorical_transformer) nas colunas definidas como categorical_features.
        ('cat', categorical_transformer, categorical_features)])

# Ajustar e transformar os dados. Transformação e Criação de DataFrame. Aplica os pipelines (numéricos e categóricos) em todo
# o conjunto de dados features (colunas exceto as targets), retornando uma matriz contendo os dados pré-processados.
preprocessed_data = preprocessor.fit_transform(features)

# Extração dos Nomes das Variáveis.
# numeric_names: Mantém os nomes originais das colunas numéricas.
numeric_names = numeric_features
# categorical_names: Extrai os nomes das variáveis criadas pelo OneHotEncoder (ex.: Gender_Male, Gender_Female).
categorical_names = preprocessor.named_transformers_['cat'].named_steps['onehot']\
                   .get_feature_names_out(categorical_features)
# all_feature_names: Junta os nomes das colunas numéricas e categóricas em um único array.
all_feature_names = np.concatenate([numeric_names, categorical_names])

# Conversão para DataFrame para análise (se sparse matrix). Os dados preprocessados são convertidos em um DataFrame do pandas para
# facilitar a análise. Se a matriz resultante for esparsa (é uma estrutura na qual a maioria dos valores são zeros. Ela é utilizada
# para economizar memória e tornar os cálculos mais eficientes.), ela será convertida em um array denso (toarray() - armazena todos
# os valores explicitamente, incluindo os zeros. Este tipo de array não otimiza memória)
if hasattr(preprocessed_data, "toarray"):
    preprocessed_df = pd.DataFrame.sparse.from_spmatrix(preprocessed_data, columns=all_feature_names)
else:
    preprocessed_df = pd.DataFrame(preprocessed_data, columns=all_feature_names)

```
<p align="justify"> O tratamento de valores ausentes, como parte da limpeza de dados, está acontecendo dentro dos pipelines numeric_transformer e categorical_transformer, usando o SimpleImputer com diferentes estratégias para colunas numéricas e categóricas. O ColumnTransformer aplica esses pipelines às colunas apropriadas, e o fit_transform executa a imputação durante a transformação dos dados. Esse tratamento evita a perda de dados relevantes e assegura que o conjunto final esteja completo e pronto para o treinamento dos modelos.</p>
<p align="justify">A presença de valores ausentes é comum em bases de dados reais e pode comprometer significativamente o desempenho dos algoritmos de machine learning, já que a maioria deles não lida diretamente com dados faltantes.</p>
<p align="justify"> Após a imputação, os dados numéricos são padronizados usando StandardScaler dentro do numeric_transformer. Essa etapa transforma os dados numéricos para que tenham média zero e desvio padrão um. Isso ajuda a evitar que variáveis com escalas diferentes dominem o modelo e melhora o desempenho de alguns algoritmos.</p>
<p align="justify">As variáveis categóricas são transformadas usando OneHotEncoder dentro do categorical_transformer. Essa etapa converte cada categoria em uma nova coluna binária (0/1), evitando que o modelo interprete as categorias como tendo uma ordem intrínseca.</p>
<p align="justify">O ColumnTransformer combina os pipelines numeric_transformer e categorical_transformer e os aplica às colunas apropriadas (numeric_features e categorical_features, respectivamente).</p>
<p align="justify">A função fit_transform ajusta os pipelines aos dados de entrada (features) e, em seguida, transforma os dados aplicando todas as etapas de transformação definidas nos pipelines.</p>
<p align="justify">A transformação de dados envolve imputação de valores ausentes, padronização de dados numéricos, codificação one-hot para dados categóricos e a aplicação dessas transformações usando pipelines e ColumnTransformer. Essas etapas são essenciais para preparar os dados do Datasete Câncer Colorretal, garantindo que ele possa lidar com valores ausentes, diferentes escalas de variáveis e dados categóricos de forma eficaz.</p>

------
* Limpeza de Dados: trate valores ausentes: decida como lidar com dados faltantes, seja removendo linhas, preenchendo com médias, medianas ou usando métodos mais avançados; remova _outliers_: identifique e trate valores que se desviam significativamente da maioria dos dados.

* Transformação de Dados: normalize/padronize: torne os dados comparáveis, normalizando ou padronizando os valores para uma escala específica; codifique variáveis categóricas: converta variáveis categóricas em uma forma numérica, usando técnicas como _one-hot encoding_.

* _Feature Engineering_: crie novos atributos que possam ser mais informativos para o modelo; selecione características relevantes e descarte as menos importantes.

* Tratamento de dados desbalanceados: se as classes de interesse forem desbalanceadas, considere técnicas como _oversampling_, _undersampling_ ou o uso de algoritmos que lidam naturalmente com desbalanceamento.

* Separação de dados: divida os dados em conjuntos de treinamento, validação e teste para avaliar o desempenho do modelo de maneira adequada.
  
* Manuseio de Dados Temporais: se lidar com dados temporais, considere a ordenação adequada e técnicas específicas para esse tipo de dado.
  
* Redução de Dimensionalidade: aplique técnicas como PCA (Análise de Componentes Principais) se a dimensionalidade dos dados for muito alta.

* Validação Cruzada: utilize validação cruzada para avaliar o desempenho do modelo de forma mais robusta.

* Monitoramento Contínuo: atualize e adapte o pré-processamento conforme necessário ao longo do tempo, especialmente se os dados ou as condições do problema mudarem.

* Entre outras....

Avalie quais etapas são importantes para o contexto dos dados que você está trabalhando, pois a qualidade dos dados e a eficácia do pré-processamento desempenham um papel fundamental no sucesso de modelo(s) de aprendizado de máquina. É importante entender o contexto do problema e ajustar as etapas de preparação de dados de acordo com as necessidades específicas de cada projeto.

# Descrição dos modelos

## Randon Forest:

<p align="justify">O Randon Forest é um algoritmo de ensemble baseado em árvores de decisão. Quando se combina várias árvores, temos uma floresta. Ele cria várias árvores de decisão usando conjuntos de dados aleatórios e, em seguida, combina as previsões de cada árvore para produzir uma previsão final. O Random Forest é um conjunto de várias árvores de decisão que trabalham juntas para fazer previsões mais precisas. Ao invés de depender de uma única árvore, ele cria múltiplas árvores e combina suas respostas. Isso o torna mais robusto e menos propenso a erros causados por variações nos dados. Ele usa a votação entre árvores para prever categorias e a média das previsões para problemas de regressão.</p>
<p align="justify">Como funciona?</p>
<p align="justify"><strong>Criação de várias árvores de decisão →</strong> O algoritmo constrói várias árvores, cada uma com um conjunto ligeiramente diferente de dados.</p>
<p align="justify"><strong>Cada árvore faz uma previsão →</strong> Quando recebe um novo dado, cada árvore dá um "palpite" sobre a classe correta.</p>
<p align="justify"><strong>Votação das árvores (Classificação) →</strong> No caso de classificação, cada árvore vota e a resposta mais escolhida entre todas é a decisão final.</p>
<p align="justify"><strong>Média das previsões (Regressão) →</strong> Para problemas de regressão, o resultado final é uma média das previsões feitas pelas árvores.</p>

<p align="justify">Descrição do código:</p>

```python
# Separação entre features (X) e target (y)
# Separação de Dados: Os dados são divididos entre X (features) e y (target, no caso a sobrevivência).
# Dados tratados
# Define X como os dados que foram pré-processados no código acima apresentado na área de tratamento de dados.
X = preprocessed_df
# Conversão da Target: Transformamos "Survived" em 1 e "Deceased" em 0.
# Converte a variável alvo ("Survived" → 1 e "Deceased" → 0) para valores numéricos.
y = df['Survival_Status'].replace({'Survived': 1, 'Deceased': 0}).infer_objects(copy=False)

```

```python
# Divisão do Dataset: O dataset é dividido em treinamento (80%) e teste (20%) para avaliar o desempenho dos modelos. (Obs. Testamos também com outras porcentagens que serão descritas abaixo.)
# Treinamento dos Modelos: Cada modelo recebe os dados de treinamento (X_train, y_train) e aprende padrões para fazer previsões.
# Divide os dados em: 80% treino → usados para ensinar os modelos. 20% teste → usados para validar os modelos.
# Garante que a divisão seja reprodutível (os mesmos conjuntos sempre que o código for executado).
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Print para informação de quantidade de linhas e colunas sendo usadas em X_train e X_test.
print(f"Número de linhas em X_train: {X_train.shape[0]}")
print(f"Número de colunas em X_train: {X_train.shape[1]}")

print(f"Número de linhas em X_test: {X_test.shape[0]}")
print(f"Número de colunas em X_test: {X_test.shape[1]}")

```

```python
# 1️⃣ Modelo Random Forest
# Cria um modelo Random Forest com 100 árvores. (Obs. Testamos também com outras quantidades de árvores que serão descritas abaixo.)

# O Random Forest é um algoritmo baseado em múltiplas árvores de decisão. Cada árvore aprende um pequeno aspecto dos dados e, no final, todas as árvores juntas fazem uma votação para dar uma previsão mais robusta.
# 🔹 Mais árvores = mais estabilidade. Quando o modelo tem poucas árvores, ele pode ter mais variações e ser sensível a mudanças nos dados. Com mais árvores, ele generaliza melhor, reduzindo o risco de tomar decisões erradas devido a dados específicos do treino.

# 🔹 Aprimora a precisão Geralmente, aumentar o número de árvores melhora a precisão, pois cada árvore traz uma perspectiva diferente sobre os dados.

# 🔹 Compromisso entre desempenho e tempo de execução Testes práticos mostram que 100 árvores é um bom número para equilibrar qualidade e velocidade.

# Se tivermos milhares de árvores, o treinamento pode ficar muito lento sem ganhos significativos na precisão.
# O Bagging ocorre quando está sendo instanciado um modelo RandomForestClassifier com n_estimators=100, ou seja, 100 árvores de decisão serão treinadas usando subconjuntos aleatórios do seu dataset.
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
plt.bar(range(X_train.shape[1]), feature_importances[indices])
plt.xticks(range(X_train.shape[1]), np.array(all_feature_names)[indices], rotation=90)
plt.show()

# Faz previsões no conjunto de teste.
rf_pred = rf_model.predict(X_test)

```

```python

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

```

<p align="justify">Comparando com outros modelos XGBoost e Naive Bayes</p>

```python

# 2️⃣ Modelo XGBoost
# Cria um modelo XGBoost.
xgb_model = XGBClassifier(use_label_encoder=False, eval_metric='logloss')
# Treina o modelo com os dados de treino.
xgb_model.fit(X_train, y_train)
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

```

```python

# 3️⃣ Modelo Naive Bayes
# Cria um modelo Naive Bayes baseado na distribuição normal.
nb_model = GaussianNB()
# Treina o modelo com os dados de treino.
nb_model.fit(X_train, y_train)
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

```

<p align="justify">Calculando, exibindo as métricas e avaliando os três modelos.</p>

```python

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

```

<p align="justify">Resultados:</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/4a5d2aad-c333-4cf8-a102-3ad7e0d93ef2" alt="image">
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/3e135ecc-49fd-4f97-b103-1f64f1183209" alt="image">
</p>


## xgboost:

<p align="justify">XGBoost é um algoritmo de aprendizado de máquina de ensemble que utiliza o princípio de gradient boosting. Boosting é uma técnica onde múltiplos modelos fracos (normalmente árvores de decisão) são combinados para formar um modelo forte. No gradient boosting, os modelos são adicionados sequencialmente, com cada novo modelo tentando corrigir os erros dos modelos anteriores.</p>

```python
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report, roc_auc_score
import pandas as pd
```
#### 1 Variável Alvo:
```python
target = preprocessed_df['Survival_Status_Numeric']
```

#### 2 Variáveis Independentes:

```python
independent_vars_multi_xgb = [
    'Age', 'BMI', 'Gender_Female', 'Gender_Male',
    'Smoking_Status_Current', 'Smoking_Status_Never', 'Alcohol_Consumption_High', 'Alcohol_Consumption_Low',
    'Stage_at_Diagnosis_I', 'Stage_at_Diagnosis_II', 'Stage_at_Diagnosis_III', 'Stage_at_Diagnosis_IV',
    'Physical_Activity_Level_High', 'Physical_Activity_Level_Low'
    # Adicione outras variáveis que você deseja incluir
]
X_multi_xgb = preprocessed_df[independent_vars_multi_xgb].dropna()
y_multi_xgb = target[X_multi_xgb.index]
```

#### 3 Dividir os Dados:
```python
X_train_multi_xgb, X_test_multi_xgb, y_train_multi_xgb, y_test_multi_xgb = train_test_split(X_multi_xgb, y_multi_xgb, test_size=0.3, random_state=42)
```

#### 4 Treinar o Modelo XGBoost:
```python
model_multi_xgb = xgb.XGBClassifier(objective='binary:logistic', eval_metric='logloss', use_label_encoder=False, random_state=42)
model_multi_xgb.fit(X_train_multi_xgb, y_train_multi_xgb)
```

#### 5 Avaliar o Modelo:
```python
y_pred_multi_xgb = model_multi_xgb.predict(X_test_multi_xgb)
y_pred_multi_xgb_prob = model_multi_xgb.predict_proba(X_test_multi_xgb)[:, 1]

print("\nAcurácia do XGBoost (Multivariada):", accuracy_score(y_test_multi_xgb, y_pred_multi_xgb))
print("\nRelatório de Classificação do XGBoost (Multivariada):\n", classification_report(y_test_multi_xgb, y_pred_multi_xgb))
print("\nAUC-ROC do XGBoost (Multivariada):", roc_auc_score(y_test_multi_xgb, y_pred_multi_xgb_prob))
```

### Explicação Detalhada:

<p align="justify">Este código implementa um modelo de aprendizado de máquina usando o algoritmo XGBoost para resolver um problema de classificação binária. O objetivo é prever o status de sobrevivência (ou algo similar) com base em um conjunto de variáveis independentes. Vou explicar cada seção do código em detalhes:</p>

#### 1. Importação de Bibliotecas:
```python
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report, roc_auc_score
import pandas as pd
```

<p align="justify">- import xgboost as xgb: Importa a biblioteca XGBoost, que fornece uma implementação eficiente do algoritmo de gradient boosting. O XGBoost é conhecido por seu desempenho e velocidade em tarefas de aprendizado de máquina.</p>

<p align="justify">- from sklearn.model_selection import train_test_split: Importa a função train_test_split do scikit-learn. Essa função é usada para dividir o conjunto de dados em conjuntos de treinamento e teste, o que é essencial para avaliar o desempenho do modelo.</p>

- from sklearn.metrics import accuracy_score, classification_report, roc_auc_score: Importa métricas de avaliação do scikit-learn.

- accuracy_score: Calcula a acurácia da classificação.

- classification_report: Gera um relatório com métricas como precisão, recall e F1-score.

- roc_auc_score: Calcula a Área Sob a Curva ROC, útil para avaliar o desempenho de classificadores binários.

- import pandas as pd: Importa a biblioteca pandas, usada para manipular e analisar dados tabulares (DataFrames).
 
#### 2. Variável Alvo:
```python
- target = preprocessed_df['Survival_Status_Numeric']
```
- target = preprocessed_df['Survival_Status_Numeric']: Define a variável alvo, que é a variável que o modelo tentará prever. Nesse caso, a variável alvo é 'Survival_Status_Numeric', que representa o status de sobrevivência. Supõe-se que preprocessed_df é um DataFrame do pandas que contém os dados.

#### 3. Variáveis Independentes:

```python
independent_vars_multi_xgb = [
    'Age', 'BMI', 'Gender_Female', 'Gender_Male',
    'Smoking_Status_Current', 'Smoking_Status_Never', 'Alcohol_Consumption_High', 'Alcohol_Consumption_Low',
    'Stage_at_Diagnosis_I', 'Stage_at_Diagnosis_II', 'Stage_at_Diagnosis_III', 'Stage_at_Diagnosis_IV',
    'Physical_Activity_Level_High', 'Physical_Activity_Level_Low'
    # Adicione outras variáveis que você deseja incluir
]
X_multi_xgb = preprocessed_df[independent_vars_multi_xgb].dropna()
y_multi_xgb = target[X_multi_xgb.index]
```
- independent_vars_multi_xgb: Lista dos nomes das colunas que serão usadas como variáveis independentes (preditoras). Essas variáveis são usadas para prever a variável alvo.

- X_multi_xgb = preprocessed_df[independent_vars_multi_xgb].dropna(): Cria um novo DataFrame X_multi_xgb contendo apenas as colunas especificadas em independent_vars_multi_xgb. O método .dropna() remove quaisquer linhas que contenham valores ausentes, garantindo que o modelo seja treinado com dados limpos.

- y_multi_xgb = target[X_multi_xgb.index]: Cria uma nova série y_multi_xgb que contém os valores da variável alvo (target) correspondentes aos índices das linhas em X_multi_xgb. Isso garante que as variáveis independentes e a variável alvo estejam alinhadas após a remoção de valores ausentes.

#### 4. Divisão dos Dados:
```python
X_train_multi_xgb, X_test_multi_xgb, y_train_multi_xgb, y_test_multi_xgb = train_test_split(X_multi_xgb, y_multi_xgb, test_size=0.3, random_state=42)
```
- train_test_split: Divide o conjunto de dados em conjuntos de treinamento e teste.

- X_train_multi_xgb, y_train_multi_xgb: Conjuntos de dados usados para treinar o modelo.

- X_test_multi_xgb, y_test_multi_xgb: Conjuntos de dados usados para avaliar o desempenho do modelo em dados não vistos.

- test_size=0.3: Especifica que 30% dos dados serão usados para teste.

- random_state=42: Define uma semente para o gerador de números aleatórios, garantindo que a divisão dos dados seja reproduzível.

#### 5. Treinamento do Modelo XGBoost:
```python
- model_multi_xgb = xgb.XGBClassifier(objective='binary:logistic', eval_metric='logloss', use_label_encoder=False, random_state=42)
model_multi_xgb.fit(X_train_multi_xgb, y_train_multi_xgb)
```
- model_multi_xgb = xgb.XGBClassifier(...): Cria uma instância do classificador XGBoost.

- objective='binary:logistic': Especifica que o problema é de classificação binária e usa a função logística como função objetivo.

- eval_metric='logloss': Define a métrica de avaliação para o desempenho do modelo durante o treinamento como log loss.

- use_label_encoder=False: Desativa o uso do LabelEncoder do scikit-learn para evitar avisos.

- random_state=42: Garante a reprodutibilidade do treinamento do modelo.

- model_multi_xgb.fit(X_train_multi_xgb, y_train_multi_xgb): Treina o modelo XGBoost usando os dados de treinamento.

#### 6. Avaliar o Modelo:
```python
y_pred_multi_xgb = model_multi_xgb.predict(X_test_multi_xgb)
y_pred_multi_xgb_prob = model_multi_xgb.predict_proba(X_test_multi_xgb)[:, 1]

print("\nAcurácia do XGBoost (Multivariada):", accuracy_score(y_test_multi_xgb, y_pred_multi_xgb))
print("\nRelatório de Classificação do XGBoost (Multivariada):\n", classification_report(y_test_multi_xgb, y_pred_multi_xgb))
print("\nAUC-ROC do XGBoost (Multivariada):", roc_auc_score(y_test_multi_xgb, y_pred_multi_xgb_prob))
```
- y_pred_multi_xgb = model_multi_xgb.predict(X_test_multi_xgb): Faz previsões de classe para o conjunto de teste.

- y_pred_multi_xgb_prob = model_multi_xgb.predict_proba(X_test_multi_xgb)[:, 1]: Obtém as probabilidades previstas da classe positiva para o conjunto de teste.

#### 7. As instruções print exibem as métricas de avaliação:

- Acurácia: A proporção de previsões corretas.

- Relatório de Classificação: Inclui precisão, recall, F1-score e suporte para cada classe.

- AUC-ROC: A Área Sob a Curva Característica de Operação do Receptor, que mede a capacidade do modelo de distinguir entre as classes.
__________

Nesta seção, conhecendo os dados e de posse dos dados preparados, é hora de descrever os algoritmos de aprendizado de máquina selecionados para a construção dos modelos propostos. Inclua informações abrangentes sobre cada algoritmo implementado, aborde conceitos fundamentais, princípios de funcionamento, vantagens/limitações e justifique a escolha de cada um dos algoritmos.

Explore aspectos específicos, como o ajuste dos parâmetros livres de cada algoritmo. Lembre-se de experimentar parâmetros diferentes e principalmente, de justificar as escolhas realizadas.

Como parte da comprovação de construção dos modelos, um vídeo de demonstração com todas as etapas de pré-processamento e de execução dos modelos deverá ser entregue. Este vídeo poderá ser do tipo _screencast_ e é imprescindível a narração contemplando a demonstração de todas as etapas realizadas.

# Avaliação dos modelos criados

## Métricas utilizadas

Nesta seção, as métricas utilizadas para avaliar os modelos desenvolvidos deverão ser apresentadas (p. ex.: acurácia, precisão, recall, F1-Score, MSE etc.). A escolha de cada métrica deverá ser justificada, pois esta escolha é essencial para avaliar de forma mais assertiva a qualidade do modelo construído. 

## Discussão dos resultados obtidos

Nesta seção, discuta os resultados obtidos por cada um dos modelos construídos, no contexto prático em que os dados se inserem, promovendo uma compreensão abrangente e aprofundada da qualidade de cada um deles. Lembre-se de relacionar os resultados obtidos ao problema identificado, a questão de pesquisa levantada e estabelecer relação com os objetivos previamente propostos. Não deixe de comparar os resultados obtidos por cada modelo com os demais.

# Pipeline de pesquisa e análise de dados

Em pesquisa e experimentação em sistemas de informação, um pipeline de pesquisa e análise de dados refere-se a um conjunto organizado de processos e etapas que um profissional segue para realizar a coleta, preparação, análise e interpretação de dados durante a fase de pesquisa e desenvolvimento de modelos. Esse pipeline é essencial para extrair _insights_ significativos, entender a natureza dos dados e, construir modelos de aprendizado de máquina eficazes. 

# Vídeo de apresentação da Etapa 03

Nesta seção, deverá ser entregue um vídeo onde deverão ser descritas todas as etapas realizadas. O vídeo, que não tem limite de tempo, deverá ser apresentado por **todos os integrantes da equipe**, de forma que, cada integrante tenha oportunidade de apresentar o que desenvolveu e as percepções obtidas. Alunos que não participarem, serão penalizados na nota final da etapa.

## Observações importantes

Todas as tarefas realizadas nesta etapa deverão ser registradas em formato de texto junto com suas explicações de forma a apresentar os códigos desenvolvidos e também, o código deverá ser incluído, na íntegra, na pasta "src".
