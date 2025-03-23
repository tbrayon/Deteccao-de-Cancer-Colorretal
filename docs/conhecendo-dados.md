# Conhecendo os dados

Nesta seção, deverá ser registrada uma detalhada análise descritiva e exploratória sobre a base de dados selecionada na Etapa 1 com o objetivo de compreender a estrutura dos dados, detectar eventuais _outliers_ e também, avaliar/detectar as relações existentes entre as variáveis analisadas.

Para isso, sugere-se que sejam utilizados cálculos de medidas de tendência central, como média, mediana e moda, para entender a centralidade dos dados; sejam exploradas medidas de dispersão como desvio padrão e intervalos interquartil para avaliar a variabilidade dos dados; sejam utilizados gráficos descritivos como histogramas e box plots, para representar visualmente as características essenciais dos dados, pois essas visualizações podem facilitar a identificação de padrões e anomalias; sejam analisadas as relações entre as variáveis por meio de análise de correlação, gráficos de dispersões, mapas de calor, entre outras técnicas. 

Inclua nesta seção, gráficos, tabelas e demais artefatos que você considere relevantes para entender os dados com os quais você irá trabalhar.  Além disso, inclua e comente os trechos de código mais relevantes desenvolvidos para realizar suas análises. Na pasta "src", inclua o código fonte completo.

### Análise Inicial do Dataset de Predição de Câncer Colorretal
<p align="justify">
Abaixo é apresentada uma análise inicial do dataset <a href="https://www.kaggle.com/datasets/ankushpanday1/colorectal-cancer-risk-and-survival-data">Colorectal Cancer Risk & Survival Data</a>, utilizado para predição de câncer colorretal. O objetivo desta análise é entender a estrutura dos dados, verificar a presença de valores ausentes e preparar o dataset para análises subsequentes e modelagem.
</p>

#### Carregamento e Inspeção dos Dados
<p align="justify">
O dataset foi carregado utilizando bibliotecas do python, e as primeiras etapas envolveram a inspeção das dimensões do DataFrame, nomes das colunas e tipos de dados.</p>

```python
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import textwrap
from scipy.stats import chi2_contingency
import numpy as np
from scipy.stats import spearmanr
import statsmodels.api as sm
from google.colab import drive

# Conectar o Google Drive ao ambiente do Colab.
drive.mount('/content/drive')

# Defina o caminho correto para o arquivo no Google Colab
file_path = "/colorectal_cancer_prediction.xlsx"

# Carregar o dataset diretamente usando pandas
df = pd.read_excel(file_path, dtype=str)
```

Identificando quantidade de linhas e colunas.

```python
# Dimensões do DataFrame (quantidade de linhas e colunas).
print(df.shape)

(89945, 30)
```

#### Limpeza e Preparação Inicial
<p align="justify">
Foram realizadas algumas etapas de limpeza e preparação inicial, como a remoção de espaços em branco nos nomes das colunas e a redefinição do índice do DataFrame.</p>

```python
# Lista todas as colunas do dataframe
# Imprime o índice das colunas
print(df.columns)
# Remove espaços em branco (tanto à esquerda quanto à direita) dos nomes das colunas
df.columns = df.columns.str.strip()
# Converte o índice das colunas do DataFrame df em uma lista Python e a imprime
print(df.columns.tolist())  
# Imprime o índice das linhas
print(df.index)
# Reseta o índice do DataFrame df para o padrão (uma sequência de números inteiros começando em 0) e remove o índice antigo
df = df.reset_index(drop=True)
# Mostra o tipo de informação que cada coluna contém (números, texto, etc.).
print(df.dtypes)

Index(['Patient_ID', 'Age', 'Gender', 'Race', 'Region', 'Urban_or_Rural',
       'Socioeconomic_Status', 'Family_History', 'Previous_Cancer_History',
       'Stage_at_Diagnosis', 'Tumor_Aggressiveness', 'Colonoscopy_Access',
       'Screening_Regularity', 'Diet_Type', 'BMI', 'Physical_Activity_Level',
       'Smoking_Status', 'Alcohol_Consumption', 'Red_Meat_Consumption',
       'Fiber_Consumption', 'Insurance_Coverage', 'Time_to_Diagnosis',
       'Treatment_Access', 'Chemotherapy_Received', 'Radiotherapy_Received',
       'Surgery_Received', 'Follow_Up_Adherence', 'Survival_Status',
       'Recurrence', 'Time_to_Recurrence'],
      dtype='object')
['Patient_ID', 'Age', 'Gender', 'Race', 'Region', 'Urban_or_Rural', 'Socioeconomic_Status', 'Family_History', 'Previous_Cancer_History', 'Stage_at_Diagnosis', 'Tumor_Aggressiveness', 'Colonoscopy_Access', 'Screening_Regularity', 'Diet_Type', 'BMI', 'Physical_Activity_Level', 'Smoking_Status', 'Alcohol_Consumption', 'Red_Meat_Consumption', 'Fiber_Consumption', 'Insurance_Coverage', 'Time_to_Diagnosis', 'Treatment_Access', 'Chemotherapy_Received', 'Radiotherapy_Received', 'Surgery_Received', 'Follow_Up_Adherence', 'Survival_Status', 'Recurrence', 'Time_to_Recurrence']
RangeIndex(start=0, stop=89945, step=1)
Patient_ID                 object
Age                        object
Gender                     object
Race                       object
Region                     object
Urban_or_Rural             object
Socioeconomic_Status       object
Family_History             object
Previous_Cancer_History    object
Stage_at_Diagnosis         object
Tumor_Aggressiveness       object
Colonoscopy_Access         object
Screening_Regularity       object
Diet_Type                  object
BMI                        object
Physical_Activity_Level    object
Smoking_Status             object
Alcohol_Consumption        object
Red_Meat_Consumption       object
Fiber_Consumption          object
Insurance_Coverage         object
Time_to_Diagnosis          object
Treatment_Access           object
Chemotherapy_Received      object
Radiotherapy_Received      object
Surgery_Received           object
Follow_Up_Adherence        object
Survival_Status            object
Recurrence                 object
Time_to_Recurrence         object
dtype: object
```

#### Verificação de Valores Ausentes
<p align="justify">
Uma análise crucial foi a verificação de valores ausentes no dataset. Através dos seguintes comandos, verificamos se havia linhas completamente vazias e se existiam valores nulos em alguma das colunas.</p>

```python
# Verificar quantas linhas estão completamente vazias. (Não há nenhuma linha vazia)
print(df[df.isnull().all(axis=1)])

# Exibir todas as linhas onde todos os valores são NaN. (Todas as linhas do DataFrame possuem pelo menos um valor preenchido)
print((df.isnull().any(axis=1)).sum())

# Print de verificação de valores ausentes. (Não há valor ausente)
print(df.isnull().sum())

Empty DataFrame
Columns: [Patient_ID, Age, Gender, Race, Region, Urban_or_Rural, Socioeconomic_Status, Family_History, Previous_Cancer_History, Stage_at_Diagnosis, Tumor_Aggressiveness, Colonoscopy_Access, Screening_Regularity, Diet_Type, BMI, Physical_Activity_Level, Smoking_Status, Alcohol_Consumption, Red_Meat_Consumption, Fiber_Consumption, Insurance_Coverage, Time_to_Diagnosis, Treatment_Access, Chemotherapy_Received, Radiotherapy_Received, Surgery_Received, Follow_Up_Adherence, Survival_Status, Recurrence, Time_to_Recurrence]
Index: []

[0 rows x 30 columns]
0
Patient_ID                 0
Age                        0
Gender                     0
Race                       0
Region                     0
Urban_or_Rural             0
Socioeconomic_Status       0
Family_History             0
Previous_Cancer_History    0
Stage_at_Diagnosis         0
Tumor_Aggressiveness       0
Colonoscopy_Access         0
Screening_Regularity       0
Diet_Type                  0
BMI                        0
Physical_Activity_Level    0
Smoking_Status             0
Alcohol_Consumption        0
Red_Meat_Consumption       0
Fiber_Consumption          0
Insurance_Coverage         0
Time_to_Diagnosis          0
Treatment_Access           0
Chemotherapy_Received      0
Radiotherapy_Received      0
Surgery_Received           0
Follow_Up_Adherence        0
Survival_Status            0
Recurrence                 0
Time_to_Recurrence         0
dtype: int64
```
<p align="justify">
A análise inicial do dataset revelou que ele é composto por 89945 registros e 30 colunas, com todos os dados inicialmente carregados como strings, indicando a necessidade de conversão para tipos numéricos. O dataset não apresenta linhas completamente vazias nem valores ausentes em nenhuma das colunas, o que simplifica as etapas de limpeza e preparação para análises subsequentes.</p>

### Informações Demográficas

### Triagem e Estilo de Vida

### Diagnóstico, Características do Câncer e Tratamento

### Acompanhamento e Sobrevivência


## Descrição dos achados

A partir da análise descrita e exploratória realizada, descreva todos os achados considerados relevantes para o contexto em que o trabalho se insere. Por exemplo: com relação à centralidade dos dados algo chamou a atenção? Foi possível identificar correlação entre os atributos? Que tipo de correlação (forte, fraca, moderada)? 

### Informações Demográficas

### Triagem e Estilo de Vida

### Diagnóstico, Características do Câncer e Tratamento

### Acompanhamento e Sobrevivência

## Ferramentas utilizadas
<p align="justify">
Para a análise descritiva e exploratória sobre o dataset escolhido, com o objetivo de compreender a estrutura dos dados, detectar eventuais outliers e também, avaliar/detectar as relações existentes entre as variantes verificadas, foram empregadas as seguintes ferramentas:

* **Microsoft Excel**: Utilizado na etapa inicial para a inspeção e verificação da integridade do conjunto de dados, garantindo a qualidade e consistência das informações.
* **Google Colab**: Plataforma de notebook interativa baseada em nuvem, que possibilitou a execução de códigos Python de forma eficiente e colaborativa.
* **Python**: Linguagem de programação central do projeto, utilizada para:
    * **Análise exploratória de dados (EDA)**: Através de ferramentas de manipulação de dados tabulares e numéricos (Pandas e NumPy), realizamos a limpeza, transformação e análise estatística dos dados.
    * **Visualização de dados**: Com bibliotecas para criação de gráficos e visualizações (Matplotlib, Plotly e Seaborn ), identificamos padrões e insights relevantes nos dados.
* **Base de dados**: O arquivo CSV do Dataset: Colorectal Cancer Risk & Survival Data, do site Kaggle, https://www.kaggle.com/datasets/ankushpanday1/colorectal-cancer-risk-and-survival-data.</p>
   
Existem muitas ferramentas diferentes que podem ser utilizadas para fazer a análise dos dados. Nesta seção, descreva as ferramentas/tecnologias utilizadas e sua aplicação. Vale destacar que, preferencialmente, as análises deverão ser realizadas utilizando a linguagem de programação Python.

# Vídeo de apresentação da Etapa 02

Nesta seção, um vídeo de, no máximo, 15 minutos deverá ser produzido. No vídeo, cada aluno do grupo deverá apresentar uma parte do trabalho realizado nesta etapa e dos achados/insights obtidos. Todos os alunos deverão participar do vídeo. Alunos que não participarem, serão penalizados na nota final da etapa.


