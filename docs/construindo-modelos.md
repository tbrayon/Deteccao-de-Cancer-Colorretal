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

<p align="justify">A transformação de dados no seu código envolve imputação de valores ausentes, padronização de dados numéricos, codificação one-hot para dados categóricos e a aplicação dessas transformações usando pipelines e ColumnTransformer. Essas etapas são essenciais para preparar os dados do Datasete Câncer Colorretal, garantindo que ele possa lidar com valores ausentes, diferentes escalas de variáveis e dados categóricos de forma eficaz.</p>

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
