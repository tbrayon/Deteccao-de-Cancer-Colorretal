# Preparação dos dados

<p align="justify">No contexto de projetos de análise de dados e construção de modelos preditivos, a etapa de preparação dos dados assume um papel fundamental. O código apresentado demonstra um fluxo de trabalho bem estruturado para o pré-processamento de um conjunto de dados possivelmente relacionado à previsão de câncer colorretal. Cada etapa visa garantir que os modelos subsequentes recebam dados limpos, tratados e em um formato adequado para o aprendizado eficaz.</p>

## 1. Separação de features e targets:

<p align="justify">Nesta etapa incial é feito a separação das colunas features (colunas gerais do dataset) e da coluna targets (coluna alvo a qual tratá as respostas. </p>

```python
targets = ['Survival_Status']
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
# Criar pipelines de pré-processamentof
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
plt.barh(range(X_train.shape[1]), feature_importances[indices])
plt.yticks(range(X_train.shape[1]), np.array(all_feature_names)[indices])
plt.gca().invert_yaxis()  # Opcional: coloca a feature mais importante no topo
plt.xlabel("Importância")
plt.ylabel("Features")
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

```

```python

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

<p align="justify">Apuração:</p>

<p align="justify">O print abaixo apresenta a avaliação de desempenho dos três modelos de classificação — Random Forest, XGBoost e Naive Bayes — utilizando três divisões distintas dos dados: 90% treino e 10% teste, 80% treino e 20% teste, e 70% treino e 30% teste. Para cada configuração, foram testados diferentes números de árvores (100, 200, 300 e 400 árvores) nos modelos Random Forest e XGBoost. As métricas calculadas foram Acurácia (percentual de previsões corretas no total), Precisão (quão correto o modelo foi ao prever a sobrevivência), Recall (quantidade de casos de sobrevivência corretamente identificados) e F1-Score (harmonização entre Precisão e Recall). De modo geral, os valores de Acurácia e F1-Score mantiveram-se bastante elevados para todos os modelos, com destaque para o Naive Bayes, que apresentou recall de 100% em todas as divisões dos dados, enquanto Random Forest e XGBoost tiveram uma leve queda de desempenho conforme a proporção de teste aumentava.</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/4a5d2aad-c333-4cf8-a102-3ad7e0d93ef2" alt="image">
</p>

<p align="justify">Já o print abaixo apresenta a análise detalhada dos resultados em termos absolutos: quantidade de Verdadeiros Negativos (casos corretamente classificados como não sobreviventes), Falsos Positivos (casos incorretamente classificados como sobreviventes), Falsos Negativos (casos incorretamente classificados como não sobreviventes) e Verdadeiros Positivos (casos corretamente classificados como sobreviventes). Em todas as divisões e para todos os modelos, o número de Falsos Negativos é extremamente baixo ou mesmo zero, indicando alta capacidade dos modelos em identificar corretamente os casos de sobrevivência. O Naive Bayes apresentou resultados perfeitos (zero falsos negativos e falsos positivos) em todas as situações testadas, reforçando sua alta sensibilidade (recall) e especificidade. Em comparação, os modelos Random Forest e XGBoost, apesar de também apresentarem excelentes resultados, tiveram uma pequena quantidade de erros, sobretudo no aumento da proporção de teste.</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/3e135ecc-49fd-4f97-b103-1f64f1183209" alt="image">
</p>

<p align="justify">Resultado:</p>

<p align="justify">Após apuração, chegamos ao veredito em que o cenário que apresentou o melhor desempenho foi com treinamento de 80% e teste de 20% com 100 árvores de decisão. Com isso, apresentamos abaixo os prints das matrizes de confusão deste cenário em específico:</p>

<p align="justify">Matriz de confusão Randon Forest:</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/d313818c-0eda-474f-b97b-2d5e64b28c92" alt="image">
</p>

<p align="justify">Matriz de confusão XGBoost:</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/64b49233-4fbd-4d19-8cb8-a1e78ef0feff" alt="image">
</p>

<p align="justify">Matriz de confusão Naive Bayes:</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/632ebad6-7b43-4d27-ac01-5379bd8dee95" alt="image">
</p>

<p align="justify">Analisando os resultados gerais, os três modelos obtiveram desempenhos muito bons, com pequenas variações entre eles conforme o volume de dados de teste aumentava. O Random Forest e o XGBoost apresentaram uma pequena perda de desempenho em termos de precisão e F1-Score à medida que a porcentagem de teste aumentava. Já o Naive Bayes se destacou pela consistência: manteve precisão, recall e F1-Score elevados (próximos de 1.0) em todas as divisões de treino/teste, sem apresentar erros (falsos positivos ou falsos negativos) nos dados de validação. Com base nos resultados apresentados, o Naive Bayes foi o método que apresentou o melhor desempenho geral, demonstrando tanto alta capacidade de identificação dos sobreviventes quanto estabilidade nas diferentes proporções de divisão dos dados.</p>


## XGBoost:

<p align="justify">O XGBoost é um algoritmo de aprendizado de máquina de ensemble baseado na técnica de gradient boosting. Ele constrói um modelo preditivo forte combinando sequencialmente múltiplos modelos fracos (tipicamente árvores de decisão), onde cada novo modelo tenta corrigir os erros dos modelos anteriores.</p>

O XGBoost se destaca por suas otimizações que o tornam altamente eficiente e preciso, incluindo:

* Regularização para evitar overfitting.
* Tratamento nativo de valores ausentes.
* Processamento paralelo para treinamento mais rápido.
* Otimizações na construção das árvores.
* Flexibilidade com funções de perda personalizadas.
* Taxa de aprendizado ("shrinkage") para maior robustez.

#### 1 Descrição do Código:
```python
# Crie a matriz de features (X)
  X = df_processed[feature_columns]
  # Cria um novo DataFrame chamado 'X' contendo apenas as colunas listadas em 'feature_columns' do DataFrame 'df_processed'.
  # 'X' representa a matriz de features que será utilizada para treinar os modelos de machine learning.

  # Crie as variáveis dependentes (y) para cada alvo
  y_survival = df_processed['Survival_Status_Survived'] # Assumindo que 'Survived' é o positivo
  # Cria uma Series chamada 'y_survival' contendo os valores da coluna 'Survival_Status_Survived' do DataFrame 'df_processed'.
  # Esta Series representa a variável dependente (o alvo) para a tarefa de prever a sobrevivência.
  # Assume-se que o valor 1.0 nesta coluna indica que o paciente sobreviveu (o rótulo positivo).

  y_chemo = df_processed['Chemotherapy_Received_Yes'] # Assumindo que 'Yes' é o positivo
  # Cria uma Series chamada 'y_chemo' contendo os valores da coluna 'Chemotherapy_Received_Yes' do DataFrame 'df_processed'.
  # Esta Series representa a variável dependente para a tarefa de prever se o paciente recebeu quimioterapia.
  # Assume-se que o valor 1.0 nesta coluna indica que o paciente recebeu quimioterapia (o rótulo positivo).

  y_radio = df_processed['Radiotherapy_Received_Yes'] # Assumindo que 'Yes' é o positivo
  # Cria uma Series chamada 'y_radio' contendo os valores da coluna 'Radiotherapy_Received_Yes' do DataFrame 'df_processed'.
  # Esta Series representa a variável dependente para a tarefa de prever se o paciente recebeu radioterapia.
  # Assume-se que o valor 1.0 nesta coluna indica que o paciente recebeu radioterapia (o rótulo positivo).

  y_surgery = df_processed['Surgery_Received_Yes'] # Assumindo que 'Yes' é o positivo
  # Cria uma Series chamada 'y_surgery' contendo os valores da coluna 'Surgery_Received_Yes' do DataFrame 'df_processed'.
  # Esta Series representa a variável dependente para a tarefa de prever se o paciente passou por cirurgia.
  # Assume-se que o valor 1.0 nesta coluna indica que o paciente passou por cirurgia (o rótulo positivo).
```

#### 2 Divisão de Dados em Treinamento e Teste para Modelagem de Sobrevivência ao Câncer de Colorretal:

```python
from sklearn.model_selection import train_test_split
# Importa a função 'train_test_split' da biblioteca 'sklearn.model_selection'.
# Esta função é essencial para dividir um conjunto de dados em subconjuntos separados
# para treinamento de um modelo de machine learning e para avaliar seu desempenho em dados não vistos.

# Exemplo para o alvo 'Survival_Status'
# Comentário indicando que o código a seguir realiza a divisão dos dados
# especificamente para a variável alvo 'Survival_Status'.

X_train_survival, X_test_survival, y_train_survival, y_test_survival = train_test_split(
    X, y_survival, test_size=0.2, random_state=42
)
# Chama a função 'train_test_split' para dividir os dados em conjuntos de treinamento e teste.
# - 'X': Representa a matriz de features (variáveis independentes) que serão usadas para a previsão.
# - 'y_survival': Representa a variável alvo (dependente) que queremos prever, neste caso, a sobrevivência.
# - 'test_size=0.2': Especifica que 20% do conjunto de dados original será reservado para o conjunto de teste.
#                    Os 80% restantes serão usados para o conjunto de treinamento.
# - 'random_state=42': Define uma semente para o gerador de números aleatórios.
#                      Isso garante que a divisão dos dados seja a mesma cada vez que o código for executado,
#                      o que é importante para a reprodutibilidade dos resultados.
# A função retorna quatro conjuntos de dados:
# - 'X_train_survival': As features para o conjunto de treinamento do modelo de sobrevivência.
# - 'X_test_survival': As features para o conjunto de teste do modelo de sobrevivência.
# - 'y_train_survival': A variável alvo (sobrevivência) para o conjunto de treinamento.
# - 'y_test_survival': A variável alvo (sobrevivência) para o conjunto de teste.
```

#### 3 Importação do Classificador XGBoost para Modelagem Preditiva:
```python
rom xgboost import XGBClassifier
# Importa a classe 'XGBClassifier' da biblioteca 'xgboost'.
# O 'XGBClassifier' é uma implementação do algoritmo de Gradient Boosting
# para problemas de classificação. É um modelo poderoso e frequentemente
# utilizado em tarefas de machine learning devido ao seu desempenho e
# capacidade de lidar com dados complexos. Ao importar esta classe,
# tornamos disponível o uso do algoritmo XGBoost para construir
# modelos de classificação em nossos dados.
```

#### 4 Inicialização de Modelos XGBoost com Parâmetros Padrão e Ajustados:
```python
# Usando parâmetros padrão
model = XGBClassifier()
# Cria uma instância do classificador XGBoost (XGBClassifier) com seus parâmetros default.
# Ao não especificar nenhum parâmetro, o modelo utilizará as configurações padrão definidas na biblioteca xgboost.
# Esta é uma maneira rápida de criar um modelo base para começar a experimentar ou para comparar com modelos ajustados.
# A instância do modelo é armazenada na variável 'model'.

# Especificando hiperparâmetros (exemplo)
model_tuned = XGBClassifier(objective='binary:logistic', # Especifica o objetivo da tarefa de classificação como logística binária.
                                                    # Isso é adequado para problemas onde a variável alvo tem duas classes (0 ou 1).
                            n_estimators=100,          # Define o número de árvores de boosting (ou "estimators") que serão construídas no modelo.
                                                    # Mais árvores podem levar a um melhor desempenho, mas também a um maior tempo de treinamento e risco de overfitting.
                            learning_rate=0.1,         # Controla a taxa de aprendizado, que determina o passo de encolhimento usado para evitar o overfitting.
                                                    # Valores menores tornam o aprendizado mais lento, mas podem levar a um modelo mais robusto.
                            max_depth=3,               # Define a profundidade máxima de cada árvore individual.
                                                    # Controla a complexidade do modelo; árvores mais profundas podem capturar relações mais complexas, mas também podem overfit.
                            random_state=42)
# Cria outra instância do classificador XGBoost (XGBClassifier), mas desta vez especificando manualmente alguns hiperparâmetros.
# Os hiperparâmetros são configurações que não são aprendidas diretamente pelos dados, mas que são definidas antes do treinamento.
# Ajustar esses parâmetros ('tuning') é uma etapa importante para otimizar o desempenho do modelo para um problema específico.
# 'random_state=42' garante que a inicialização aleatória do modelo seja a mesma cada vez que o código é executado, para reprodutibilidade.
# A instância do modelo com hiperparâmetros ajustados é armazenada na variável 'model_tuned'.
```

#### 5 Treinamento do Modelo XGBoost Ajustado com Dados de Sobrevivência:
```python
# Use os dados de treinamento para ajustar o modelo com hiperparâmetros
model_tuned.fit(X_train_survival, y_train_survival)
# Chama o método 'fit()' da instância do modelo XGBoost que foi inicializada com hiperparâmetros ('model_tuned').
# O método 'fit()' é responsável por treinar o modelo usando os dados fornecidos.
# - 'X_train_survival': Contém as features (variáveis independentes) do conjunto de treinamento.
#                      O modelo aprenderá os padrões nesses dados para fazer previsões.
# - 'y_train_survival': Contém a variável alvo (dependente) correspondente ao conjunto de treinamento.
#                      Neste caso, representa a informação de sobrevivência para cada amostra no conjunto de treinamento.
# Durante o treinamento, o algoritmo XGBoost itera sobre as árvores de boosting,
# ajustando seus parâmetros internos para minimizar o erro entre as previsões do modelo
# e os valores reais da variável alvo no conjunto de treinamento.
# Após a execução desta linha, o modelo 'model_tuned' estará treinado e pronto para ser usado
# para fazer previsões em novos dados (como o conjunto de teste).
```

#### 6 Realização de Previsões de Sobrevivência com o Modelo XGBoost Treinado:

```python
y_pred_survival = model.predict(X_test_survival)
# Utiliza o método 'predict()' do modelo XGBoost treinado ('model') para gerar previsões
# sobre o conjunto de dados de teste ('X_test_survival').
# O modelo, tendo sido previamente treinado com os dados de treinamento, agora aplica o conhecimento
# aprendido para prever a classe (neste caso, se o paciente sobreviveu ou não) para cada amostra
# presente no conjunto de teste.
# As previsões geradas pelo modelo são armazenadas na variável 'y_pred_survival' como um array NumPy.
# Cada elemento deste array representa a classe prevista para a amostra correspondente em 'X_test_survival'.

print(y_pred_survival)
# Imprime o conteúdo da variável 'y_pred_survival', que contém as previsões de classe
# (provavelmente representadas por 0 e 1) para cada paciente no conjunto de teste.
# Esta saída permite visualizar as previsões feitas pelo modelo e compará-las posteriormente
# com os valores reais da variável alvo no conjunto de teste ('y_test_survival') para avaliar o desempenho do modelo.
```
#### 7. Importação de Métricas de Avaliação do scikit-learn:
```python
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
# Importa funções específicas do módulo 'metrics' da biblioteca 'sklearn' (scikit-learn).
# Estas funções são utilizadas para avaliar o desempenho de modelos de classificação,
# comparando as previsões feitas pelo modelo com os valores reais da variável alvo no conjunto de teste.
# - 'accuracy_score': Calcula a acurácia do modelo, que é a proporção de previsões corretas
#                   em relação ao número total de previsões.
# - 'confusion_matrix': Gera uma matriz de confusão, que é uma tabela que descreve o desempenho
#                     de um classificador em relação aos rótulos verdadeiros. Ela mostra
#                     os verdadeiros positivos, verdadeiros negativos, falsos positivos e falsos negativos.
# - 'classification_report': Produz um relatório de texto que fornece métricas de precisão,
#                          recall, F1-score e suporte para cada classe do problema de classificação.
#                          É uma maneira abrangente de avaliar o desempenho do modelo por classe.
# Ao importar essas funções, tornamos disponível o uso dessas métricas para analisar a qualidade
# das previsões feitas pelo nosso modelo XGBoost.
```

#### 8. Avaliação da Acurácia do Modelo de Sobrevivência:
```python
from sklearn.metrics import accuracy_score
# Importa a função 'accuracy_score' do módulo 'metrics' da biblioteca 'sklearn'.
# Esta função calcula a acurácia, que representa a proporção de previsões corretas
# feitas pelo modelo em relação ao número total de amostras no conjunto de teste.

accuracy = accuracy_score(y_test_survival, y_pred_survival)
# Chama a função 'accuracy_score' para calcular a acurácia do modelo.
# - 'y_test_survival': Contém os rótulos verdadeiros (os valores reais da variável alvo 'Survival_Status')
#                    para as amostras no conjunto de teste.
# - 'y_pred_survival': Contém as previsões de classe (0 ou 1 para não sobrevivência ou sobrevivência)
#                    feitas pelo modelo para as mesmas amostras no conjunto de teste.
# O resultado da função, que é o valor da acurácia, é armazenado na variável 'accuracy'.

print(f"Acurácia do modelo: {accuracy}")
# Imprime o valor da acurácia do modelo formatado em uma string.
# Esta saída informa a porcentagem de vezes que o modelo fez a previsão correta sobre a sobrevivência dos pacientes no conjunto de teste.
# A acurácia é uma métrica geral de desempenho, mas sua interpretação pode depender do balanceamento das classes no conjunto de dados.
```
Resulado: Acurácia do modelo: 0.7468452943465451
#### 9. Geração do Relatório de Classificação para Avaliação Detalhada do Modelo de Sobrevivência:

```python
from sklearn.metrics import classification_report
# Importa a função 'classification_report' do módulo 'metrics' da biblioteca 'sklearn'.
# Esta função gera um relatório de texto que fornece métricas de avaliação detalhadas
# para cada classe do problema de classificação. As métricas incluem precisão, recall,
# F1-score e suporte (o número de ocorrências reais de cada classe).

report = classification_report(y_test_survival, y_pred_survival)
# Chama a função 'classification_report' para gerar o relatório.
# - 'y_test_survival': Contém os rótulos verdadeiros (os valores reais da variável alvo)
#                    para as amostras no conjunto de teste.
# - 'y_pred_survival': Contém as previsões de classe feitas pelo modelo para as mesmas amostras.
# A função compara os rótulos verdadeiros com as previsões e calcula as métricas de desempenho para cada classe.
# O relatório gerado é armazenado na variável 'report' como uma string.

print("Relatório de Classificação:")
# Imprime um cabeçalho indicando que a saída a seguir é o relatório de classificação.

print(report)
# Imprime o relatório de classificação. Este relatório fornece uma visão detalhada
# do desempenho do modelo para cada classe individualmente, incluindo:
# - Precisão: Das amostras que o modelo classificou como pertencentes a uma classe,
#             qual proporção realmente pertence a essa classe.
# - Recall: De todas as amostras que realmente pertencem a uma classe,
#           qual proporção o modelo conseguiu classificar corretamente.
# - F1-score: A média harmônica ponderada da precisão e do recall.
# - Support: O número de amostras reais de cada classe no conjunto de teste.
# Além das métricas por classe, o relatório também inclui médias ponderadas e macro dessas métricas.

Relatório de Classificação:
              precision    recall  f1-score   support

         0.0       0.25      0.01      0.02      4471
         1.0       0.75      0.99      0.85     13518

    accuracy                           0.75     17989
   macro avg       0.50      0.50      0.44     17989
weighted avg       0.63      0.75      0.65     17989
```
#### 10. Visualização da Matriz de Confusão com Yellowbrick para Avaliação do Modelo de Sobrevivência:
```python
from yellowbrick.classifier import ConfusionMatrix
# Importa a classe 'ConfusionMatrix' do módulo 'classifier' da biblioteca 'yellowbrick'.
# Esta classe fornece uma representação visual da matriz de confusão, facilitando a análise
# do desempenho de um classificador ao exibir as contagens de verdadeiros positivos,
# verdadeiros negativos, falsos positivos e falsos negativos.

import matplotlib.pyplot as plt
# Importa o módulo 'pyplot' da biblioteca 'matplotlib', essencial para exibir gráficos e visualizações
# geradas por outras bibliotecas, como o Yellowbrick.

# Supondo que 'model' seja sua instância treinada do XGBClassifier
# Este comentário assume que você já treinou um modelo XGBoost e o armazenou na variável 'model'.
cm = ConfusionMatrix(model, classes=['Não Sobreviveu', 'Sobreviveu']) # Adapte os nomes das classes se necessário
# Cria uma instância do visualizador 'ConfusionMatrix' do Yellowbrick.
# - 'model': O classificador XGBoost previamente treinado que será avaliado.
# - 'classes': Uma lista opcional contendo os nomes das classes alvo. Isso melhora a legibilidade
#              do gráfico, rotulando os eixos corretamente. Certifique-se de que a ordem corresponde
#              à ordem das classes nos seus dados alvo (por exemplo, 0 e 1).

# Ajuste o visualizador aos dados de treinamento
# Este comentário indica a etapa de "ajuste" do visualizador aos dados de treinamento.
cm.fit(X_train_survival, y_train_survival)
# O método 'fit()' do visualizador 'ConfusionMatrix' recebe os dados de treinamento.
# Embora a matriz de confusão seja avaliada nos dados de teste, o visualizador pode usar
# as informações dos dados de treinamento (como as classes presentes) para configurar a visualização.

# Avalie o modelo nos dados de teste usando o visualizador e exiba a matriz de confusão
# Este comentário descreve a etapa de avaliação do modelo nos dados de teste e a exibição da matriz.
cm.score(X_test_survival, y_test_survival)
# O método 'score()' do visualizador 'ConfusionMatrix' recebe os dados de teste e os rótulos verdadeiros.
# Ele usa o modelo treinado para fazer previsões nos dados de teste e então compara essas
# previsões com os rótulos verdadeiros para calcular e exibir a matriz de confusão visualmente.

cm.show() # Ou plt.show()
# Exibe a visualização da matriz de confusão gerada pelo Yellowbrick.
# 'cm.show()' é um método específico do Yellowbrick para mostrar a figura.
# Alternativamente, 'plt.show()' do matplotlib também pode ser usado para exibir a figura.
```
![Matriz de confusão](https://github.com/ICEI-PUC-Minas-PMV-SI/PMV-SI-2025-1-PE7-T1-Cancer-Colorretal/blob/main/docs/img/Matriz%20de%20confusao.png)

##### Viés do Modelo na Previsão de Sobrevivência: Análise da Matriz de Confusão e o Impacto dos Falsos Positivos

* Verdadeiros Negativos (TN): 41

O modelo previu que 41 pacientes não sobreviveram, e eles realmente não sobreviveram.

* Falsos Positivos (FP): 4430

O modelo previu que 4430 pacientes sobreviveram, mas na verdade não sobreviveram. Este é um número muito alto de erros do Tipo I.

* Falsos Negativos (FN): 124

O modelo previu que 124 pacientes não sobreviveram, mas na verdade sobreviveram. Este é um número relativamente baixo de erros do Tipo II em comparação com os Falsos Positivos.

* Verdadeiros Positivos (TP): 13394

O modelo previu que 13394 pacientes sobreviveram, e eles realmente sobreviveram. Este é o maior número na matriz.
Interpretação Preliminar:

O modelo parece ter uma forte tendência a prever que os pacientes sobreviverão (alto número de Verdadeiros Positivos), mas também comete muitos erros ao classificar pacientes que não sobreviveram como sobreviventes (altíssimo número de Falsos Positivos).

O número de Verdadeiros Negativos é muito baixo em comparação com o número de Falsos Positivos, indicando que o modelo tem dificuldade em identificar corretamente os pacientes que não sobreviveram.

O número de Falsos Negativos é relativamente baixo, o que significa que o modelo não erra tanto ao prever que um paciente que sobreviveu, na verdade não sobreviveu.


#### 11. Avaliação Abrangente do Modelo XGBoost para Sobrevivência com Validação Cruzada (Acurácia, Precisão, Recall e F1-Score Simultaneamente):
```python
from sklearn.model_selection import StratifiedKFold, cross_validate
# Importa as ferramentas necessárias para realizar a validação cruzada estratificada
# ('StratifiedKFold') e para avaliar o desempenho do modelo com múltiplas métricas
# simultaneamente ('cross_validate') do scikit-learn.

from xgboost import XGBClassifier
# Importa a classe 'XGBClassifier' da biblioteca xgboost, que implementa o algoritmo de
# Gradient Boosting, um método poderoso para tarefas de classificação.

# Dados (X, y_survival já definidos)
# Este comentário assume que você já preparou suas variáveis independentes ('X')
# e a variável dependente para sobrevivência ('y_survival'). 'X' deve conter as
# features para o modelo, e 'y_survival' deve conter os rótulos de sobrevivência (e.g., 0 e 1).

# Modelo
modelo = XGBClassifier(objective='binary:logistic', random_state=42)
# Cria uma instância do classificador XGBoost.
# - 'objective='binary:logistic'': Especifica a função objetivo para problemas de
#   classificação binária, que retornará probabilidades para as classes.
# - 'random_state=42': Define uma semente para o gerador de números aleatórios,
#   garantindo que os resultados sejam reproduzíveis.

# Estratégia de Validação Cruzada
stratified_kfold = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
# Cria uma instância da estratégia de validação cruzada Stratified K-Fold.
# - 'n_splits=5': Define o número de folds (partes) em que os dados serão divididos.
#   Neste caso, serão 5 folds.
# - 'shuffle=True': Embaralha os dados antes de dividi-los em folds para reduzir o
#   impacto da ordem dos dados.
# - 'random_state=42': Define uma semente para o embaralhamento, garantindo a
#   reprodutibilidade da divisão.
# O Stratified K-Fold mantém a proporção das classes em cada fold, sendo ideal para
# conjuntos de dados potencialmente desbalanceados.

# Avaliando múltiplas métricas com cross_validate
scoring = ['accuracy', 'precision', 'recall', 'f1']
# Define uma lista das métricas que serão avaliadas durante a validação cruzada:
# - 'accuracy': Proporção de previsões corretas.
# - 'precision': Das previsões positivas, quantas foram realmente corretas (TP / (TP + FP)).
# - 'recall': De todas as instâncias positivas reais, quantas foram corretamente identificadas (TP / (TP + FN)).
# - 'f1': Média harmônica de precisão e recall, útil para equilibrar as duas métricas.

resultados = cross_validate(modelo, X, y_survival, cv=stratified_kfold, scoring=scoring, return_train_score=False)
# Utiliza a função 'cross_validate' para realizar a validação cruzada e avaliar múltiplas métricas.
# - 'modelo': O classificador XGBoost a ser avaliado.
# - 'X': As features do conjunto de dados.
# - 'y_survival': A variável alvo de sobrevivência.
# - 'cv=stratified_kfold': Especifica a estratégia de validação cruzada estratificada.
# - 'scoring=scoring': Define a lista de métricas a serem calculadas.
# - 'return_train_score=False': Indica que não queremos os scores no conjunto de treinamento.
# A função retorna um dicionário contendo arrays com os scores para cada métrica em cada fold.

print("Resultados da Validação Cruzada:")
# Imprime um cabeçalho para os resultados da validação cruzada.

print(f"Acurácia média: {resultados['test_accuracy'].mean():.4f}")
# Imprime a média da acurácia obtida nos diferentes folds. 'resultados['test_accuracy']'
# contém um array com os scores de acurácia para cada fold. '.mean()' calcula a média.
# '{:.4f}' formata a saída para quatro casas decimais.

print(f"Precisão média: {resultados['test_precision'].mean():.4f}")
# Imprime a média da precisão obtida nos diferentes folds.

print(f"Recall médio: {resultados['test_recall'].mean():.4f}")
# Imprime a média do recall obtido nos diferentes folds.

print(f"F1-Score médio: {resultados['test_f1'].mean():.4f}")
# Imprime a média do F1-Score obtido nos diferentes folds.

Resultados da Validação Cruzada:
Acurácia média: 0.7441
Precisão média: 0.7487
Recall médio: 0.9909
F1-Score médio: 0.8529
```
##### Explicação das Métricas de Avaliação do Modelo de Sobrevivência (Validação Cruzada):

<p align="justify">As métricas que você obteve através da validação cruzada fornecem diferentes perspectivas sobre o desempenho do seu modelo XGBoost na tarefa de prever a sobrevivência (assumindo que a classe positiva seja "Sobreviveu"). Vamos detalhar cada uma delas:</p>

1. Precisão Média (Validação Cruzada): 0.7487

<p align="justify">Serve para: Avaliar a qualidade das previsões positivas feitas pelo modelo. Especificamente, ela responde à pergunta: "De todos os pacientes que o modelo previu que sobreviveriam, qual proporção realmente sobreviveu?".
Função: Calcula a média da precisão obtida em cada fold da validação cruzada. A precisão é definida como:
Precisão = Verdadeiros Positivos (TP) / (Verdadeiros Positivos (TP) + Falsos Positivos (FP))
Verdadeiros Positivos (TP): Pacientes que realmente sobreviveram e foram corretamente previstos como sobreviventes.

<p align="justify">Falsos Positivos (FP): Pacientes que não sobreviveram, mas foram incorretamente previstos como sobreviventes.
Interpretação: Uma precisão média de 0.7487 (ou 74.87%) sugere que, em média, cerca de 74.87% das vezes que o modelo previu que um paciente sobreviveria, essa previsão estava correta. Os restantes 25.13% das previsões de sobrevivência foram de pacientes que, na verdade, não sobreviveram.

2. Recall Médio (Validação Cruzada): 0.9909

<p align="justify">Serve para: Avaliar a capacidade do modelo de encontrar todas as instâncias positivas reais. Em outras palavras, responde à pergunta: "De todos os pacientes que realmente sobreviveram, qual proporção o modelo conseguiu identificar corretamente?".</p>
     
<p align="justify"> Função: Calcula a média do recall (também conhecido como sensibilidade ou taxa de verdadeiros positivos) obtido em cada fold da validação cruzada. O recall é definido como:</p>

<p align="justify">Recall = Verdadeiros Positivos (TP) / (Verdadeiros Positivos (TP) + Falsos Negativos (FN))
Falsos Negativos (FN): Pacientes que realmente sobreviveram, mas foram incorretamente previstos como não sobreviventes.
Interpretação: Um recall médio de 0.9909 (ou 99.09%) indica que, em média, o modelo conseguiu identificar corretamente aproximadamente 99.09% de todos os pacientes que realmente sobreviveram. Isso sugere uma alta sensibilidade do modelo para a classe "Sobreviveu", cometendo poucos erros ao classificar um paciente sobrevivente como não sobrevivente.</p>

3. F1-Score Médio (Validação Cruzada): 0.8529

<p align="justify">Serve para: Fornecer uma métrica única que equilibra a precisão e o recall. É especialmente útil quando há um desequilíbrio entre as classes. O F1-Score tenta encontrar um bom compromisso entre a capacidade do modelo de não rotular erroneamente a classe negativa como positiva (precisão) e sua capacidade de encontrar todas as instâncias positivas (recall).</p>

<p align="justify">Função: Calcula a média do F1-Score obtido em cada fold da validação cruzada. O F1-Score é a média harmônica da precisão e do recall:</p>
<p align="justify">F1-Score = 2 * (Precisão * Recall) / (Precisão + Recall)
Interpretação: Um F1-Score médio de 0.8529 (ou 85.29%) representa um bom equilíbrio entre a precisão e o recall para a classe "Sobreviveu". Ele sugere que o modelo tem um desempenho razoavelmente bom tanto em não fazer previsões falsas de sobrevivência quanto em identificar a maioria dos pacientes que realmente sobreviveram.</p>

4. Acurácia Média (Validação Cruzada): 0.7441

<p align="justify">Serve para: Avaliar a proporção geral de previsões corretas (tanto para a classe "Sobreviveu" quanto para a classe "Não Sobreviveu") em relação ao número total de amostras. Responde à pergunta: "De todos os pacientes no conjunto de dados, qual proporção o modelo classificou corretamente?".</p>
     
<p align="justify">Função: Calcula a média da acurácia obtida em cada fold da validação cruzada. A acurácia é definida como:
Acurácia = (Verdadeiros Positivos (TP) + Verdadeiros Negativos (TN)) / (Total de Amostras)</p>
<p align="justify">FVerdadeiros Negativos (TN): Pacientes que realmente não sobreviveram e foram corretamente previstos como não sobreviventes.
Interpretação: Uma acurácia média de 0.7441 (ou 74.41%) indica que, em média, o modelo classificou corretamente cerca de 74.41% de todos os pacientes no conjunto de dados nos diferentes folds da validação cruzada.</p>

## Naive Bayes

<p align="justify">O Naive Bayes é um algoritmo de classificação baseado no Teorema de Bayes com uma suposição "ingênua" de independência entre as variáveis preditoras. Ele calcula a probabilidade de uma instância pertencer a uma determinada classe com base nas características observadas, assumindo que essas características são estatisticamente independentes entre si.</p>

<p align="justify">O Naive Bayes é amplamente utilizado por sua simplicidade, eficiência e bom desempenho em várias aplicações, especialmente em classificação de texto. Ele se destaca pelas seguintes características:</p>

* **Baixo custo computacional**, com treinamento e previsão extremamente rápidos.  
* **Desempenho eficiente** mesmo em bases de dados com alta dimensionalidade.  
* **Funciona bem** com pequenos conjuntos de dados rotulados.  
* **Simples de implementar** e interpretar os resultados.  
* **Robustez** em problemas com ruído e irrelevância em algumas features.  
* **Aplicação natural** em modelos probabilísticos e análise bayesiana.  
* **Suporte a diferentes variações**, como Bernoulli, Multinomial e Gaussiano, adaptando-se ao tipo de dado.  

### Estratégias de Modelagem com Naive Bayes

<p align="justify">Foram implementadas e comparadas três abordagens distintas utilizando o classificador <strong>Naive Bayes</strong>:</p>

1. **Modelo Base (Sem Balanceamento)**  
   <p align="justify">Aplicação direta do Naive Bayes no conjunto de dados original, sem qualquer técnica de balanceamento das classes.</p>

2. **Naive Bayes com Oversampling (SMOTE)**  
   <p align="justify">Utilização da técnica de oversampling com <strong>SMOTE (Synthetic Minority Over-sampling Technique)</strong> para balancear as classes antes do treinamento do modelo.</p>

3. **Naive Bayes com Undersampling**  
   <p align="justify">Aplicação da técnica de <strong>undersampling</strong> utilizando o <strong>RandomUnderSampler</strong>, reduzindo a quantidade de amostras da classe majoritária para equilibrar o conjunto de dados.</p>

<p align="justify">Cada uma dessas abordagens foi avaliada com base em métricas de desempenho como <strong>acurácia</strong>, <strong>precisão</strong>, <strong>recall</strong>, <strong>F1-score</strong>, <strong>acurácia balanceada</strong> e <strong>G-mean</strong>, com o objetivo de entender os impactos das técnicas de balanceamento na performance do modelo.</p>


### 1 - Naive Bayes sem balanceamento

#### 1.1 Preparação da Variável Alvo (target)


```python
target_var = 'Survival_Status'
y = df[target_var].copy()
if y.dtype == 'O':
    y = y.astype(str)
    y = y.map({label: idx for idx, label in enumerate(sorted(y.unique()))})
Define a variável alvo do modelo: Survival_Status.
```

<p align="justify"> Define a variável alvo do modelo: <code>Survival_Status</code>. Se a variável for categórica (<code>dtype == 'O'</code>), ela é convertida para string e depois mapeada para números (ex.: 'Sim' → 1, 'Não' → 0). Isso é necessário porque modelos do scikit-learn trabalham com números. </p>

#### 1.2 Separação em treino e teste
```python
X_train, X_test, y_train, y_test = train_test_split(
    preprocessed_df, y, test_size=0.2, random_state=42, stratify=y
)
```

<p align="justify"> Divide os dados em treino (80%) e teste (20%), estratificando com base em <code>y</code>, para garantir que a proporção de classes seja mantida nas duas amostras. <code>preprocessed_df</code> é o conjunto de variáveis independentes (features), já pré-processado. </p>

preprocessed_df é o conjunto de variáveis independentes (features), já pré-processado.

 #### 1.3 Treinamento do modelo Naive Bayes
```python
Copy
Edit
modelo = GaussianNB()
modelo.fit(X_train, y_train)
<p align="justify"> Cria um modelo <code>GaussianNB</code> (Naive Bayes Gaussiano, assume que os dados seguem uma distribuição normal para cada atributo). Treina o modelo com os dados de treino. </p>

Treina o modelo com os dados de treino.

#### 1.4 Predições
```python
y_pred = modelo.predict(X_test)
y_prob = modelo.predict_proba(X_test)[:, 1] if len(modelo.classes_) == 2 else None
```
<p align="justify"> <code>y_pred</code>: Previsões de classe (0 ou 1). <code>y_prob</code>: Probabilidades da classe positiva (usado para ROC), somente se for um problema binário. </p>

#### 1.5 Relatório de Métricas
```python

print("\n=== Relatório de Classificação ===")
print(classification_report(y_test, y_pred))
```
<p align="justify"> Imprime precisão, recall, f1-score e suporte (nº de instâncias por classe), para cada classe. </p>

#### 1.6 Cálculo e impressão de métricas personalizadas
```python
acc = accuracy_score(y_test, y_pred)
prec = precision_score(y_test, y_pred, average='binary')
rec = recall_score(y_test, y_pred, average='binary')
f1 = f1_score(y_test, y_pred, average='binary')
bal_acc = balanced_accuracy_score(y_test, y_pred)
gmean_score = gmean([prec, rec]) if prec > 0 and rec > 0 else 0
```

<p align="justify"> Calcula diversas métricas:<br> <strong>accuracy</strong>: Proporção total de acertos.<br> <strong>precision</strong>: Quantos dos positivos previstos são realmente positivos.<br> <strong>recall</strong>: Quantos dos positivos reais foram encontrados.<br> <strong>f1-score</strong>: Média harmônica entre precisão e recall.<br> <strong>balanced_accuracy</strong>: Média entre a acurácia da classe positiva e negativa (evita viés em classes desbalanceadas).<br> <strong>gmean</strong>: Média geométrica entre precisão e recall (mede o equilíbrio entre eles). </p>

#### 1.7 Impressão das métricas
```python
print(f"Accuracy: {acc:.4f}")
print(f"Precision: {prec:.4f}")
print(f"Recall: {rec:.4f}")
print(f"F1-score: {f1:.4f}")
print(f"Balanced Accuracy: {bal_acc:.4f}")
print(f"Geometric Mean Accuracy: {gmean_score:.4f}")
```
<p align="justify"> Exibe todas as métricas de forma formatada. </p>

 #### 1.8 Matriz de Confusão
```python
cm = confusion_matrix(y_test, y_pred)
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', xticklabels=modelo.classes_, yticklabels=modelo.classes_)
```

<p align="justify"> Gera uma matriz de confusão mostrando:<br> <strong>Verdadeiros Positivos (VP)</strong><br> <strong>Falsos Positivos (FP)</strong><br> <strong>Verdadeiros Negativos (VN)</strong><br> <strong>Falsos Negativos (FN)</strong><br><br> Essa matriz mostra como o modelo está errando e acertando. </p>


#### 1.9 Curva ROC (caso binário)
```python
if y_prob is not None:
    fpr, tpr, thresholds = roc_curve(y_test, y_prob)
    auc_score = roc_auc_score(y_test, y_prob)
```

<p align="justify"> Calcula a curva ROC (True Positive Rate vs False Positive Rate) e área sob a curva (AUC).<br> A AUC indica o poder discriminativo do modelo (quanto mais próximo de 1.0, melhor). </p>

#### 1.10 Salvamento dos gráficos
```python
plt.savefig("graphs/confusion_matrix_naive_bayes.png")
...
plt.savefig("graphs/roc_curve_naive_bayes.png")
```

<p align="justify"> Os gráficos gerados são salvos no diretório especificado para posterior análise ou apresentação. </p>

### Resultados

#### Relatório de Classificação

| Classe | Precisão (Precision) | Revocação (Recall) | F1-Score | Suporte (Support) |
|--------|----------------------|--------------------|----------|-------------------|
| 0      | 0.00                 | 0.00               | 0.00     | 4521              |
| 1      | 0.75                 | 1.00               | 0.86     | 13468             |

**Acurácia Total**: 0.75  
**Média Macro**:
- Precisão: 0.37
- Revocação: 0.50
- F1-Score: 0.43

**Média Ponderada**:
- Precisão: 0.56
- Revocação: 0.75
- F1-Score: 0.64

#### Métricas Adicionais

- **Accuracy**: 0.7487  
- **Precision**: 0.7487  
- **Recall**: 1.0000  
- **F1-score**: 0.8563  
- **Balanced Accuracy**: 0.5000  
- **Geometric Mean Accuracy**: 0.8653  


<div align="center"> 
   <img src="https://github.com/user-attachments/assets/bdebaa8f-0d4b-4819-816c-7ffa7de50546" alt="Matriz de Confusão - Naive Bayes" width="500">
</div>

<div align="center"> 
   <img src="https://github.com/user-attachments/assets/5b3615f3-e559-48d7-a56b-0df88219e72b" alt="Curva ROC -  Naive Bayes" width="500"> 
</div>


<br>
<br>

---

### 2 - Descrição do Código (Naive Bayes Oversampling) 

#### 2.1 Importação do SMOTE

```python
from imblearn.over_sampling import SMOTE
```

<p>O <strong>SMOTE (Synthetic Minority Over-sampling Technique)</strong> é uma técnica de oversampling que gera exemplos sintéticos para a classe minoritária com base nos seus vizinhos mais próximos. Essa abordagem é útil para mitigar o problema de desbalanceamento de classes em conjuntos de dados.</p>


#### 2.2 Preparação das variáveis

```python
target_var = 'Survival_Status'
y = df[target_var].copy()
if y.dtype == 'O':
    y = y.astype(str)
    y = y.map({label: idx for idx, label in enumerate(sorted(y.unique()))})
```

<p>Seleciona a variável alvo <code>Survival_Status</code> e, se necessário, realiza a conversão de valores categóricos para numéricos, facilitando o treinamento do modelo.</p>


#### 2.3 Divisão em treino e teste

```python
X_train, X_test, y_train, y_test = train_test_split(
    preprocessed_df, y, test_size=0.2, random_state=42, stratify=y
)
```

<p>Os dados são divididos em treino e teste utilizando <code>train_test_split</code> com estratificação, o que garante a mesma proporção de classes em ambos os conjuntos.</p>


#### 2.4 Aplicação do SMOTE (Oversampling)

```python
smote = SMOTE(random_state=42)
X_train_resampled, y_train_resampled = smote.fit_resample(X_train, y_train)
```

<p>O SMOTE é aplicado exclusivamente ao conjunto de treino para gerar amostras sintéticas da classe minoritária, <strong>evitando vazamento de dados</strong> para o conjunto de teste.</p>

#### 2.5 Treinamento com Naive Bayes

```python
modelo = GaussianNB()
modelo.fit(X_train_resampled, y_train_resampled)
y_pred = modelo.predict(X_test)
y_prob = modelo.predict_proba(X_test)[:, 1] if len(modelo.classes_) == 2 else None
```

<p>O classificador <strong>Naive Bayes Gaussiano</strong> é treinado com os dados balanceados e realiza a predição sobre o conjunto de teste. Quando o problema é binário, também é calculada a probabilidade associada à classe positiva.</p>


#### 2.6 Avaliação do Modelo

```python
print(classification_report(y_test, y_pred))
```

Métricas principais:

- **Accuracy**: Proporção de acertos.
- **Precision**: Precisão para a classe positiva.
- **Recall**: Sensibilidade (quantos positivos reais foram identificados).
- **F1-score**: Média harmônica entre precisão e recall.
- **Balanced Accuracy**: Média entre sensitividade e especificidade.
- **Geometric Mean (gmean)**: Média geométrica entre precisão e recall.


#### 2.7 Matriz de Confusão

```python
sns.heatmap(confusion_matrix(y_test, y_pred), annot=True, fmt='d', cmap='Blues')
```

<p>A <strong>matriz de confusão</strong> permite avaliar visualmente os acertos e erros do modelo, separando verdadeiros e falsos positivos/negativos.</p> <p align="center"> <img src="https://github.com/user-attachments/assets/cca27b0e-1a0f-49b4-ba46-4f23afd98469" width="500"> </p>

#### 2.8 Curva ROC e AUC

```python
fpr, tpr, thresholds = roc_curve(y_test, y_prob)
auc_score = roc_auc_score(y_test, y_prob)
```

<p>A <strong>curva ROC</strong> relaciona a taxa de verdadeiros positivos (TPR) com a taxa de falsos positivos (FPR), e a <strong>AUC</strong> representa a capacidade do modelo em distinguir entre as classes.</p> <p align="center"> <img src="https://github.com/user-attachments/assets/44f124c2-0320-4de4-a484-548f4ee7b660" width="500"> </p>

### Resultados: Relatório de Classificação

#### Métricas por Classe

| Classe | Precisão (`precision`) | Revocação (`recall`) | F1-score | Suporte |
|--------|------------------------|-----------------------|----------|---------|
| 0      | 0.25                   | 0.52                  | 0.34     | 4,521   |
| 1      | 0.75                   | 0.48                  | 0.58     | 13,468  |

#### Médias Globais

| Tipo de Média   | Precisão | Revocação | F1-score | Suporte |
|-----------------|----------|-----------|----------|---------|
| Macro média     | 0.50     | 0.50      | 0.46     | 17,989  |
| Média ponderada | 0.62     | 0.49      | 0.52     | 17,989  |

#### Métricas Agregadas

| Métrica                  | Valor   |
|--------------------------|---------|
| Acurácia (`accuracy`)    | 0.4889  |
| Precisão (classe 1)      | 0.7490  |
| Revocação (classe 1)     | 0.4774  |
| F1-score (classe 1)      | 0.5831  |
| Acurácia Balanceada      | 0.5003  |
| Geometric Mean Accuracy  | 0.5979  |

<br>
<br> 

### 3 - Descrição do Código (Naive Bayes Undersampling) 

<p align="center"> Este experimento visa desenvolver um modelo de classificação para a variável <code>Survival_Status</code> utilizando a técnica de balanceamento por Undersampling. Para isso, foi empregada a biblioteca <code>imblearn</code> e o classificador probabilístico <code>GaussianNB</code>, considerando um conjunto de dados originalmente desbalanceado.</p>


#### 3.1  Conversão da Variável Alvo

```python
target_var = 'Survival_Status'
y = df[target_var].copy()
if y.dtype == 'O':
    y = y.astype(str)
    y = y.map({label: idx for idx, label in enumerate(sorted(y.unique()))})
```
<p align="center"> A variável-alvo <code>Survival_Status</code> é copiada do DataFrame principal. Caso seus valores sejam do tipo <code>object</code> (strings), realiza-se a codificação de rótulos (label encoding), atribuindo valores numéricos distintos para cada categoria. Essa transformação é fundamental, pois os algoritmos de machine learning não operam diretamente com dados categóricos. </p>

#### 3.2 Divisão dos Dados com Estratificação

```python
X_train, X_test, y_train, y_test = train_test_split(
    preprocessed_df, y, test_size=0.2, random_state=42, stratify=y
)
```

#### 3.3 Aplicação de Undersampling

```python
under = RandomUnderSampler(random_state=42)
X_train_resampled, y_train_resampled = under.fit_resample(X_train, y_train)
```
<p align="center"> O <code>RandomUnderSampler</code> é aplicado apenas ao conjunto de treino. Ele reduz aleatoriamente o número de amostras da classe majoritária até que haja equilíbrio entre as classes. Essa técnica combate o viés que o modelo poderia desenvolver ao priorizar a classe mais frequente. </p>


#### 3.4 Treinamento do Modelo com Naive Bayes

```python
modelo = GaussianNB()
modelo.fit(X_train_resampled, y_train_resampled)
```

#### 3.5 Predição e Cálculo das Probabilidades

```python
y_pred = modelo.predict(X_test)
y_prob = modelo.predict_proba(X_test)[:, 1] if len(modelo.classes_) == 2 else None
```

#### 3.6 Avaliação do Modelo

```python
print(classification_report(y_test, y_pred))
```
<p align="center"> A avaliação inclui a geração do relatório de classificação com métricas como precisão, recall e f1-score. Adicionalmente, métricas agregadas são calculadas manualmente, fornecendo uma análise mais abrangente. </p>

```python
acc = accuracy_score(y_test, y_pred)
prec = precision_score(y_test, y_pred, average='binary')
rec = recall_score(y_test, y_pred, average='binary')
f1 = f1_score(y_test, y_pred, average='binary')
bal_acc = balanced_accuracy_score(y_test, y_pred)
gmean_score = gmean([prec, rec]) if prec > 0 and rec > 0 else 0
```

#### 3.7 Matriz de Confusão

```python
sns.heatmap(confusion_matrix(y_test, y_pred), annot=True, fmt='d', cmap='Oranges')
```
<p align="center"> A matriz de confusão mostra a distribuição dos acertos e erros do modelo. Essa visualização é crucial para entender o comportamento do classificador em contextos desbalanceados. </p> <p align="center"> <img src="https://github.com/user-attachments/assets/eed9f502-e0b4-47a1-9960-797ddd367f3f" alt="Matriz de Confusão" width="500"> </p>


#### 3.8 Matriz de Confusão

```python
fpr, tpr, thresholds = roc_curve(y_test, y_prob)
auc_score = roc_auc_score(y_test, y_prob)
```

<p align="center"> A curva ROC demonstra a capacidade do modelo em distinguir entre classes positivas e negativas. A AUC (área sob a curva) é um indicador da qualidade geral do classificador — quanto mais próxima de 1, melhor. </p> <p align="center"> <img src="https://github.com/user-attachments/assets/5588379b-10a8-43e0-aee2-bd61a5126475" alt="Curva ROC" width="500"> </p>


### Resultados:

#### Relatório de Classificação
| Classe         | Precision | Recall | F1-score | Support |
|----------------|-----------|--------|----------|---------|
| 0              | 0.26      | 0.61   | 0.36     | 4521    |
| 1              | 0.76      | 0.41   | 0.53     | 13468   |
| **Accuracy**   |           |        | 0.46     | 17989   |
| Macro avg      | 0.51      | 0.51   | 0.44     | 17989   |
| Weighted avg   | 0.63      | 0.46   | 0.49     | 17989   |

| Métrica                  | Valor   |
|--------------------------|---------|
| Accuracy                 | 0.4572  |
| Precision (Classe 1)     | 0.7568  |
| Recall (Classe 1)        | 0.4051  |
| F1-score (Classe 1)      | 0.5277  |
| Balanced Accuracy        | 0.5087  |
| Geometric Mean Accuracy  | 0.5537  |


<br>
<br> 

---


###  Resumo das Três Abordagens com Naive Bayes

| Estratégia         | Accuracy | Precision | Recall  | F1-score | Balanced Accuracy | Geometric Mean |
|--------------------|----------|-----------|---------|----------|--------------------|----------------|
| 🔵 Sem Balanceamento | 0.7487   | 0.7487    | 1.0000  | 0.8563   | 0.5000             | 0.8653         |
| 🟢 Oversampling      | 0.4889   | 0.7490    | 0.4774  | 0.5831   | 0.5003             | 0.5979         |
| 🔴 Undersampling     | 0.4572   | 0.7568    | 0.4051  | 0.5277   | 0.5087             | 0.5537         |

---

####  Interpretação das Métricas

### 🔵 Sem Balanceamento (Naive Bayes Puro)

- **Precision = 0.7487** → O modelo acerta bem quando prevê sobrevivência (classe 1).
- **Recall = 1.0000** → Identificou *todos* os pacientes sobreviventes.
- **F1-score = 0.8563** → Excelente equilíbrio entre precisão e recall.
- **Balanced Accuracy = 0.5000** → Mostra que a classe 0 (não sobreviveu) está sendo ignorada.
-  **Confusão**: o modelo classificou todos os casos como classe 1.

 **Conclusão**:  
O modelo adota uma estratégia conservadora, classificando todos os casos como sobreviventes. Embora essa abordagem possa parecer eficaz para triagens iniciais, **ela falha completamente na identificação dos indivíduos que não sobrevivem**, o que pode representar um **risco significativo em contextos médicos**.

---

### 🟢 Com Oversampling (SMOTE)

- **Precision = 0.7490**
- **Recall = 0.4774**
- **F1-score = 0.5831**
- **G-Mean = 0.5979**
- **Balanced Accuracy = 0.5003**

 **Conclusão**:  
A técnica SMOTE contribuiu para que o modelo **reconhecesse ambas as classes**, preservando todas as amostras originais e atenuando o desbalanceamento dos dados. Embora ainda existam erros, o modelo demonstra maior equidade na previsão das classes.

---

### 🔴 Com Undersampling

- **Recall = 0.4051**
- **Precision = 0.7568**
- **F1-score = 0.5277**
- **G-Mean = 0.5537**

**Conclusão**:  
A remoção de dados da classe majoritária resultou em desempenho inferior. **Reduzir a quantidade de dados implica perda de informação**, o que dificulta o processo de aprendizado do modelo.

---

###  Qual foi o melhor resultado?

| Objetivo Prioritário                               | Melhor Estratégia                         |
|----------------------------------------------------|--------------------------------------------|
| Máxima detecção de sobreviventes (Recall)          | ✅ Sem balanceamento (Recall = 1.00)        |
| Equilíbrio entre as classes                        | 🟢 Oversampling (melhor G-Mean e Balance)  |
| Preservar todos os dados                           | 🟢 Oversampling (mantém todas as instâncias)|

---


# Avaliação dos modelos criados

## Métricas utilizadas

<p align="justify">As métricas calculadas foram Acurácia (percentual de previsões corretas no total), Precisão (quão correto o modelo foi ao prever a sobrevivência), Recall (quantidade de casos de sobrevivência corretamente identificados) e F1-Score (harmonização entre Precisão e Recall). De modo geral, os valores de Acurácia e F1-Score mantiveram-se bastante elevados para todos os modelos, com destaque para o Naive Bayes, que apresentou recall de 100% em todas as divisões dos dados, enquanto Random Forest e XGBoost tiveram uma leve queda de desempenho conforme a proporção de teste aumentava.</p>

## Discussão dos resultados obtidos

<p align="justify">Analisando os resultados gerais, os três modelos obtiveram desempenhos muito bons, com pequenas variações entre eles conforme o volume de dados de teste aumentava. O Random Forest e o XGBoost apresentaram uma pequena perda de desempenho em termos de precisão e F1-Score à medida que a porcentagem de teste aumentava. Já o Naive Bayes se destacou pela consistência: manteve precisão, recall e F1-Score elevados (próximos de 1.0) em todas as divisões de treino/teste, sem apresentar erros (falsos positivos ou falsos negativos) nos dados de validação. Com base nos resultados apresentados, o Naive Bayes foi o método que apresentou o melhor desempenho geral, demonstrando tanto alta capacidade de identificação dos sobreviventes quanto estabilidade nas diferentes proporções de divisão dos dados.</p>

# Pipeline de pesquisa e análise de dados

Em pesquisa e experimentação em sistemas de informação, um pipeline de pesquisa e análise de dados refere-se a um conjunto organizado de processos e etapas que um profissional segue para realizar a coleta, preparação, análise e interpretação de dados durante a fase de pesquisa e desenvolvimento de modelos. Esse pipeline é essencial para extrair _insights_ significativos, entender a natureza dos dados e, construir modelos de aprendizado de máquina eficazes. 

# Vídeo de apresentação da Etapa 03

