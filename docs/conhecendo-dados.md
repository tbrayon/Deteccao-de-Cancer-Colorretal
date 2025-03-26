# Conhecendo os dados

Nesta seção, deverá ser registrada uma detalhada análise descritiva e exploratória sobre a base de dados selecionada na Etapa 1 com o objetivo de compreender a estrutura dos dados, detectar eventuais _outliers_ e também, avaliar/detectar as relações existentes entre as variáveis analisadas.

Para isso, sugere-se que sejam utilizados cálculos de medidas de tendência central, como média, mediana e moda, para entender a centralidade dos dados; sejam exploradas medidas de dispersão como desvio padrão e intervalos interquartil para avaliar a variabilidade dos dados; sejam utilizados gráficos descritivos como histogramas e box plots, para representar visualmente as características essenciais dos dados, pois essas visualizações podem facilitar a identificação de padrões e anomalias; sejam analisadas as relações entre as variáveis por meio de análise de correlação, gráficos de dispersões, mapas de calor, entre outras técnicas. 

Inclua nesta seção, gráficos, tabelas e demais artefatos que você considere relevantes para entender os dados com os quais você irá trabalhar.  Além disso, inclua e comente os trechos de código mais relevantes desenvolvidos para realizar suas análises. Na pasta "src", inclua o código fonte completo.

## Análise Inicial do Dataset de Predição de Câncer Colorretal
<p align="justify">
Abaixo é apresentada uma análise inicial do dataset <a href="https://www.kaggle.com/datasets/ankushpanday1/colorectal-cancer-risk-and-survival-data">Colorectal Cancer Risk & Survival Data</a>, utilizado para predição de câncer colorretal. O objetivo desta análise é entender a estrutura dos dados, verificar a presença de valores ausentes e preparar o dataset para análises subsequentes e modelagem.
</p>

### Carregamento e Inspeção dos Dados
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

### Limpeza e Preparação Inicial
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

### Verificação de Valores Ausentes
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

## Análises por categoria

### - Informações Demográficas
<p align="justify">
Na categoria <strong>Informações Demográficas</strong>, a coluna <strong>Age</strong> (Idade) foi identificada como um número inteiro. As colunas categóricas <strong>Gender</strong> (Gênero), <strong>Race</strong> (Raça), <strong>Region</strong> (Região), <strong>Urban_or_Rural</strong> (Zona de Residência) e <strong>Socioeconomic_Status</strong> (Status Socioeconômico) foram convertidas para valores numéricos. Além disso, as colunas booleanas <strong>Family_History</strong> (Histórico Familiar) e <strong>Previous_Cancer_History</strong> (Histórico de Câncer Prévio), originalmente representadas por "sim" e "não", também foram transformadas em valores numéricos. Essas conversões possibilitam a aplicação de métodos estatísticos e modelos de aprendizado de máquina, facilitando a identificação de padrões e a previsão de resultados relacionados ao câncer colorretal.</p>


#### Realizando o tratamento dos dados para o Python das Informações Demográficas

#### Idade
- **Idade média dos pacientes no momento do diagnóstico:** 54.33

#### Gênero  
| Gênero   | Código | Quantidade |
|----------|--------|------------|
| Feminino | 1      | 49.369     |
| Masculino | 2     | 40.576     |

#### Raça  
| Raça      | Código | Quantidade |
|-----------|--------|------------|
| Asiático  | 1      | 13.502     |
| Negro     | 2      | 18.005     |
| Hispânico | 3      | 9.040      |
| Branco    | 4      | 44.887     |
| Outros    | 5      | 4.511      |

#### Região  
| Região           | Código | Quantidade |
|-----------------|--------|------------|
| Europa         | 1      | 27.019     |
| América do Norte | 2      | 31.537     |
| Ásia           | 3      | 17.916     |
| América Latina | 4      | 9.050      |
| África        | 5      | 4.423      |

#### Zona de Residência  
| Zona   | Código | Quantidade |
|--------|--------|------------|
| Urbana | 1      | 62.990     |
| Rural  | 2      | 26.955     |

#### Status Socioeconômico  
| Status | Código | Quantidade |
|--------|--------|------------|
| Baixa  | 1      | 26.868     |
| Média  | 2      | 45.088     |
| Alta   | 3      | 17.989     |

#### Histórico Familiar  
| Histórico | Código | Quantidade |
|-----------|--------|------------|
| Não       | 0      | 67.372     |
| Sim       | 1      | 22.573     |

#### Histórico de Câncer Prévio  
| Histórico | Código | Quantidade |
|-----------|--------|------------|
| Não       | 0      | 80.985     |
| Sim       | 1      | 8.960      |

#### Realizando análises estatísticas na categoria "Idade":

1) Histograma de Distribuição de Idade dos Pacientes.

Colocar a imagem

```python
import seaborn as sns
import matplotlib.pyplot as plt
sns.histplot(df_xlsx['Age'], bins=10, kde=True, color='skyblue')
plt.title('Distribuição de Idade dos Pacientes com Densidade')
plt.xlabel('Idade')
plt.ylabel('Densidade')
plt.show()
```
## Distribuição de Idade dos Pacientes

### Compreensão da Distribuição  
<p align="justify">Para compreender a distribuição da idade dos pacientes incluídos no estudo, foi elaborado um <strong>histograma</strong> utilizando a coluna `"Age"` do conjunto de dados. O histograma divide os dados em <strong>intervalos de idade <strong>(bins)</strong> e exibe a frequência (quantidade de pacientes) em cada intervalo.</p>       

### Construção do Histograma  
<p align="justify">O histograma foi construído utilizando a biblioteca <strong>matplotlib.pyplot</strong> em Python. A coluna `'Age'` do DataFrame `df_xlsx` foi utilizada como fonte de dados.</p>  

### Parâmetros Utilizados:  
- **Número de intervalos:** 10 (`bins=10`), permitindo uma visualização clara da distribuição.  
- **Cor das barras:** Azul claro (`color='skyblue'`).  
- **Bordas das barras:** Pretas (`edgecolor='black'`) para melhor contraste.  
- **Título do gráfico:** "Distribuição de Idade dos Pacientes".  
- **Rótulos dos eixos:** `"Idade"` (eixo x) e `"Quantidade"` (eixo y).  
- **Exibição do gráfico:** `plt.show()`.  

### Observações Adicionais

<p align="justify">- O histograma apresenta a distribuição etária dos pacientes com câncer colorretal, organizada em intervalos de <strong>10 anos</strong>, abrangendo a faixa de <strong>30 a 90 anos<strong>.</p>    
<p align="justify">- Observa-se um aumento na quantidade de pacientes nos grupos de <strong>40-50 anos</strong> e <strong>70-80 anos</strong>, em comparação com os demais intervalos.</p>    
<p align="justify">- Esse padrão sugere que essas faixas etárias possuem uma <strong>maior incidência da doença</strong>.</p>    
<p align="justify">- A identificação desses grupos é fundamental para a implementação de <strong>programas de prevenção e detecção precoce</strong>, permitindo a adoção de estratégias voltadas ao <strong>monitoramento e à conscientização</strong> sobre os riscos e sintomas do câncer colorretal.</p>    

#### Realizando análises estatísticas na categoria "Gênero, Raça, Região, Zona de Residência, Status Socioeconômico, Histórico Familiar e Histórico de Câncer Prévio":

1) Moda das variáveis da categoria: Gender, Race, Urban_or_Rural, Socioeconomic_Status, Family_History, Previous_Cancer_History.

```python 
# Calcular a moda de Gender, Race, Urban_or_Rural, Socioeconomic_Status, Family_History, Previous_Cancer_History
import pandas as pd
# Carregar os dados
df = pd.read_excel('colorectal_cancer_prediction.xlsx')
# Calcular a moda da Idade
mode_age = df['Age'].mode()
mode_gender = df['Gender'].mode()
mode_race = df['Race'].mode()
mode_urban_or_rural = df['Urban_or_Rural'].mode()
mode_socioeconomic_status = df['Socioeconomic_Status'].mode()
mode_family_history = df['Family_History'].mode()
mode_previous_cancer_history = df['Previous_Cancer_History'].mode()

# Exibir os resultados
print(f"Moda da Idade: {mode_age.values[0]}")
print(f"Moda do Gênero: {mode_gender.values[0]}")
print(f"Moda da Raça: {mode_race.values[0]}")
print(f"Moda da Zona de Residência: {mode_urban_or_rural.values[0]}")
print(f"Moda do Status Socioeconômico: {mode_socioeconomic_status.values[0]}")
print(f"Moda do Histórico Familiar: {mode_family_history.values[0]}")
print(f"Moda do Histórico de Câncer Prévio: {mode_previous_cancer_history.values[0]}")

Moda da Idade: 77
Moda do Gênero: Male
Moda da Raça: White
Moda da Zona de Residência: Urban
Moda do Status Socioeconômico: Middle
Moda do Histórico Familiar: No
Moda do Histórico de Câncer Prévio: No
```
### Moda das Variáveis

<p align="justify">A <strong>moda</strong>strong> é a medida estatística que representa o valor mais frequente em um conjunto de dados. No contexto da análise dos dados dos pacientes, calculamos a moda de várias variáveis para entender os valores que mais se repetem em cada uma delas. Abaixo estão as explicações para a moda de cada variável relevante:</p>
<p align="justify">
- <strong>Idade</strong>: A moda da idade dos pacientes foi de <strong>77 anos</strong>, o que indica que a maioria dos pacientes no momento do diagnóstico tem essa idade. Esse valor reflete a faixa etária mais comum entre os pacientes analisados.</p>
<p align="justify">
- <strong>Gênero</strong>: A moda do <strong>Gênero</strong> foi <strong>0</strong>, que corresponde a <strong>Masculino</strong>. Isso significa que a maioria dos pacientes na amostra são do sexo masculino.</p>
<p align="justify">
- <strong>Raça</strong>: A moda da <strong>Raça</strong> foi <strong>3</strong>, que representa a categoria <strong>Branco</strong>. Assim, a maior parte dos pacientes da amostra se identificam como brancos.</p>
<p align="justify">
- <strong>Zona de Residência</strong>: A moda da <strong>Zona de Residência</strong> foi <strong>0</strong>, o que corresponde a <strong>Urbano</strong>. Isso indica que a maioria dos pacientes reside em áreas urbanas.</p>
<p align="justify">
- <strong>Status Socioeconômico</strong>: A moda do <strong>Status Socioeconômico</strong> foi <strong>1</strong>, representando <strong>Renda média</strong>. A maior parte dos pacientes na amostra pertence à classe socioeconômica de renda média.</p>
<p align="justify">
- <strong>Histórico Familiar de Câncer</strong>: A moda do <strong>Histórico Familiar</strong> foi <strong>0</strong>, ou seja, <strong>Não</strong>. A maioria dos pacientes não possui histórico familiar de câncer.</p>
<p align="justify">
- <strong>Histórico de Câncer Prévio</strong>: A moda do <strong>Histórico de Câncer Prévio</strong> também foi <strong>0</strong>, indicando que a maior parte dos pacientes nunca teve câncer anteriormente.</p>

####  Realizando a mediana central da categoria "Idade":
1) Mediana das variáveis da categoria: Age

```python
import pandas as pd
# Carregando os dados
df = pd.read_excel('colorectal_cancer_prediction.xlsx')
# Calculando a mediana da Idade
median_age = df['Age'].median()
# Exibindo a mediana
print(f"A mediana da idade dos pacientes é: {median_age} anos")
```
<p align="justify">
A mediana é uma medida de tendência central que representa o valor central em um conjunto de dados quando os valores são organizados em ordem crescente. Quando o número de elementos é ímpar, a mediana é simplesmente o valor do meio. Quando o número de elementos é par, a mediana é a média dos dois valores centrais. Para calcular a mediana da idade dos pacientes no conjunto de dados, utilizamos a função median() do pandas, que organiza os dados em ordem crescente e seleciona o valor central. A mediana da idade dos pacientes é: 54.0 anos</p>

####  Realizando a média central da categoria "Status Socioeconômico":
1) Média de frequência da categoria "Status Socioeconômico"

```python 
import pandas as pd
# Carregando os dados
df = pd.read_excel('colorectal_cancer_prediction.xlsx')
# Convertendo 'Socioeconomic_Status' para valores numéricos
status_mapping = {'Low': 0, 'Middle': 1, 'High': 2} 
df['Socioeconomic_Status'] = df['Socioeconomic_Status'].map(status_mapping)
# Calculando a média do Status Socioeconômico
mean_socioeconomic_status = df['Socioeconomic_Status'].mean()
# Exibindo a média
print(f"A média do Status Socioeconômico dos pacientes é: {mean_socioeconomic_status}")
```
<p align="justify">
Ao analisar a distribuição de frequência do Status Socioeconômico, podemos observar como os pacientes estão distribuídos entre as diferentes categorias de renda: baixa, média e alta. A média calculada, que é de aproximadamente 0.90, reflete o valor central dessa distribuição, sugerindo que a maioria dos pacientes se encontra na faixa de renda média (representada pelo valor 1).</p>
<p align="justify">
A visualização da distribuição de frequência também ajuda a entender melhor esse valor médio. A distribuição mostra que a proporção de pacientes com renda média é maior, o que explica o valor da média ser tão próximo de 1. Essa análise contextualiza o valor da média, fornecendo uma visão mais detalhada sobre como os pacientes estão distribuídos entre as diferentes faixas de status socioeconômico, o que é crucial para compreender o perfil socioeconômico da amostra analisada.</p>

### - Triagem e Estilo de Vida

### - Diagnóstico, Características do Câncer e Tratamento
<p align="justify">
O conjunto de dados em análise contém informações cruciais relacionadas ao diagnóstico, características do câncer e tratamento de pacientes. Inicialmente, as colunas <strong>Stage_at_Diagnosis, Tumor_Aggressiveness e Time_to_Diagnosis</strong> foram carregadas como texto, enquanto <strong>Insurance_Coverage, Chemotherapy_Received e Radiotherapy_Received</strong> foram identificadas como booleanas. Para facilitar a análise quantitativa e a modelagem, foi realizada a conversão dos tipos de dados para numérico, mapeando os valores textuais e booleanos para representações numéricas apropriadas. A conversão dessas colunas permite a aplicação de métodos estatísticos e modelos de aprendizado de máquina, facilitando a identificação de padrões e a previsão de resultados relacionados ao câncer colorretal.</p>

#### Realizando análises de ditribuição de pacientes na categoria "Diagnóstico, Características do Câncer e Tratamento":
1) Distribuição dos pacientes em relação ao tempo até o diagnóstico (Timely ou Delayed) e o estágio do câncer no diagnóstico (I, II, III, IV). 

<p align="center">
  <img src="https://github.com/user-attachments/assets/10434325-b77e-4d9b-953e-533d226af3bc" alt="image">
</p>

<p align="justify">
A tabela cruzada revela que, independentemente do tempo até o diagnóstico (precoce ou tardio), a maioria dos pacientes é diagnosticada nos estágios I e II do câncer colorretal, com uma ligeira predominância no estágio II. No entanto, o diagnóstico precoce está associado a um número maior de pacientes diagnosticados em todos os estágios, sugerindo que a detecção precoce pode levar a um diagnóstico em estágios mais iniciais. A diferença mais acentuada entre diagnósticos precoces e tardios é observada no estágio II, indicando que este estágio pode ser mais sensível ao tempo de diagnóstico. Apesar disso, um número significativo de pacientes ainda é diagnosticado em estágios avançados (III e IV), independentemente do tempo de diagnóstico, o que aponta para a influência de outros fatores além do tempo decorrido até o diagnóstico na progressão da doença.</p>

2) Distribuição dos pacientes em relação ao tempo até o diagnóstico (Timely ou Delayed) e a agressividade do tumor (Low, Medium, High). 

<p align="center">
  <img src="https://github.com/user-attachments/assets/3b6e4788-cba3-46be-8fd5-268d8c9c3d87" alt="image">
</p>

<p align="justify">
A tabela cruzada apresenta a distribuição de pacientes com câncer colorretal em relação ao tempo até o diagnóstico e a agressividade do tumor. Observa-se que a maioria dos pacientes foi diagnosticada precocemente (Timely) e apresentou tumores de baixa ou média agressividade. No entanto, mesmo com o diagnóstico tardio (Delayed), ainda há um número significativo de pacientes com tumores de baixa e média agressividade. A distribuição dos pacientes entre os níveis de agressividade do tumor é relativamente uniforme, tanto para diagnósticos precoces quanto tardios, sugerindo que o tempo até o diagnóstico pode não ser um fator determinante na agressividade do tumor. A categoria de alta agressividade (High) apresenta o menor número de pacientes em ambos os grupos de tempo de diagnóstico, indicando que tumores altamente agressivos são menos comuns na população estudada.</p>

#### Realizando análises estatísticas entre a categoria "Diagnóstico, Características do Câncer e Tratamento" X demais categorias do dataset:

1) Moda das variáveis da categoria Diagnóstico, Características do Câncer e Tratamento.
```python
mode_values = df[["Stage_at_Diagnosis", "Tumor_Aggressiveness", "Insurance_Coverage",
                  "Time_to_Diagnosis", "Treatment_Access", "Chemotherapy_Received", "Radiotherapy_Received"]].mode().T

# Definindo nomes mais amigáveis para as colunas
mode_values.columns = ["Modo (valor mais frequente)"]

# Exibindo de maneira mais legível
print(mode_values)

                       Modo (valor mais frequente)
Stage_at_Diagnosis                               2
Tumor_Aggressiveness                             2
Insurance_Coverage                               1
Time_to_Diagnosis                                1
Treatment_Access                                 1
Chemotherapy_Received                            1
Radiotherapy_Received                            0
```
<p align="justify">
O resultado da análise da moda das variáveis relacionadas ao diagnóstico, características do câncer e tratamento revela os valores mais frequentes encontrados no conjunto de dados. A maioria dos pacientes foi diagnosticada no estágio 2 do câncer, com tumores de agressividade média (valor 2). A maioria possui cobertura de seguro de saúde (valor 1), teve diagnóstico em um curto intervalo de tempo (valor 1) e acesso ao tratamento (valor 1). Além disso, a maioria dos pacientes recebeu quimioterapia (valor 1), enquanto a maioria não recebeu radioterapia (valor 0). Esses resultados refletem os padrões mais comuns entre os pacientes e podem auxiliar na definição de estratégias de tratamento e acompanhamento.</p>

2) Medidas de Tendência Central e Dispersão
```python
print("\nMedidas de Tendência Central e Dispersãos:")
# 50% representa a mediana
estatisticas = df.describe().loc[['mean', '50%', 'std']]  
# Formatação do output para melhor legibilidade
print("\nMédias e Medidas de Dispersão das Variáveis Numéricas:\n")
print(estatisticas.to_string())

Medidas de Tendência Central e Dispersãos:

Médias e Medidas de Dispersão das Variáveis Numéricas:

            Age  Stage_at_Diagnosis  Tumor_Aggressiveness  Colonoscopy_Access  Insurance_Coverage  Time_to_Diagnosis  Treatment_Access  Chemotherapy_Received  Radiotherapy_Received  Time_to_Recurrence
mean  54.332892            2.399778              1.801090            0.751204            0.801801           1.398744          1.300717               0.501051               0.400167           29.543299
50%   54.000000            2.000000              2.000000            1.000000            1.000000           1.000000          1.000000               1.000000               0.000000           30.000000
std   20.182220            1.069657              0.748656            0.432318            0.398645           0.489643          0.458572               0.500002               0.489935           17.268440
```
<p align="justify">
A análise das medidas de tendência central e dispersão revela insights importantes sobre as variáveis numéricas do conjunto de dados. A idade média dos pacientes é de aproximadamente 54 anos, com uma mediana similar, indicando uma distribuição relativamente simétrica. O estágio médio do diagnóstico é 1.4, sugerindo que a maioria dos pacientes foi diagnosticada em estágios iniciais. A agressividade tumoral média é 0.8, com uma mediana de 1, indicando uma tendência para tumores de baixa agressividade. A maioria dos pacientes possui cobertura de seguro de saúde, teve diagnóstico rápido e acesso ao tratamento. A proporção de pacientes que receberam quimioterapia e radioterapia é aproximadamente igual. O tempo médio para recorrência é de cerca de 29.5 meses, com uma mediana de 30 meses, sugerindo uma distribuição relativamente simétrica. O desvio padrão para idade e tempo de recorrência indicam uma variação considerável entre os pacientes, enquanto as outras variáveis mostram menor variação. É importante notar que algumas variáveis, como 'Insurance_Coverage', 'Time_to_Diagnosis', 'Treatment_Access', 'Chemotherapy_Received' e 'Radiotherapy_Received' parecem ser binárias ou ter uma escala limitada, o que explica a baixa variabilidade.</p>

3) Resumo estatístico de algumas colunas numéricas

```python
resumo_estatistico = df.describe()
# Formatação do resumo estatístico para melhor legibilidade
resumo_formatado = resumo_estatistico.to_string()
# Impressão do resumo estatístico formatado
print(resumo_formatado)

                Age  Stage_at_Diagnosis  Tumor_Aggressiveness  Colonoscopy_Access  Insurance_Coverage  Time_to_Diagnosis  Treatment_Access  Chemotherapy_Received  Radiotherapy_Received  Time_to_Recurrence
count  89945.000000        89945.000000          89945.000000        89945.000000        89945.000000       89945.000000      89945.000000           89945.000000           89945.000000        89945.000000
mean      54.332892            2.399778              1.801090            0.751204            0.801801           1.398744          1.300717               0.501051               0.400167           29.543299
std       20.182220            1.069657              0.748656            0.432318            0.398645           0.489643          0.458572               0.500002               0.489935           17.268440
min       20.000000            1.000000              1.000000            0.000000            0.000000           1.000000          1.000000               0.000000               0.000000            0.000000
25%       37.000000            1.000000              1.000000            1.000000            1.000000           1.000000          1.000000               0.000000               0.000000           15.000000
50%       54.000000            2.000000              2.000000            1.000000            1.000000           1.000000          1.000000               1.000000               0.000000           30.000000
75%       72.000000            3.000000              2.000000            1.000000            1.000000           2.000000          2.000000               1.000000               1.000000           44.000000
max       89.000000            4.000000              3.000000            1.000000            1.000000           2.000000          2.000000               1.000000               1.000000           59.000000
```
<p align="justify">
O resumo estatístico acima apresenta as principais medidas descritivas das variáveis numéricas do conjunto de dados. A contagem (count) indica o número de observações válidas em cada coluna. A média (mean) representa o valor médio de cada variável. O desvio padrão (std) mede a dispersão dos dados em relação à média. O valor mínimo (min) e o valor máximo (max) indicam os limites da variação de cada variável. Os quartis (25%, 50%, 75%) dividem os dados em quatro partes iguais, permitindo analisar a distribuição dos dados. Observa-se que a variável 'Idade' (Age) apresenta uma média de 54.33 anos, com uma variação considerável (desvio padrão de 20.18 anos). A variável 'Tempo até a Recorrência' (Time_to_Recurrence) apresenta uma média de 29.54 meses, com uma variação de até 59 meses. As demais variáveis, como 'Estágio do Diagnóstico' (Stage_at_Diagnosis), 'Agressividade do Tumor' (Tumor_Aggressiveness), 'Cobertura do Plano de Saúde' (Insurance_Coverage), 'Tempo até o Diagnóstico' (Time_to_Diagnosis), 'Acesso ao Tratamento' (Treatment_Access), 'Recebimento de Quimioterapia' (Chemotherapy_Received) e 'Recebimento de Radioterapia' (Radiotherapy_Received), são variáveis categóricas binárias (0 ou 1), com médias próximas de 0.5, indicando uma distribuição equilibrada entre as categorias. A análise do resumo estatístico pode auxiliar na compreensão da distribuição e variação das variáveis numéricas, fornecendo informações importantes para a análise exploratória dos dados e o desenvolvimento de modelos preditivos.</p>

4) Medidas de Tendência Central (Média, Mediana, Moda)

```python
media = df.mean(numeric_only=True)
mediana = df.median(numeric_only=True)
moda = df.mode().iloc[0]
# Formatação das medidas de tendência central para melhor legibilidade
print("Média:\n", media.to_string())
print("\nMediana:\n", mediana.to_string())
print("\nModa:\n", moda.to_string())

Média:
 Age                      54.332892
Stage_at_Diagnosis        2.399778
Tumor_Aggressiveness      1.801090
Colonoscopy_Access        0.751204
Insurance_Coverage        0.801801
Time_to_Diagnosis         1.398744
Treatment_Access          1.300717
Chemotherapy_Received     0.501051
Radiotherapy_Received     0.400167
Time_to_Recurrence       29.543299

Mediana:
 Age                      54.0
Stage_at_Diagnosis        2.0
Tumor_Aggressiveness      2.0
Colonoscopy_Access        1.0
Insurance_Coverage        1.0
Time_to_Diagnosis         1.0
Treatment_Access          1.0
Chemotherapy_Received     1.0
Radiotherapy_Received     0.0
Time_to_Recurrence       30.0

Moda:
 Patient_ID                             1
Age                                 77.0
Gender                              Male
Race                               White
Region                     North America
Urban_or_Rural                     Urban
Socioeconomic_Status              Middle
Family_History                        No
Previous_Cancer_History               No
Stage_at_Diagnosis                   2.0
Tumor_Aggressiveness                 2.0
Colonoscopy_Access                   1.0
Screening_Regularity             Regular
Diet_Type                        Western
BMI                                 38.1
Physical_Activity_Level              Low
Smoking_Status                     Never
Alcohol_Consumption                  Low
Red_Meat_Consumption                 Low
Fiber_Consumption                 Medium
Insurance_Coverage                   1.0
Time_to_Diagnosis                    1.0
Treatment_Access                     1.0
Chemotherapy_Received                1.0
Radiotherapy_Received                0.0
Surgery_Received                     Yes
Follow_Up_Adherence                 Good
Survival_Status                 Survived
Recurrence                            No
Time_to_Recurrence                  53.0
```

<p align="justify">
A análise estatística apresentada oferece uma visão abrangente das características do conjunto de dados, abrangendo medidas de tendência central (média, mediana e moda) e dispersão (desvio padrão). A idade média dos pacientes é de 54 anos, com uma distribuição simétrica, enquanto o tempo médio para recorrência é de aproximadamente 29.5 meses. A maioria dos pacientes foi diagnosticada no estágio 2 do câncer, com tumores de agressividade média. A cobertura de seguro, o diagnóstico precoce e o acesso ao tratamento são comuns na amostra. A quimioterapia é mais frequente que a radioterapia. A moda revela que a maioria dos pacientes é do sexo masculino, raça branca, da América do Norte, residente em áreas urbanas, de classe média, sem histórico familiar ou prévio de câncer, com diagnóstico regular, dieta ocidental, baixo nível de atividade física, nunca fumou, baixo consumo de álcool e carne vermelha, consumo médio de fibras, cobertura de seguro, diagnóstico precoce, acesso ao tratamento, quimioterapia, cirurgia, boa adesão ao acompanhamento, sobrevida e sem recorrência. O tempo mais frequente para recorrência é de 53 meses.</p>

5) Medidas de Dispersão (Desvio Padrão e Intervalo Interquartil - IQR)

```python
# Desvio padrão
desvio_padrao = df.std(numeric_only=True)
# Intervalo interquartil (IQR)
Q1 = df.quantile(0.25, numeric_only=True)
Q3 = df.quantile(0.75, numeric_only=True)
IQR = Q3 - Q1
# Formatação das medidas de dispersão para melhor legibilidade
print("Desvio Padrão:\n", desvio_padrao.to_string())
print("\nIntervalo Interquartil (IQR):\n", IQR.to_string())

Desvio Padrão:
 Age                      20.182220
Stage_at_Diagnosis        1.069657
Tumor_Aggressiveness      0.748656
Colonoscopy_Access        0.432318
Insurance_Coverage        0.398645
Time_to_Diagnosis         0.489643
Treatment_Access          0.458572
Chemotherapy_Received     0.500002
Radiotherapy_Received     0.489935
Time_to_Recurrence       17.268440

Intervalo Interquartil (IQR):
 Age                      35.0
Stage_at_Diagnosis        2.0
Tumor_Aggressiveness      1.0
Colonoscopy_Access        0.0
Insurance_Coverage        0.0
Time_to_Diagnosis         1.0
Treatment_Access          1.0
Chemotherapy_Received     1.0
Radiotherapy_Received     1.0
Time_to_Recurrence       29.0
```
<p align="justify">
As medidas de dispersão fornecem informações sobre a variabilidade dos dados em relação à média ou à mediana. O desvio padrão mede a dispersão dos dados em torno da média, enquanto o intervalo interquartil (IQR) mede a dispersão dos dados em torno da mediana. Neste caso, observa-se que a variável 'Idade' (Age) apresenta o maior desvio padrão (20.18 anos) e o maior IQR (35 anos), indicando uma alta variabilidade na idade dos pacientes. A variável 'Tempo até a Recorrência' (Time_to_Recurrence) também apresenta um desvio padrão considerável (17.27 meses) e um IQR de 29 meses, sugerindo uma ampla variação no tempo até a recorrência do câncer. As demais variáveis, que são categóricas binárias (0 ou 1), apresentam desvios padrão próximos de 0.5 e IQRs de 1 ou 0, indicando uma baixa variabilidade e uma distribuição equilibrada entre as categorias. A análise das medidas de dispersão pode auxiliar na identificação de variáveis com alta variabilidade, o que pode ter implicações para a análise dos dados e o desenvolvimento de modelos preditivos.</p>

#### Tentando responder as questões de pesquisa relacionada à categoria Diagnóstico, Características do Câncer e Tratamento utilizando métodos de estatística:

1) Pergunta: Considerando os atributos relacionados às informações demográficas e ao diagnóstico e tratamento, qual o tratamento é mais recomendável?

```python
# Criar tabela cruzada entre estágio do câncer e tratamento recebido
crosstab = pd.crosstab(df["Stage_at_Diagnosis"], df["Chemotherapy_Received"])

# Formatação da tabela cruzada para melhor legibilidade e adição de totais
crosstab['Total'] = crosstab.sum(axis=1)  # Adiciona total por estágio
crosstab.loc['Total'] = crosstab.sum(axis=0)  # Adiciona total por quimioterapia

# Teste Qui-quadrado para ver se há associação entre estágio do câncer e quimioterapia
chi2, p, _, _ = chi2_contingency(crosstab.iloc[:-1, :-1])  # Exclui totais do teste

# Gráfico de barras para tratamentos recebidos por estágio do câncer
plt.figure(figsize=(10, 8))  # Aumenta o tamanho da figura para melhor espaçamento
ax = sns.countplot(data=df, x="Stage_at_Diagnosis", hue="Chemotherapy_Received", palette="Set1")
plt.title("Quimioterapia Recebida por Estágio do Câncer", fontsize=14, pad=20)  # Aumenta o espaçamento do título
plt.xlabel("Estágio do Diagnóstico", fontsize=12)
plt.ylabel("Número de Pacientes", fontsize=12)
plt.legend(title="Quimioterapia")
plt.xticks(ticks=[0, 1, 2, 3], labels=["I", "II", "III", "IV"], rotation=0)

# Adicionar valores de Stage_at_Diagnosis em cima de cada coluna (como números inteiros)
for p in ax.patches:
    ax.annotate(f'{int(p.get_height())}', (p.get_x() + p.get_width() / 2., p.get_height()),
                ha='center', va='center', xytext=(0, 10), textcoords='offset points')

# Adicionar caixa de texto com valores possíveis para Stage_at_Diagnosis
valores_possiveis_estagio = (
    "Valores Possíveis para Estágio do Diagnóstico:\n"
    "I: Tumor localizado, sem disseminação\n"
    "II: Tumor invade tecidos próximos\n"
    "III: Tumor com envolvimento significativo dos linfonodos\n"
    "IV: Câncer metastático (espalhado para órgãos distantes)"
)
plt.figtext(0.01, -0.28, valores_possiveis_estagio, ha="left", fontsize=10, bbox={"facecolor": "lightgray", "alpha": 0.5, "pad": 5})

# Adicionar caixa de texto com valores possíveis para Quimioterapia_Received
valores_possiveis_quimioterapia = (
    "Valores Possíveis para tratamento com quimioterapia:\n"
    "0: Paciente não realizou quimioterapia\n"
    "1: Paciente realizou quimioterapia"
)
plt.figtext(0.01, -0.45, valores_possiveis_quimioterapia, ha="left", fontsize=10, bbox={"facecolor": "lightgray", "alpha": 0.5, "pad": 5})

plt.tight_layout(rect=[0, 0.03, 1, 0.75])  # Ajusta o layout para evitar sobreposição

plt.show()
```

<p align="center">
  <img src="https://github.com/user-attachments/assets/007a8ac8-644e-498c-b81a-b8f5d6412b42" alt="image">
</p>

<p align="justify">
O gráfico de barras acima exibe a relação entre o estágio do câncer no
diagnóstico e o recebimento de quimioterapia pelos pacientes. Observa-se que a
frequência de pacientes que receberam quimioterapia (1) é ligeiramente superior
à frequência de pacientes que não receberam (0) em todos os estágios do câncer.
O teste Qui-quadrado, que avalia a associação entre as duas variáveis, resultou
em um valor de X² de 2.74 e um p-valor de 0.4338. Como o p-valor é superior a
0.05, não há evidência estatística suficiente para rejeitar a hipótese nula de
que não há associação entre o estágio do câncer e o recebimento de
quimioterapia. Isso sugere que a decisão de administrar quimioterapia não é
significativamente influenciada pelo estágio do câncer no diagnóstico, podendo
ser determinada por outros fatores clínicos ou individuais do paciente. A
análise da relação entre o estágio do câncer e o tratamento recebido pode
auxiliar na compreensão dos protocolos de tratamento adotados e no planejamento
de estratégias de intervenção. Em resumo, esta análise estatística não responde à questão de pesquisa.</p>

2) Pergunta: Considerando os atributos relacionados ao diagnóstico e tratamento, existe uma relação com o fato de o paciente ter se submetido ao exame de colonoscopia?

```python
# Certifique-se de que há uma coluna indicando se o paciente fez colonoscopia
if "Colonoscopy_Access" in df.columns:
    # Tabela cruzada entre colonoscopia e estágio do câncer
    colonoscopia_crosstab = pd.crosstab(df["Stage_at_Diagnosis"], df["Colonoscopy_Access"])

    # Teste Qui-quadrado
    chi2, p, _, _ = chi2_contingency(colonoscopia_crosstab)

    # Gráfico de barras
    plt.figure(figsize=(10, 8))  # Aumenta o tamanho da figura para melhor espaçamento
    ax = sns.countplot(data=df, x="Stage_at_Diagnosis", hue="Colonoscopy_Access", palette="Set1")
    plt.title("Colonoscopia realizada por estágio do câncer", fontsize=14, pad=20)  # Aumenta o espaçamento do título
    plt.xlabel("Estágio do Diagnóstico", fontsize=12)
    plt.ylabel("Número de Pacientes", fontsize=12)
    plt.legend(title="Colonoscopia")
    plt.xticks(ticks=[0, 1, 2, 3], labels=["I", "II", "III", "IV"], rotation=0)

    # Adicionar valores de Stage_at_Diagnosis em cima de cada coluna (como números inteiros)
    for p in ax.patches:
        ax.annotate(f'{int(p.get_height())}', (p.get_x() + p.get_width() / 2., p.get_height()),
                    ha='center', va='center', xytext=(0, 10), textcoords='offset points')

    # Adicionar caixa de texto com valores possíveis para Stage_at_Diagnosis
    valores_possiveis_estagio = (
        "Valores Possíveis para Estágio do Diagnóstico:\n"
        "I: Tumor localizado, sem disseminação\n"
        "II: Tumor invade tecidos próximos\n"
        "III: Tumor com envolvimento significativo dos linfonodos\n"
        "IV: Câncer metastático (espalhado para órgãos distantes)"
    )
    plt.figtext(0.01, -0.28, valores_possiveis_estagio, ha="left", fontsize=10, bbox={"facecolor": "lightgray", "alpha": 0.5, "pad": 5})

    # Adicionar caixa de texto com valores possíveis para Colonoscopy_Access
    valores_possiveis_colonoscopia = (
        "Valores Possíveis para Colonoscopia:\n"
        "Vermelho ou 0: Paciente não realizou colonoscopia\n"
        "Azul ou 1: Paciente realizou colonoscopia"
    )
    plt.figtext(0.01, -0.45, valores_possiveis_colonoscopia, ha="left", fontsize=10, bbox={"facecolor": "lightgray", "alpha": 0.5, "pad": 5})

    plt.tight_layout(rect=[0, 0.03, 1, 0.75])  # Ajusta o layout para evitar sobreposição

    plt.show()
```

<p align="center">
  <img src="https://github.com/user-attachments/assets/0940ae32-090d-45fc-8ca1-89956391bf6b" alt="image">
</p>

<p align="justify">
O gráfico de barras acima exibe a relação entre o estágio do câncer no
diagnóstico e a realização de colonoscopia pelos pacientes. Observa-se que a
frequência de pacientes que realizaram colonoscopia (1) é consideravelmente
superior à frequência de pacientes que não realizaram (0) em todos os estágios
do câncer. O teste Qui-quadrado, que avalia a associação entre as duas
variáveis, resultou em um valor de X² de 1.90 e um p-valor de 0.5944. Como o
p-valor é superior a 0.05, não há evidência estatística suficiente para rejeitar
a hipótese nula de que não há associação entre o estágio do câncer e a
realização de colonoscopia. Isso sugere que a decisão de realizar colonoscopia
não é significativamente influenciada pelo estágio do câncer no diagnóstico,
podendo ser determinada por outros fatores clínicos ou individuais do paciente.
A análise da relação entre o estágio do câncer e a realização de colonoscopia
pode auxiliar na compreensão dos protocolos de rastreamento adotados e no
planejamento de estratégias de intervenção. Em resumo, esta análise estatística não responde à questão de pesquisa.</p>

### Acompanhamento e Sobrevivência

#### Outliers
Para a verificação de outliers, foi considerado apenas o atributo de tempo de recorrência, pois os demais valores do recorte são categóricos e não possuem valores fora do padrão. A análise de dispersão foi realizada através de um boxplot que pode ser observado abaixo:

<p align="center">
  <img src="https://github.com/user-attachments/assets/c3917ab4-72c9-4ee1-ae4b-f016057dde11" alt="Tempo de recorrência">
</p>


A conclusão da análise foi que não existem outliers, isto é, todos os tempos de recorrência estão dentro de um intervalo considerado padrão.

#### Relação idade e sobrevivência
<p align="justify">
Foi verificada a relação de sobrevivência com a idade do paciente a partir de dois métodos: teste t e Mann-Whitney U. O objetivo desta análise foi visualizar se a taxa de sobrevivência de pacientes está condicionada à idade de alguma forma, se pacientes mais novos possuem mais chances de sobrevivência, por exemplo. Os valores encontrados foram:
</p>

- Estatística U: 763629194.0, p-valor: 0.4518
- Estatística t: 0.7523573566766071, p-valor: 0.4518

Onde um p-valor > 0.05 indica a não relação entre os valores. 

<p align="justify">
O gráfico de histograma KDE abaixo demonstra de forma visual como os valores não são relacionados, já que sua distribuição não apresenta nenhuma tendência:
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/664849c9-6c44-45d3-93e7-3fb55d2c71bd" alt="Histograma de Idade por Sobrevivência">
</p>


#### Tempo até a recorrência e adesão ao acompanhamento

Abaixo, temos as análises básicas dos atributos Time_to_Recurrence e Follow_Up_Adherence:

| Variable         	| Count   | Mean  	| Std Dev   | Min  | 25%  | 50%  | 75%  | Max  | Mode |
|----------------------|---------|-----------|-----------|------|------|------|------|------|------|
| Time_to_Recurrence  | 89945.0 | 29.543299 | 17.268440 | 0.0  | 15.0 | 30.0 | 44.0 | 59.0 | 53   |
| Follow_Up_Adherence | 89945.0 |  0.600823 |  0.489732 | 0.0  |  0.0 |  1.0 |  1.0 |  1.0 |  1   |

#### Sobrevivência e adesão ao acompanhamento
Verificamos se pacientes com boa adesão ao acompanhamento têm maior taxa de sobrevivência, através da correlação das variáveis:

<p align="center">
  <img src="https://github.com/user-attachments/assets/112f6082-d4a9-47aa-b0ac-92c26635bf98" alt="Sobrevivência por adesão ao acompanhamento">
</p>

Utilizando o teste U, o resultado foi U-Statistic: 969471225.5 e p-valor: 0.8599, indicando a não correlação entre os dois atributos (p-valor > 0.05).

Assim, a conclusão é que a adesão ao acompanhamento não está relacionada à sobrevivência.

#### Correlação entre as principais variáveis do subconjunto
Por fim, na matriz de correlação abaixo temos a correlação entre as principais variáveis do recorte Acompanhamento e Sobrevivência do _dataset_:

<p align="center">
  <img src="https://github.com/user-attachments/assets/c512abc1-5604-49ec-9436-f2f96ae2ef58" alt="Matriz de correlação">
</p>

<p align="justify">
A matriz tem valores de -1 a 1, onde valores próximos a -1 tendem a uma forte relação negativa e valores próximos a 1 tendem a uma forte relação positiva. A conclusão é que os atributos deste grupo não possuem correlação entre si.
</p>

## Descrição dos achados

A partir da análise descrita e exploratória realizada, descreva todos os achados considerados relevantes para o contexto em que o trabalho se insere. Por exemplo: com relação à centralidade dos dados algo chamou a atenção? Foi possível identificar correlação entre os atributos? Que tipo de correlação (forte, fraca, moderada)? 

#### Gina

<p align="justify">
A análise abrangente do conjunto de dados de câncer colorretal revela padrões e insights cruciais. A maioria dos pacientes é diagnosticada nos estágios I e II, com predomínio no estágio II, e o diagnóstico precoce está associado a uma maior detecção nesses estágios iniciais. Curiosamente, o tempo até o diagnóstico não parece ser um fator determinante na agressividade do tumor, que se distribui uniformemente entre diagnósticos precoces e tardios, com tumores de baixa e média agressividade sendo mais comuns.</p>
<p align="justify">
Os pacientes tendem a ter cobertura de seguro, diagnóstico rápido e acesso ao tratamento, com a quimioterapia sendo mais frequente que a radioterapia. A idade média dos pacientes é de 54 anos, com uma distribuição simétrica, e o tempo médio para recorrência é de 29.5 meses. A maioria dos pacientes é do sexo masculino, raça branca, residente em áreas urbanas, de classe média, sem histórico familiar ou prévio de câncer, com diagnóstico regular, dieta ocidental e baixa atividade física.</p>
<p align="justify">
A variabilidade na idade e no tempo de recorrência é notável, enquanto as variáveis categóricas binárias mostram baixa variabilidade. A análise estatística não encontrou associação significativa entre o estágio do câncer e o recebimento de quimioterapia ou a realização de colonoscopia, sugerindo que outros fatores influenciam essas decisões. Em resumo, a análise exploratória destaca a complexidade do câncer colorretal, com múltiplos fatores influenciando o diagnóstico, tratamento e recorrência da doença.</p>

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

## Vídeo de apresentação da Etapa 02

Nesta seção, um vídeo de, no máximo, 15 minutos deverá ser produzido. No vídeo, cada aluno do grupo deverá apresentar uma parte do trabalho realizado nesta etapa e dos achados/insights obtidos. Todos os alunos deverão participar do vídeo. Alunos que não participarem, serão penalizados na nota final da etapa.


