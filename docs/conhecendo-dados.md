# Conhecendo os dados

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

<p align="center">_______________________________________________________________________________________________________________</p>

#### Realizando análises estatísticas na categoria "Idade" usando a Curva Gauss:

1) Curva Gauss de Distribuição de Idade dos Pacientes.

![curva gauss01](https://github.com/ICEI-PUC-Minas-PMV-SI/PMV-SI-2025-1-PE7-T1-Cancer-Colorretal/blob/main/docs/img/CurvaGaus01.png)

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Supondo que df_xlsx seja o seu DataFrame

# Média e desvio padrão da idade
media_idade = df_xlsx['Age'].mean()
desvio_padrao_idade = df_xlsx['Age'].std()

# Gerar dados para a curva de Gauss
x = np.linspace(df_xlsx['Age'].min(), df_xlsx['Age'].max(), 100)
y = (1 / (desvio_padrao_idade * np.sqrt(2 * np.pi))) * np.exp(-0.5 * ((x - media_idade) / desvio_padrao_idade)**2)

# Definir intervalos
intervalo1 = (x >= media_idade - desvio_padrao_idade) & (x <= media_idade + desvio_padrao_idade)  # Centro
intervalo2 = (x > media_idade + desvio_padrao_idade) & (x <= media_idade + 2 * desvio_padrao_idade)  # Lateral direita
intervalo3 = (x < media_idade - desvio_padrao_idade) & (x >= media_idade - 2 * desvio_padrao_idade)  # Lateral esquerda

# Preencher a área sob a curva com cores diferentes para cada intervalo
plt.fill_between(x[intervalo1], y[intervalo1], color='darkblue', alpha=0.7, label='média de idade sucessiva ao câncer')
plt.fill_between(x[intervalo2], y[intervalo2], color='lightblue', alpha=0.7, label='média de idade não sucessiva ao câncer')
plt.fill_between(x[intervalo3], y[intervalo3], color='lightblue', alpha=0.7)

# Configurar o gráfico
plt.title('Curva de Gauss da Distribuição de Idade com Intervalos Coloridos')
plt.xlabel('Idade')
plt.ylabel('Densidade de Probabilidade')

# Colocar a legenda fora do gráfico
plt.legend(bbox_to_anchor=(1.05, 1), loc='upper left')
plt.show()
```

### Compreensão da Distribuição:
<p align="justify">Para compreender a distribuição da idade dos pacientes incluídos no estudo, foi elaborada uma <strong>Curva de Gauss</strong> utilizando a coluna `"Age"` do conjunto de dados. A Curva de Gauss divide os dados em <strong>intervalos de idade (bins)</strong> e exibe a frequência (quantidade de pacientes) em cada intervalo.</p>


#### Observações:
<p align="justify">- A Curva de Gauss apresenta a distribuição etária dos pacientes com câncer colorretal, organizada em intervalos de <strong>10 anos</strong>, abrangendo a faixa etária de <strong>20 a 90 anos</strong>.</p> <p align="justify">- Observa-se um aumento na quantidade de pacientes nos grupos de <strong>35 a 75 anos</strong>, representados na cor azul-escuro, enquanto os desvios etários entre <strong>20 a 35 anos</strong> e <strong>75 a 90 anos</strong> são identificados na cor azul-claro.</p> 

<p align="justify">- Esse padrão sugere que a faixa etária de <strong>35 a 75 anos</strong> apresenta uma <strong>maior incidência da doença</strong>.</p> <p align="justify">- A identificação desses grupos é fundamental para a implementação de <strong>programas de prevenção e detecção precoce</strong>, permitindo a adoção de estratégias voltadas ao <strong>monitoramento e à conscientização</strong> sobre os riscos e sintomas do câncer colorretal.</p>

<p align="center">_______________________________________________________________________________________________________________</p>

#### Realizando análises estatísticas na categoria "Gênero, Raça, Região, Zona de Residência, Status Socioeconômico, Histórico Familiar e Histórico de Câncer Prévio":
1) Moda das variáveis da categoria: Gender, Race, Urban_or_Rural, Socioeconomic_Status, Family_History, Previous_Cancer_History.

```python 
# Calcular a moda de Gender, Race, Urban_or_Rural, Socioeconomic_Status, Family_History, Previous_Cancer_History
import pandas as pd
# Carregar os dados
df = pd.read_excel('colorectal_cancer_prediction.xlsx')
# Calcular a moda 
mode_gender = df['Gender'].mode()
mode_race = df['Race'].mode()
mode_urban_or_rural = df['Urban_or_Rural'].mode()
mode_socioeconomic_status = df['Socioeconomic_Status'].mode()
mode_family_history = df['Family_History'].mode()
mode_previous_cancer_history = df['Previous_Cancer_History'].mode()

# Exibir os resultados
print(f"Moda do Gênero: {mode_gender.values[0]}")
print(f"Moda da Raça: {mode_race.values[0]}")
print(f"Moda da Zona de Residência: {mode_urban_or_rural.values[0]}")
print(f"Moda do Status Socioeconômico: {mode_socioeconomic_status.values[0]}")
print(f"Moda do Histórico Familiar: {mode_family_history.values[0]}")
print(f"Moda do Histórico de Câncer Prévio: {mode_previous_cancer_history.values[0]}")

Moda do Gênero: Male
Moda da Raça: White
Moda da Zona de Residência: Urban
Moda do Status Socioeconômico: Middle
Moda do Histórico Familiar: No
Moda do Histórico de Câncer Prévio: No
```
##### Moda das Variáveis

<p align="justify">A <strong>moda</strong> é a medida estatística que representa o valor mais frequente em um conjunto de dados. No contexto da análise dos dados dos pacientes, calculamos a moda de várias variáveis para entender os valores que mais se repetem em cada uma delas. Abaixo estão as explicações para a moda de cada variável relevante:</p>

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

<p align="center">_______________________________________________________________________________________________________________</p>

#### Medidas Estatísticas da Distribuição Etária

1) Mediana das variáveis da categoria: Age
   
```python
import pandas as pd
# Supondo que df_xlsx seja o seu DataFrame
# Média
media_idade = df_xlsx['Age'].mean()
# Mediana
mediana_idade = df_xlsx['Age'].median()
# Desvio Padrão
desvio_padrao_idade = df_xlsx['Age'].std()
# Imprimir os resultados
print(f"Média da idade: {media_idade:.2f}")
print(f"Mediana da idade: {mediana_idade:.2f}")
print(f"Desvio padrão da idade: {desvio_padrao_idade:.2f}")
```
##### Medidas Estatísticas da Idade

- **Média da idade:** 54,33
- **Mediana da idade:** 54,00
- **Desvio padrão da idade:** 20,18
  
<p align="justify">Para compreender a distribuição etária dos pacientes com câncer colorretal, foram calculadas três medidas estatísticas essenciais: média, mediana e desvio padrão.</p>

<p align="justify"><strong>Média:</strong> Representa o valor médio das idades dos pacientes, que foi de <strong>54,33 anos</strong>. Esse valor indica a tendência central dos dados.</p>

<p align="justify"><strong>Mediana:</strong> Corresponde à idade central quando os valores são ordenados, resultando em <strong>54,00 anos</strong>. Como a mediana está próxima da média, sugere-se uma distribuição relativamente simétrica.</p>

<p align="justify"><strong>Desvio Padrão:</strong> Mede a dispersão dos dados em relação à média. O valor obtido foi <strong>20,18</strong>, indicando que há uma variação significativa nas idades dos pacientes.</p>

<p align="justify">Essas métricas ajudam a compreender o perfil etário dos pacientes, fornecendo informações importantes para estudos epidemiológicos e estratégias de prevenção do câncer colorretal.</p>

<p align="center">_______________________________________________________________________________________________________________</p>

####  Realizando Análise de dados dos grupos de Pacientes por Tabagismo e Consumo de Álcool:
1) Média de frequência da categoria "Survival_Status"

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Filtrar os dados para a condição Survival_Status == 1
filtered_df = df_xlsx[df_xlsx['Survival_Status'] == 1]
# Número de amostras desejado para cada categoria
n_samples = 18099
# Criar um novo DataFrame com as primeiras 5000 amostras
balanced_df = pd.DataFrame()
for smoking_status in [1, 2, 3]:
    # Selecionar as primeiras n_samples para cada Smoking_Status
    samples = filtered_df[filtered_df['Smoking_Status'] == smoking_status].head(n_samples)
    balanced_df = pd.concat([balanced_df, samples])
# Obter as contagens para cada Smoking_Status no DataFrame balanceado
counts = balanced_df['Smoking_Status'].value_counts()
# Calcular as porcentagens
percentages = counts / counts.sum() * 100

# Obter os valores únicos de Smoking_Status
smoking_status_values = counts.index
# Criar um array para o eixo x (categorias de Smoking_Status)
x = np.arange(len(smoking_status_values))
# Plotar o gráfico de barras com as porcentagens
bars = plt.bar(x, percentages, color=['blue', 'red', 'green'])  # Cores para cada categoria
# Definir os rótulos do eixo x
plt.xticks(x, smoking_status_values)
# Configurar o gráfico
plt.title('Distribuição de Pacientes por Tabagismo que sobreviveram ao câncer Colorretal', pad=30)
plt.xlabel('Smoking_Status')
plt.ylabel('Porcentagem de Pacientes')
# Adicionar os valores de porcentagem no topo de cada barra
for bar, percentage in zip(bars, percentages):
    plt.text(bar.get_x() + bar.get_width() / 2, bar.get_height() + 1,
             f'{percentage:.2f}%', ha='center', va='bottom')
# Ajustar o espaço superior do gráfico
plt.subplots_adjust(top=0.9)  # Aumentar o valor para dar mais espaço no topo
# Adicionar os nomes dentro das barras
plt.text(x[0], percentages.values[0] / 2, 'Nunca fumou', ha='center', va='center', color='white',  fontsize=11, fontweight='bold')
plt.text(x[1], percentages.values[1] / 2, 'Já foi fumante', ha='center', va='center', color='white',  fontsize=11, fontweight='bold')
plt.text(x[2], percentages.values[2] / 2, 'É fumante', ha='center', va='center', color='white',  fontsize=11, fontweight='bold')
plt.show()
```
![Grafico de barra consumo de Alcool e Tabagismo](https://github.com/ICEI-PUC-Minas-PMV-SI/PMV-SI-2025-1-PE7-T1-Cancer-Colorretal/blob/main/docs/img/GraficoBarraCancerColorretalAlcoolCigarro.jpg)

 #### Análise dos Dados: Tabagismo, Consumo de Álcool e Sobrevivência ao Câncer Colorretal:

<p align="justify">O tabagismo e o consumo de álcool podem influenciar na sobrevivência de pacientes com câncer colorretal. A análise dos dados mostra como esses fatores podem impactar a saúde e o tratamento da doença.</p>

#### Tabagismo e Sobrevivência:

<p align="justify">Os dados indicam que <strong>36,37%</strong> dos pacientes que <strong>nunca fumaram</strong> ou <strong>já foram fumantes</strong> sobreviveram ao câncer colorretal, enquanto <strong>27,25%</strong> dos que <strong>nunca fumaram</strong> sobreviveram. Isso sugere que, apesar de o tabagismo ser um fator de risco, parar de fumar pode ajudar a aumentar as chances de sobrevivência.</p>

#### Consumo de Álcool e Sobrevivência:

<p align="justify">A análise dos dados também mostra que <strong>44,53%</strong> dos pacientes com <strong>baixo consumo de álcool</strong>, <strong>33,36%</strong> com <strong>consumo médio</strong> e <strong>22,11%</strong> com <strong>alto consumo</strong> sobreviveram ao câncer colorretal. Esses números sugerem que o consumo excessivo de álcool pode diminuir as chances de sobrevivência.</p>

<p align="justify">O álcool pode causar danos às células, aumentando a inflamação e prejudicando o funcionamento do organismo. Além disso, ele pode enfraquecer o sistema imunológico e dificultar a recuperação dos pacientes em tratamento.</p>

#### Considerações Finais

<p align="justify">Os resultados evidenciam que tanto o tabagismo quanto o consumo excessivo de álcool podem estar associados a uma menor sobrevida dos pacientes com câncer colorretal. A adoção de hábitos saudáveis, incluindo a redução ou eliminação do consumo dessas substâncias, pode contribuir para melhores desfechos clínicos e maior eficácia dos tratamentos. Esses achados reforçam a importância de políticas públicas e campanhas de conscientização voltadas para a prevenção e o controle desses fatores de risco.</p> 

<p align="center">_______________________________________________________________________________________________________________</p>

### Comparação do Estágio no Diagnóstico e Consumo de Álcool (Dados Balanceados):
1.	O gráfico de em barras apresenta os níveis do Estágio no Diagnóstico (Stage_at_Diagnosis) do câncer colorretal em relação ao status de consumo de alcool (Alcohol_Consumption).

```python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import matplotlib.patches as mpatches # Import the module with the alias 'mpatches'
# Number of patients to sample from each Alcohol_Consumption category
n_samples = 400
# Create a new DataFrame to store the balanced data
balanced_df = pd.DataFrame()
# Loop through each Alcohol_Consumption category
for alcohol_level in [1, 2, 3]:
    # Sample n_samples from the current category
    samples = df_xlsx[df_xlsx['Alcohol_Consumption'] == alcohol_level].sample(n_samples, replace=False)
    balanced_df = pd.concat([balanced_df, samples])
# Group the balanced data by Alcohol_Consumption and Stage_at_Diagnosis and count occurrences
counts = balanced_df.groupby(['Stage_at_Diagnosis', 'Alcohol_Consumption'])['Patient_ID'].count().reset_index()
# Create a bar plot using Seaborn with custom colors
plt.figure(figsize=(10, 6))  # Adjust figure size if needed
ax = sns.barplot(x='Stage_at_Diagnosis', y='Patient_ID', hue='Alcohol_Consumption', data=counts, 
            palette={1: 'blue', 2: 'yellow', 3: 'red'})  # Custom color palette
plt.title('Comparação do Estágio no Diagnóstico e Consumo de Álcool (Dados Balanceados)')  # Translated title
plt.xlabel('Estágio no Diagnóstico')  # Translated x-axis label
plt.ylabel('Número de Pacientes')  # Translated y-axis label
# Custom legend handles with colors
legend_handles = [
    mpatches.Patch(color='blue', label='Baixo'),
    mpatches.Patch(color='yellow', label='Médio'),
    mpatches.Patch(color='red', label='Alto')
]
# Custom legend with translated title and colored handles
plt.legend(handles=legend_handles, title='Consumo de Álcool') 
plt.show()
```
![Imagem 3 Comparação do Estágio no Diagnóstico e Consumo de Álcool](https://github.com/ICEI-PUC-Minas-PMV-SI/PMV-SI-2025-1-PE7-T1-Cancer-Colorretal/blob/main/docs/img/Imagem%203%20Compara%C3%A7%C3%A3o%20do%20Est%C3%A1gio%20no%20Diagn%C3%B3stico%20e%20Consumo%20de%20%C3%81lcool.jpg)

#### Título do Gráfico: Comparação do Estágio no Diagnóstico e Consumo de Álcool (Dados Balanceados)

<p align="justify"><strong>Objetivo:</strong>  Mostrar a distribuição de pacientes com câncer colorretal em diferentes estágios da doença (I, II, III e IV), considerando seus níveis de consumo de álcool (Baixo, Médio e Alto), utilizando uma amostra balanceada de 400 pacientes por categoria.</p>

<p align="justify">O gráfico revela que o consumo baixo de álcool tem uma porcentagem maior no estágio II do diagnóstico. No entanto, ao comparar com o estágio IV do câncer colorretal, o consumo baixo de álcool apresenta uma proporção menor em relação ao consumo médio e alto. O consumo médio foi predominante nos estágios I e IV, enquanto o consumo baixo teve uma maior incidência apenas no estágio IV.</p>

### Conclusão:

<p align="justify">O gráfico permite visualizar a relação entre o consumo de álcool e o estágio do câncer colorretal, destacando possíveis tendências. Essas informações podem ajudar na formulação de hipóteses para estudos futuros e aprofundados sobre os efeitos do consumo de álcool no desenvolvimento da doença.</p>

 <p align="center">_______________________________________________________________________________________________________________</p>


### - Triagem e Estilo de Vida
#### Pré-processamento dos Dados  

Antes de realizar análises estatísticas, algumas colunas categóricas foram convertidas para valores numéricos usando **Label Encoding**. Além disso, a coluna **BMI (IMC)** foi normalizada utilizando **MinMaxScaler**.  


#### Análise Estatística Preliminar  

<p style="text-align: justify;">

A análise estatística preliminar permite compreender melhor o comportamento das variáveis categóricas e numéricas do conjunto de dados. Para isso, foram realizadas as seguintes etapas no pré-processamento:
</p>  

### Passos realizados:  

<p style="text-align: justify;">
       
1. Aplicação do **Label Encoding** para converter variáveis categóricas em valores numéricos.  
2. Armazenamento dos mapeamentos originais para futura referência.  
3. Normalização da coluna **BMI** para um intervalo entre 0 e 1.  
4. Cálculo de estatísticas descritivas, incluindo média, desvio padrão, valores mínimos e máximos.  
5. Cálculo da moda para cada coluna.  
</p>

<p style="text-align: justify;">
       
Na categoria **Triagem e Estilo de Vida**, todas as seguintes colunas foram convertidas para valores numéricos:  
</p>

- **Colonoscopy_Access** (Acesso à colonoscopia)  
- **Screening_Regularity** (Regularidade da triagem)  
- **Diet_Type** (Tipo de dieta)  
- **BMI** (Índice de Massa Corporal)  
- **Physical_Activity_Level** (Nível de atividade física)  
- **Smoking_Status** (Status de fumante)  
- **Alcohol_Consumption** (Consumo de álcool)  
- **Red_Meat_Consumption** (Consumo de carne vermelha)  
- **Fiber_Consumption** (Consumo de fibras)  

<p style="text-align: justify;">
       
A **normalização da variável BMI** garante que seus valores fiquem dentro de uma escala padronizada, facilitando comparações e prevenindo distorções nos modelos preditivos.  
</p>

<p style="text-align: justify;">
       
Além disso, as **estatísticas descritivas** fornecem uma visão clara da distribuição dos dados, enquanto a **moda** permite identificar os valores mais frequentes, auxiliando na interpretação dos padrões encontrados.  
</p>

### Código de Pré-processamento  

```python

# Lista de colunas categóricas a serem codificadas
categorical_cols = [
    'Colonoscopy_Access', 'Screening_Regularity', 'Diet_Type',
    'Physical_Activity_Level', 'Smoking_Status', 'Alcohol_Consumption',
    'Red_Meat_Consumption', 'Fiber_Consumption'
]

# Inicialização do LabelEncoder e dicionário para armazenar mapeamentos
label_encoder = LabelEncoder()
label_mappings = {}

# Aplicação do Label Encoding e armazenamento dos mapeamentos
for col in categorical_cols:
    df[col] = label_encoder.fit_transform(df[col])
    label_mappings[col] = dict(zip(label_encoder.classes_, label_encoder.transform(label_encoder.classes_)))

# Normalização da coluna BMI
scaler = MinMaxScaler()
df['BMI'] = scaler.fit_transform(df[['BMI']])
original_bmi_values = df['BMI'].values.reshape(-1, 1)  # Armazena os valores originais de BMI

# Cálculo de estatísticas descritivas
descriptive_stats = df[categorical_cols + ['BMI']].describe()

# Cálculo da moda das colunas categóricas e BMI
mode_stats = df[categorical_cols + ['BMI']].mode()

# Exibição dos resultados
print("📊 **Valores Estatísticos:**")
print(descriptive_stats.to_string(float_format='{:.2f}'.format))

print("\n🔹 **Moda das Colunas:**")
for column in categorical_cols + ['BMI']:
    mode_value = mode_stats[column].iloc[0]
    if column in label_mappings:
        original_value = next(key for key, value in label_mappings[column].items() if value == mode_value)
        print(f"🔹 Moda de **{column}**: {original_value}")
    elif column == 'BMI':
        original_bmi_mode = scaler.inverse_transform([[mode_value]])[0][0]
        print(f"🔹 Moda de **{column}**: {original_bmi_mode:.2f}")
    else:
        print(f"🔹 Moda de **{column}**: {mode_value}")
```

<p style="text-align: justify;">

A análise estatística preliminar permite compreender melhor o comportamento das variáveis categóricas e numéricas do conjunto de dados. Com a aplicação do Label Encoding, garantimos que os dados categóricos possam ser utilizados de maneira eficiente em análises posteriores. Além disso, a normalização da variável BMI (IMC) assegura que os valores fiquem em uma escala padronizada, facilitando comparações e prevenindo distorções nos modelos preditivos.
</p>

<p style="text-align: justify;">
       
As estatísticas descritivas fornecem insights importantes sobre a distribuição dos dados, incluindo a média, mediana e dispersão de cada variável. A moda, por sua vez, destaca os valores mais frequentes, permitindo identificar padrões que podem influenciar os resultados finais da pesquisa. Com essa base sólida, podemos avançar para análises mais aprofundadas, buscando relações entre hábitos de vida, exames preventivos e condições de saúde.
</p>


##### Valores Estatísticos  

| Estatística        | Colonoscopy_Access | Screening_Regularity | Diet_Type | Physical_Activity_Level | Smoking_Status | Alcohol_Consumption | Red_Meat_Consumption | Fiber_Consumption | BMI  |  
|--------------------|-------------------|----------------------|-----------|------------------------|----------------|----------------------|----------------------|-------------------|------|  
| **count**         | 89,945             | 89,945               | 89,945    | 89,945                 | 89,945         | 89,945               | 89,945               | 89,945            | 89,945  |  
| **mean**          | 0.75               | 1.20                 | 1.20      | 1.20                   | 1.30           | 1.10                 | 1.20                 | 1.30              | 0.50  |  
| **std**           | 0.43               | 0.87                 | 0.87      | 0.68                   | 0.78           | 0.70                 | 0.75                 | 0.78              | 0.29  |  
| **min**           | 0.00               | 0.00                 | 0.00      | 0.00                   | 0.00           | 0.00                 | 0.00                 | 0.00              | 0.00  |  
| **25%**           | 1.00               | 0.00                 | 0.00      | 1.00                   | 1.00           | 1.00                 | 1.00                 | 1.00              | 0.25  |  
| **50% (Mediana)** | 1.00               | 2.00                 | 1.00      | 1.00                   | 1.00           | 1.00                 | 1.00                 | 1.00              | 0.50  |  
| **75%**           | 1.00               | 2.00                 | 2.00      | 2.00                   | 2.00           | 2.00                 | 2.00                 | 2.00              | 0.75  |  
| **max**           | 1.00               | 2.00                 | 2.00      | 2.00                   | 2.00           | 2.00                 | 2.00                 | 2.00              | 1.00  |  


#### Análise dos Resultados  


#####  Moda  

| Variável                   | Moda      |  
|----------------------------|----------|  
| **Colonoscopy_Access**      | Yes      |  
| **Screening_Regularity**    | Regular  |  
| **Diet_Type**               | Western  |  
| **Physical_Activity_Level** | Low      |  
| **Smoking_Status**          | Never    |  
| **Alcohol_Consumption**     | Low      |  
| **Red_Meat_Consumption**    | Low      |  
| **Fiber_Consumption**       | Medium   |  
| **BMI**                     | 38.1     |  


<p style="text-align: justify;">
Os resultados obtidos mostram que:
</p>

- **O acesso à colonoscopia** tem como valor mais comum "Sim", indicando que a maioria das pessoas no conjunto de dados teve acesso ao exame.  
- **A regularidade do rastreamento** mais frequente é "Regular", sugerindo que os pacientes seguem uma rotina de exames periódicos.  
- **O tipo de dieta predominante** é "Ocidental", que geralmente está associada a um alto consumo de alimentos processados e menor ingestão de fibras.  
- **O nível de atividade física** mais comum é "Baixo", o que pode estar relacionado a um estilo de vida sedentário.  
- **A maioria dos indivíduos nunca fumou**, o que pode ser um fator positivo para a saúde geral da amostra.  
- **O consumo de álcool mais frequente** é "Baixo", o que indica uma possível tendência a um consumo moderado ou ocasional.  
- **O consumo de carne vermelha** e **de fibras** apresentam como valores mais comuns "Baixo" e "Médio", respectivamente, refletindo variações na dieta da amostra.  
- **O índice de massa corporal (IMC) mais frequente** é **38.1**, um valor alto que indica obesidade, sugerindo um possível risco aumentado para doenças metabólicas.  

<p style="text-align: justify;">
       
Os valores estatísticos e a moda das variáveis revelam tendências importantes no comportamento da população analisada. Os dados indicam que a maioria dos indivíduos tem acesso à colonoscopia e realiza exames regulares, o que é positivo para a prevenção de doenças. No entanto, a predominância de uma dieta ocidental, associada a um nível de atividade física baixo, pode ser um fator preocupante para a saúde geral da amostra.
</p>

<p style="text-align: justify;">
       
Outro ponto relevante é o IMC médio elevado (38.1), característico de obesidade, o que pode indicar um risco aumentado para doenças metabólicas. A análise do consumo alimentar também sugere que a ingestão de carne vermelha é predominantemente baixa, enquanto a ingestão de fibras está em um nível médio. Esses padrões podem desempenhar um papel fundamental na investigação de fatores de risco para condições gastrointestinais e outras doenças associadas à dieta e ao estilo de vida.
</p>

<p style="text-align: justify;">
       
Tentando responder às questões de pesquisa relacionadas à categoria de informações demográficas, triagem e estilo de vida, diagnóstico, características do câncer e tratamento acompanhamento e sobrevivência, utilizando métodos de estatística:
</p>


#### 1. Pergunta: Considerando estilo de vida e informações demográficas, quais os principais fatores que estão relacionados a ter ou não ter o câncer?

<p align="center">
  <img src="https://github.com/user-attachments/assets/4ad8e439-c058-49f5-a151-dfa9dc75ba79" alt="Mapa de calor de correlação 1">
</p>


<p style="text-align: justify;">
Em relação à idade e agressividade do tumor, a correlação é praticamente zero (-0.00), sugerindo que a idade não influencia a agressividade do tumor. O mesmo ocorre entre o índice de massa corporal (BMI) e a agressividade do tumor, com uma correlação muito baixa (-0.01), indicando que o BMI não tem impacto significativo sobre essa característica. Além disso, a idade e o BMI também não apresentam correlação entre si (0.00). Esses resultados sugerem que nem a idade nem o índice de massa corporal têm influência relevante na agressividade do tumor. Para identificar fatores que impactem essa característica, seria necessário ampliar o conjunto de dados e incluir novas variáveis para análise.
</p>

#### 2. Pergunta: Quais fatores de estilo de vida estão associados à reincidência do câncer após o tratamento?

<p align="center">
  <img src="https://github.com/user-attachments/assets/63315ce5-d29c-494b-99f1-a15b25c84fc0" alt="Mapa de calor de correlação 2">
</p>

<p style="text-align: justify;">

A análise revela que, embora as correlações entre as variáveis sejam baixas, com valores próximos de zero, há algumas correlações fracas entre os fatores analisados. A diagonal principal do gráfico sempre exibe uma correlação de 1.00, indicando que cada variável está perfeitamente correlacionada consigo mesma. Contudo, as demais correlações são bem próximas de zero, sugerindo que os fatores de estilo de vida analisados não apresentam uma relação forte ou significativa com a reincidência do câncer após o tratamento.
</p>


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

1) Medidas de Tendência Central e Dispersão
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

2) Resumo estatístico de algumas colunas numéricas

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

3) Medidas de Tendência Central (Média, Mediana, Moda)

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

4) Medidas de Dispersão (Desvio Padrão e Intervalo Interquartil - IQR)

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

### - Acompanhamento e Sobrevivência

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

``` python
survived_age = df[df["Survival_Status"] == 1]["Age"]
deceased_age = df[df["Survival_Status"] == 0]["Age"]


stat, p = mannwhitneyu(survived_age,deceased_age)
print(f"Estatística U: {stat}, p-valor: {p}")


stat, p = ttest_ind(survived_age, deceased_age, equal_var=False)
print(f"Estatística t: {stat}, p-valor: {p}")
```
Output:

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

``` python
stats = df[["Time_to_Recurrence", "Follow_Up_Adherence"]].describe().T
stats["mode"] = df[["Time_to_Recurrence", "Follow_Up_Adherence"]].mode().iloc[0]

print(stats)
```

Output:

| Variable         	| Count   | Mean  	| Std Dev   | Min  | 25%  | 50%  | 75%  | Max  | Mode |
|----------------------|---------|-----------|-----------|------|------|------|------|------|------|
| Time_to_Recurrence  | 89945.0 | 29.543299 | 17.268440 | 0.0  | 15.0 | 30.0 | 44.0 | 59.0 | 53   |
| Follow_Up_Adherence | 89945.0 |  0.600823 |  0.489732 | 0.0  |  0.0 |  1.0 |  1.0 |  1.0 |  1   |


##### Time_to_Recurrence (Tempo até a Recorrência do câncer):

- A média é 29,54 meses, indicando que, em média, os pacientes têm recorrência em torno desse período.
- O desvio padrão é 17,27 meses, o que mostra que há variação significativa no tempo de recorrência entre os pacientes.
- A mediana (30 meses) sugere que metade dos pacientes teve recorrência antes desse tempo, e metade depois.
- O mínimo é 0 meses, indicando que alguns pacientes tiveram recorrência imediatamente após o tratamento.
- O máximo é 59 meses, sugerindo que alguns pacientes tiveram recorrência bem depois do diagnóstico.
- A moda é 53 meses, ou seja, o tempo de recorrência mais comum foi de 53 meses.
- O tempo de recorrência varia bastante entre os pacientes (desvio padrão alto), mas a mediana e a média são próximas, indicando que os dados não estão muito enviesados.


##### Follow_Up_Adherence (Adesão ao Acompanhamento):

- A média é 0,60, indicando que 60% dos pacientes tiveram boa adesão ao acompanhamento.
- O desvio padrão é 0,49, o que faz sentido para uma variável binária (0 ou 1).
- A mediana (1.0) e o terceiro quartil (1.0) indicam que a maioria dos pacientes seguiu o acompanhamento adequadamente.
- A moda é 1, reforçando que a categoria mais comum foi "Good" (1).

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
A conclusão é que os atributos deste grupo não possuem correlação entre si, apresentando valores próximos a zero.
</p>

## Descrição dos achados
<p align="justify">
A análise abrangente do conjunto de dados de câncer colorretal revelou padrões e insights cruciais. A maioria dos pacientes é diagnosticada nos estágios I e II, com predomínio no estágio II, evidenciando a importância do diagnóstico precoce. No entanto, o tempo até o diagnóstico não parece ser um fator determinante na agressividade do tumor, que se distribui uniformemente entre diagnósticos precoces e tardios, sendo os tumores de baixa e média agressividade os mais comuns.</p>
<p align="justify">
Os pacientes geralmente possuem cobertura de seguro, acesso rápido ao diagnóstico e tratamento, com a quimioterapia sendo mais frequente que a radioterapia. A idade média dos pacientes é de 54 anos, com distribuição simétrica, e o tempo médio para recorrência é de 29,5 meses. O perfil predominante dos pacientes inclui homens, brancos, residentes em áreas urbanas, de classe média, sem histórico familiar ou prévio de câncer, com diagnóstico regular, dieta ocidental e baixa atividade física.</p>
<p align="justify">
A variabilidade na idade e no tempo de recorrência é notável, enquanto as variáveis categóricas binárias apresentam baixa variabilidade. A análise estatística não encontrou associação significativa entre o estágio do câncer e o recebimento de quimioterapia ou a realização de colonoscopia, sugerindo que outros fatores influenciam essas decisões. Esses resultados destacam a complexidade do câncer colorretal e a interação de múltiplos fatores no diagnóstico, tratamento e recorrência da doença.</p>
<p align="justify">
A análise descritiva e exploratória dos dados também trouxe achados importantes sobre a relação entre fatores como faixa etária, tabagismo, consumo de álcool e a sobrevivência ao câncer colorretal. A distribuição etária entre 35 e 75 anos apresentou maior incidência da doença, indicando uma centralidade nesse grupo etário e reforçando a importância de estratégias de prevenção direcionadas a ele.</p>
<p align="justify">
Em relação ao tabagismo e ao consumo de álcool, observou-se que ambos estão associados a uma menor sobrevida dos pacientes, sugerindo uma correlação negativa entre esses hábitos e a longevidade. A análise dos estágios do câncer em relação ao consumo de álcool indicou que, nos estágios mais avançados da doença, os pacientes com consumo moderado a alto de álcool são mais prevalentes, reforçando o impacto dessa substância nos casos mais graves.</p>
<p align="justify">
Os dados também revelam tendências importantes no perfil de saúde da população estudada. O acesso à colonoscopia e a regularidade na triagem são pontos positivos para a prevenção e detecção precoce da doença. No entanto, hábitos como uma dieta ocidental e baixos níveis de atividade física podem comprometer a saúde geral. Embora a maioria dos pacientes não fume e apresente consumo moderado de álcool, o alto IMC médio (38,1) indica uma prevalência significativa de obesidade, fator de risco para doenças metabólicas.</p>
<p align="justify">
A análise das correlações revelou relações fracas ou inexistentes entre variáveis como idade, IMC e agressividade do tumor, indicando que outros fatores podem ter maior influência na progressão da doença. O estudo desses padrões reforça a importância de políticas públicas voltadas à prevenção e controle de fatores de risco, bem como a necessidade de mais pesquisas para compreender a complexidade do câncer colorretal e seus desdobramentos clínicos.</p>

## Ferramentas utilizadas
<p align="justify">
Para a análise descritiva e exploratória sobre o dataset escolhido, com o objetivo de compreender a estrutura dos dados, detectar eventuais outliers e também, avaliar/detectar as relações existentes entre as variantes verificadas, foram empregadas as seguintes ferramentas:

* **Microsoft Excel**: Utilizado na etapa inicial para a inspeção e verificação da integridade do conjunto de dados, garantindo a qualidade e consistência das informações.
* **Google Colab**: Plataforma de notebook interativa baseada em nuvem, que possibilitou a execução de códigos Python de forma eficiente e colaborativa.
* **Python**: Linguagem de programação central do projeto, utilizada para:
    * **Análise exploratória de dados (EDA)**: Através de ferramentas de manipulação de dados tabulares e numéricos (Pandas e NumPy), realizamos a limpeza, transformação e análise estatística dos dados.
    * **Visualização de dados**: Com bibliotecas para criação de gráficos e visualizações (Matplotlib, Plotly e Seaborn ), identificamos padrões e insights relevantes nos dados.
* **Base de dados**: O arquivo CSV do Dataset: Colorectal Cancer Risk & Survival Data, do site Kaggle, https://www.kaggle.com/datasets/ankushpanday1/colorectal-cancer-risk-and-survival-data.</p>
   
## Vídeo de apresentação da Etapa 02

Nesta seção, um vídeo de, no máximo, 15 minutos deverá ser produzido. No vídeo, cada aluno do grupo deverá apresentar uma parte do trabalho realizado nesta etapa e dos achados/insights obtidos. Todos os alunos deverão participar do vídeo. Alunos que não participarem, serão penalizados na nota final da etapa.


