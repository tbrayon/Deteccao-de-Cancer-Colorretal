# Preparação dos dados

<p align="justify">No contexto de projetos de análise de dados e construção de modelos preditivos, a etapa de preparação dos dados assume um papel fundamental. O código apresentado demonstra um fluxo de trabalho bem estruturado para o pré-processamento de um conjunto de dados possivelmente relacionado à previsão de câncer colorretal. Cada etapa visa garantir que os modelos subsequentes recebam dados limpos, tratados e em um formato adequado para o aprendizado eficaz.</p>

(Nesta etapa, deverão ser descritas todas as técnicas utilizadas para pré-processamento/tratamento dos dados.)

(Algumas das etapas podem estar relacionadas à:)

## 1. Tratamento de Valores Ausentes (Imputação):

<p align="justify">A presença de valores ausentes é comum em bases de dados reais e pode comprometer significativamente o desempenho dos algoritmos de machine learning, já que a maioria deles não lida diretamente com dados faltantes.</p>

No código, a classe `SimpleImputer` do `scikit-learn` é utilizada com estratégias diferentes para variáveis numéricas e categóricas:

* **Variáveis numéricas:** utiliza-se a **mediana**, uma medida robusta à presença de outliers.
* **Variáveis categóricas:** aplica-se a **moda** (valor mais frequente), preservando a categoria mais representativa.

```python
# Criar pipelines de pré-processamento
numeric_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='median')), # Trata valores ausentes em colunas numéricas
    ('scaler', StandardScaler())])

categorical_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='most_frequent')), # Trata valores ausentes em colunas categóricas
    ('onehot', OneHotEncoder(handle_unknown='ignore'))])

# Criar o preprocessor usando ColumnTransformer
preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_transformer, numeric_features),
        ('cat', categorical_transformer, categorical_features)])

# Ajustar e transformar os dados
preprocessed_features = preprocessor.fit_transform(features)

```
<p align="justify"> O tratamento de valores ausentes, como parte da limpeza de dados, está acontecendo dentro dos pipelines numeric_transformer e categorical_transformer, usando o SimpleImputer com diferentes estratégias para colunas numéricas e categóricas. O ColumnTransformer aplica esses pipelines às colunas apropriadas, e o fit_transform executa a imputação durante a transformação dos dados. Esse tratamento evita a perda de dados relevantes e assegura que o conjunto final esteja completo e pronto para o treinamento dos modelos.</p>

## 2. Padronização de Dados Numéricos:

<p align="justify"> Após a imputação, os dados numéricos são padronizados usando StandardScaler dentro do numeric_transformer. Essa etapa transforma os dados numéricos para que tenham média zero e desvio padrão um. Isso ajuda a evitar que variáveis com escalas diferentes dominem o modelo e melhora o desempenho de alguns algoritmos.</p>

```python
numeric_transformer = Pipeline(steps=[
       ('imputer', SimpleImputer(strategy='median')),
       ('scaler', StandardScaler())]) # Padronização aqui
```
## 3. Codificação One-Hot para Dados Categóricos:

<p align="justify">As variáveis categóricas são transformadas usando OneHotEncoder dentro do categorical_transformer. Essa etapa converte cada categoria em uma nova coluna binária (0/1), evitando que o modelo interprete as categorias como tendo uma ordem intrínseca.</p>

```python
categorical_transformer = Pipeline(steps=[
       ('imputer', SimpleImputer(strategy='most_frequent')),
       ('onehot', OneHotEncoder(handle_unknown='ignore'))]) # Codificação One-Hot aqui
```
## 4. Aplicação das Transformações:

<p align="justify">O ColumnTransformer combina os pipelines numeric_transformer e categorical_transformer e os aplica às colunas apropriadas (numeric_features e categorical_features, respectivamente).</p>

<p align="justify">A função fit_transform ajusta os pipelines aos dados de entrada (features) e, em seguida, transforma os dados aplicando todas as etapas de transformação definidas nos pipelines.</p>

```python
preprocessor = ColumnTransformer(
       transformers=[
           ('num', numeric_transformer, numeric_features),
           ('cat', categorical_transformer, categorical_features)])

   preprocessed_features = preprocessor.fit_transform(features) # Aplicação das transformações
```

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

## xgboost:

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
