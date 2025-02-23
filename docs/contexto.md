# Introdução
<p align="justify">
O câncer colorretal é uma das doenças mais preocupantes na área da saúde, pois apresenta alta incidência e mortalidade. Diversos fatores, como genética, estilo de vida e alimentação, podem influenciar o surgimento da doença. A detecção precoce é um dos principais desafios, pois os sintomas podem demorar a aparecer, dificultando o diagnóstico. Nos últimos anos, avanços na tecnologia têm possibilitado novas formas de analisar e interpretar dados médicos, permitindo o desenvolvimento de ferramentas para auxiliar na identificação precoce e na prevenção desse tipo de câncer (SANTOS et al., 2024).</p>
<p align="justify">
Com o avanço da inteligência artificial, técnicas de aprendizado de máquina começaram a ser aplicadas na análise de dados clínicos. Alguns estudos demonstram que esses algoritmos podem encontrar padrões em grandes volumes de informações, tornando possível prever a progressão da doença e auxiliar médicos na tomada de decisões. Um estudo recente utilizou registros hospitalares de pacientes diagnosticados entre 2000 e 2021 e obteve uma taxa de acerto de aproximadamente 77%, destacando o estadiamento clínico como um dos fatores mais relevantes na análise da sobrevida dos pacientes (CARDOSO et al., 2023).</p>
<p align="justify">
Diante disso, este trabalho tem como objetivo reunir e organizar informações extraídas de estudos científicos para criar um conjunto de dados voltado à prevenção do câncer colorretal. A partir desses dados, será desenvolvido um modelo capaz de fazer previsões sobre a doença, analisando fatores de risco e auxiliando na identificação precoce de possíveis casos. Para isso, será necessário escolher um dataset adequado, levando em consideração a qualidade e a confiabilidade das fontes. Também será avaliada a possibilidade de utilizar bases de dados já existentes ou combinar informações de diferentes estudos para obter um conjunto de dados mais completo e representativo.</p>
<p align="justify">
A criação desse modelo pode contribuir significativamente para a área da saúde, oferecendo uma ferramenta adicional para médicos e pesquisadores. Dessa forma, espera-se que este trabalho auxilie na detecção precoce da doença e, consequentemente, aumente as chances de tratamento bem-sucedido para os pacientes.</p>

## Problema
<p align="justify">
O câncer colorretal é uma das principais causas de morte no mundo e sua incidência tem aumentado significativamente, especialmente em regiões urbanizadas e em populações com acesso desigual aos serviços de saúde. Identificar fatores de risco, padrões de tratamento e desfechos da doença é essencial para desenvolver estratégias preventivas e melhorar o prognóstico dos pacientes.
O impacto desse problema na sociedade é expressivo, pois envolve custos elevados com tratamento, perda de produtividade, além dos desafios emocionais e psicológicos para os pacientes e suas famílias. A identificação precoce e o tratamento adequado podem melhorar significativamente a taxa de sobrevivência, tornando-se um objetivo fundamental para pesquisadores e profissionais de saúde.</p>

## Questão de pesquisa

A questão de pesquisa é a base de todo o trabalho que será desenvolvido. É ela que motiva a realização da pesquisa e deverá ser adequada ao problema identificado. Ao término de sua pesquisa/experimentação, o objetivo é que seja encontrada a resposta da questão de pesquisa previamente definida.

> **Links Úteis**:
> - [Questão de pesquisa](https://www.enago.com.br/academy/how-to-develop-good-research-question-types-examples/)
> - [Problema de pesquisa](https://blog.even3.com.br/problema-de-pesquisa/)

## Objetivos preliminares
<p align="justify">
O presente projeto tem como objetivo a análise de dados relacionados ao câncer colorretal utilizando técnicas de aprendizado de máquina. Considerando a alta incidência e mortalidade dessa doença, torna-se fundamental investigar fatores de risco, padrões de tratamento e desfechos clínicos para auxiliar na tomada de decisão e aprimorar estratégias de prevenção e intervenção.</p>

## Justificativa
<p align="justify">
O câncer colorretal (CCR) configura-se como um grave problema de saúde pública, tanto no Brasil quanto em escala global. Dados provenientes do Ministério da Saúde e da Organização Mundial da Saúde (OMS) revelam um aumento progressivo na incidência e mortalidade associadas ao CCR, consolidando-o como uma das neoplasias mais prevalentes e letais. A detecção precoce assume um papel crucial no sucesso do tratamento e na elevação das taxas de sobrevida dos pacientes. Contudo, o diagnóstico em estágios iniciais representa um desafio significativo, em grande parte devido à natureza assintomática da doença em suas fases iniciais e à baixa adesão aos programas de rastreamento.</p>

<p align="justify">
Segundo o Instituto Nacional de Câncer (INCA, 2023), "a probabilidade de óbito prematuro por câncer de intestino entre indivíduos de 30 a 69 anos pode apresentar um incremento de 10% até 2030". Adicionalmente, informações provenientes dos Registros Hospitalares de Câncer (RHC) indicam que, no período de 2015 a 2019, aproximadamente 65% dos casos de câncer de intestino foram diagnosticados em estágios avançados, abrangendo todas as faixas etárias. Esta tendência alarmante sublinha a urgência da implementação de medidas preventivas e de diagnóstico precoce.</p>

<p align="justify">
A Organização Pan-Americana da Saúde (OPAS/OMS) destaca a relevância do câncer como uma das principais causas de óbito nas Américas, enfatizando a necessidade de estratégias abrangentes de prevenção e controle.</p>

<p align="justify">
No que concerne à distribuição por sexo, os tipos de câncer mais frequentemente diagnosticados em homens são: próstata (21,8%), pulmão (8,6%), colorretal (7,7%) e bexiga (4,5%). Em mulheres, os tipos mais comuns são: mama (26,1%), pulmão (8,5%), colorretal (7,9%) e útero (5,4%).</p>

<p align="justify">
No tocante à mortalidade, os cânceres que mais contribuem para o óbito em homens são: pulmão (17,5%), próstata (13,3%), colorretal (9,6%) e pâncreas (6,4%). Em mulheres, as principais causas de morte por câncer são: mama (15,7%), pulmão (16,5%), colorretal (9,6%) e pâncreas (6,6%).(OPAS)</p>

<p align="justify">
Dessa forma, a relevância do estudo se justifica pelo impacto significativo do câncer colorretal na sociedade, tanto em termos de custos para o sistema de saúde quanto no bem-estar dos pacientes e suas famílias. A aplicação de modelos de aprendizado de máquina pode contribuir para a detecção precoce junto aos médicos da atenção primária, a personalização do tratamento e a melhoria do prognóstico dos indivíduos acometidos pela doença.</p>

## Público-Alvo
<p align="justify">
O público-alvo deste projeto abrange <b>profissionais de saúde</b>, médicos, enfermeiros, pesquisadores e gestores da área médica que buscam ferramentas para otimizar a identificação de fatores prognósticos e desenvolver políticas públicas baseadas em evidências. <b>Estudantes de graduação e pós graduação</b> das áreas de saúde, informática e estatística, que poderão se beneficiar do conhecimento e das técnicas utilizadas no projeto para o desenvolvimento de suas pesquisas e atividades acadêmicas. <b>População em geral</b>, que poderá se informar sobre os fatores de risco e a importância da detecção precoce do cancer colorretal. Com base em um conjunto de dados abrangente e diversificado, serão exploradas abordagens estatísticas e computacionais para gerar insights valiosos e contribuir para o avanço no combate ao câncer colorretal.</p>

## Estado da arte

Nesta seção, deverão ser descritas outras abordagens identificadas na literatura que foram utilizadas para resolver problemas similares ao problema em questão. Para isso, faça uma pesquisa detalhada e identifique, no mínimo, 5 trabalhos que tenham utilizado dados em contexto similares e então: (a) detalhe e contextualize o problema a ser solucionado no trabalho, (b) descreva as principais características do _dataset_ utilizado, (c) detalhe quais abordagens/algoritmos foram utilizados (e seus parâmetros), (d) identifique as métricas de avaliação empregadas, e (e) fale sobre os resultados obtidos. 

### Aprendizado de máquina para prever a sobrevivência de pacientes com câncer colorretal (Referência [Scientific reports](https://www.nature.com/articles/s41598-023-35649-9))

<p align="justify">Nos últimos anos, a Inteligência Artificial (IA) e o Machine Learning (ML) começaram a ser usados na área da saúde para analisar grandes quantidades de dados médicos. Com essas ferramentas, é possível identificar padrões em exames, históricos de pacientes e fatores genéticos, ajudando os médicos a tomarem decisões mais precisas.</p>

<p align="justify">De acordo com Ludermir (2021), a automação tem sido amplamente aplicada na área da saúde, especialmente no aprimoramento dos diagnósticos médicos. Sistemas baseados em Inteligência Artificial (IA) já demonstram precisão equiparável ou superior à dos profissionais de saúde, auxiliando na identificação precoce de doenças. Um exemplo relevante é o “Médico Assistente Robô” da iFlytek, que utiliza técnicas avançadas para registrar sintomas, analisar exames de imagem e fornecer diagnósticos iniciais, otimizando a tomada de decisão médica sem substituir a atuação dos especialistas.</p>

<p align="justify">No contexto do câncer colorretal, a aplicação dessas tecnologias tem potencial para revolucionar a detecção precoce e o tratamento. Modelos de Machine Learning permitem a análise de grandes volumes de dados clínicos e laboratoriais, identificando padrões em exames de imagem, históricos médicos e fatores genéticos.</p>

<p align="justify"> Segundo Paixão et al. (2022), os avanços na capacidade computacional impactaram significativamente a detecção e predição de doenças cardiovasculares por meio da interpretação de prontuários médicos, exames de imagem e bancos de dados biológicos e genômicos. A cardiologia tem sido uma das áreas com maior produção científica envolvendo Machine Learning, desde a predição de eventos cardiovasculares até a melhoria dos diagnósticos eletrocardiográficos, demonstrando o potencial da IA como ferramenta de apoio à pesquisa médica.</p>

<p align="justify"><b>(a) Detalhamento e Contextualização do Problema:</b></p>
<p align="justify">O câncer colorretal é um dos tipos de câncer mais comuns no mundo e pode ser fatal quando não identificado precocemente. O diagnóstico muitas vezes acontece em estágios avançados, pois os sintomas iniciais podem ser leves ou até inexistentes. Por isso, pesquisadores têm buscado novas tecnologias para melhorar a detecção e o tratamento dessa doença.</p>

<p align="justify"><b>(b) Descrição das Principais Características do Dataset Utilizado:</b></p>
<p align="justify">O estudo utilizou dados do <b>Registro Hospitalar de Câncer do Estado de São Paulo (RHC-SP)</b>, administrado pela <b>Fundação Oncocentro do Estado de São Paulo (FOSP)</b>, abrangendo pacientes diagnosticados com câncer colorretal entre <b>2000 e 2021</b>. A base de dados cobre uma população de aproximadamente <b>30 milhões de habitantes e inclui 31.916 pacientes elegíveis com diagnóstico confirmado</b>. Para a análise de sobrevida, foram considerados apenas pacientes com acompanhamento disponível, resultando em <b>29.670 casos para 1 ano de sobrevida, 26.231 para 3 anos e 23.338 para 5 anos.</b></p>

<p align="justify"><b>(c) Abordagens/Algoritmos Utilizados (e seus Parâmetros):</b></p>
<p align="justify">Foram testados três modelos de inteligência artificial para prever a sobrevida de pacientes com câncer colorretal, usando dados do <b>Registro Hospitalar de Câncer do Estado de São Paulo (RHC-SP)</b>:

<ul>
  <li><p align="justify"><b>CoxNet:</b> Baseado em um modelo estatístico tradicional, esse algoritmo identifica quais fatores mais influenciam a sobrevida dos pacientes. Ele também filtra as informações menos relevantes para melhorar as previsões.</p></li>
  <li><p align="justify"><b>Random Survival Forest (RSF):</b> Funciona como uma "floresta" de decisões que analisa padrões nos dados para estimar o tempo de sobrevida, levando em conta diversas variáveis dos pacientes.</p></li>
  <li><p align="justify"><b>DeepSurv:</b> Utiliza redes neurais (um tipo avançado de IA inspirado no cérebro humano) para identificar relações complexas entre as informações dos pacientes e o tempo de sobrevida.</p></li>
</ul>
  
<p align="justify">Cada modelo foi ajustado e testado para garantir a <b>maior precisão possível</b> na previsão da sobrevida dos pacientes.</b>

<p align="justify"><b>(d) Métricas de Avaliação Empregadas:</b></p>
<p align="justify">Para medir o desempenho dos algoritmos de inteligência artificial na predição da sobrevida de pacientes com câncer colorretal, foram usadas três principais métricas:</p>

<p align="justify"><b>Índice de Concordância (C-index):</b> Avalia se o modelo consegue ordenar corretamente os tempos de sobrevida dos pacientes. Quanto mais próximo de 1, melhor a precisão do modelo na diferenciação dos casos.</p>
<p align="justify"><b>Brier Score:</b> Mede o quão bem o modelo calibra suas previsões em relação aos dados reais. Valores mais baixos indicam maior precisão.</p>
<p align="justify"><b>Erro Absoluto Médio (MAE):</b> Calcula a diferença média entre os tempos de sobrevida previstos e os reais. Quanto menor o erro, mais próximas da realidade são as previsões.</p>

<p align="justify">Além disso, foram usadas as curvas de <b>Kaplan-Meier</b> para comparar as previsões dos modelos com os dados observados ao longo do tempo, ajudando a validar a precisão dos algoritmos. Essas métricas permitiram uma análise clara da eficácia de cada modelo na predição da sobrevida dos pacientes.</p>

<p align="justify"><b>(e) Resultados Obtidos:</b></p>
<p align="justify">A análise mostrou que a taxa de sobrevida dos pacientes com câncer colorretal diminui com o tempo: <b>77% sobrevivem 1 ano, 59% chegam a 3 anos e 53,2% atingem 5 anos</b> após o diagnóstico.</p>

<p align="justify"><b>Entre os modelos testados, o DeepSurv teve o melhor desempenho, fazendo previsões mais precisas e com menor margem de erro. Ele superou os modelos CoxNet e Random Survival Forest (RSF) no Índice de Concordância (C-index)</b>, o que significa que ordenou melhor os tempos de sobrevida dos pacientes. Além disso, o <b>Brier Score</b> e as <b>curvas de Kaplan-Meier</b> indicaram que suas previsões foram mais próximas dos dados reais.</p>

<p align="justify">Esses resultados mostram que a inteligência artificial pode prever a sobrevida de pacientes com câncer colorretal com <b>mais precisão e flexibilidade</b> do que os modelos estatísticos tradicionais.</p>

**(f) Atributos:**
<ul>
<li><p align="justify">Idade: variável contínua representando a idade do paciente no momento do diagnóstico.</p></li>
<li><p align="justify">Sexo: variável categórica indicando o gênero do paciente (masculino ou feminino).</p></li>
</ul>

### Avaliação de dois Algoritmos de Machine Learning na Previsão do Câncer de Mama (Referência [FATEC](https://www.pesquisafatec.com.br/ojs/index.php/efatec/article/view/266))

<p align="justify"><b>(a) Detalhamento e Contextualização do Problema:</b> O câncer de mama continua sendo um grande desafio para a saúde pública, especialmente pelo fato de seu diagnóstico envolver múltiplas etapas – desde exames clínicos até análises de tecidos e imagens detalhadas. Diante dessa complexidade, pesquisadores têm buscado alternativas para agilizar e aprimorar a precisão dos processos. Uma das estratégias que vem ganhando espaço é o uso de sistemas computacionais capazes de aprender com dados históricos, identificando padrões que humanos podem não perceber facilmente. Essas ferramentas, quando bem aplicadas, não só aceleram a análise como também minimizam variações nas interpretações pessoais. No entanto, para que os resultados sejam realmente úteis, dois pontos são fundamentais: selecionar o modelo mais adequado para cada situação e garantir que as informações utilizadas passem por um rigoroso preparo prévio.</p>

<p align="justify"><b>(b) Descrição das Principais Características do Dataset Utilizado:</b> Para a elaboração dos algoritmos de Machine Learning foi utilizada uma base de dados da Kaggle, que possui inúmeros dados das mais diversas áreas para utilização em trabalhos relacionados à ciência de dados. Nesse caso foram utilizados dados de pacientes que tiveram ou não câncer de mama. A base de dados em questão dispõe de centenas de registros com inúmeros atributos referentes às características do possível tumor, sendo trinta e três colunas de atributos e quinhentos e sessenta e nove linhas de registros disponíveis.</p>

<p align="justify"><b>(c) Abordagens/Algoritmos Utilizados (e seus Parâmetros):</b> O trabalho explorou duas estratégias computacionais distintas para analisar dados médicos relacionados ao câncer de mama. A primeira delas envolveu um método baseado em vetores de suporte, conhecido por sua capacidade de lidar com problemas de classificação complexos, o SVM (Máquina de Vetores de Suporte) .A segunda técnica adotada foi um algoritmo probabilístico clássico, fundamentado no teorema de Bayes. (algoritmo Naive Bayes).</p>

<p align="justify"><b>(d) Métricas de Avaliação Empregadas:</b> A acurácia e a matriz de confusão como métricas para analisar o desempenho dos algoritmos e também a validação cruzada para gerar resultados com a mistura desses dados. Os dois algoritmos, o Naive Bayes e o SVM (Máquina de Vetor de Suporte), apresentaram acurácia média de 90%.</p>

<p align="justify">
<b>(e) Resultados Obtidos:</b> Ao analisar os resultados obtidos pelos algoritmos de Machine Learning aplicados, foi possível concluir que o SVM (Máquina de Vetores de Suporte) obteve um resultado superior quando trabalhado com previsores escalonados (características ajustadas para ficarem na mesma escala), tendo a maior taxa de assertividade de todos os testes realizados, de 97,88%. Já com os previsores comuns, o melhor resultado é do apresentado pelo algoritmo Naive Bayes, que obteve um resultado superior, de 93,82% de assertividade. Portanto, ao analisar os resultados obtidos, o mais recomendado para se utilizar seria o algoritmo SVM com os previsores escalonados.</p>

<p align="justify"><b>(f) Atributos:</b> Os atributos são as “características” que os algoritmos usaram para prever se um tumor de mama é benigno (não canceroso) ou maligno (canceroso). Eles foram extraídos do dataset e podem ser divididos em três grupos principais:</p>

#### 1. Medidas Básicas das Células (Figura 1)  
- **Raio Médio (`radius_mean`)**: Tamanho médio das células.  
- **Textura Média (`texture_mean`)**: Como a superfície das células parece nas imagens.  
- **Perímetro Médio (`perimeter_mean`)**: Tamanho da borda das células.  
- **Área Média (`area_mean`)**: Espaço que as células ocupam.  
- **Suavidade (`smoothness_mean`)**: Quão uniformes são as células.  
- **Compacidade (`compactness_mean`)**: Relação entre o perímetro e a área (mede a "forma compacta").  
- **Concavidade (`concavity_mean`)**: Profundidade das partes "afundadas" nas células.  
- **Simetria (`symmetry_mean`)**: Quão simétricas são as células.  
- **Dimensão Fractal (`fractal_dimension_mean`)**: Complexidade da borda das células.  

#### 2. Medidas de Dispersão (Erro Padrão)  
- Para cada medida básica, foi calculado o **erro padrão** (ex: `radius_se`, `texture_se`).  
- Isso mostra **quão variáveis** são as medidas entre as células de um mesmo tumor.  

#### 3. Valores Extremos ("Worst")  
- Representam os **piores casos** observados em cada paciente.  
- Exemplo: `radius_worst` (maior raio encontrado), `concavity_worst` (concavidade mais acentuada).  
- Esses atributos ajudam a identificar tumores mais agressivos.  

### The Application of Machine Learning in Cervical Cancer Prediction (Referência [ACM](https://dl.acm.org/doi/10.1145/3468891.3468894))

<p align="justify"><b>(a) Detalhamento e Contextualização do Problema:</b> O trabalho aborda o problema da previsão de câncer cervical utilizando modelos de aprendizado de máquina. O câncer cervical é uma condição grave, mas altamente tratável se diagnosticada precocemente. O objetivo é desenvolver modelos preditivos que possam identificar casos positivos de câncer cervical com maior precisão. Para isso, a pesquisa busca reduzir a pressão sobre o sistema de saúde, aumentando a eficiência na detecção precoce da doença. O problema central é a desbalanceamento dos dados, onde as amostras positivas são significativamente menos frequentes que as amostras negativas, o que pode levar a modelos que não detectam adequadamente os casos positivos.</p>

<p align="justify"><b>(b) Descrição das Principais Características do Dataset Utilizado:</b> O dataset utilizado apresenta algumas características importantes:

#### Distribuição das Variáveis  
<p align="justify">
As variáveis categóricas (características qualitativas) não estão uniformemente distribuídas. Por exemplo, se tivermos uma variável categórica como "tipo de câncer", onde as categorias são "câncer cervical", "câncer de mama" e "câncer de pulmão", é provável que a frequência de casos de câncer cervical seja muito maior ou menor do que as outras categorias. Essa falta de uniformidade pode afetar a modelagem, já que algoritmos de aprendizado de máquina podem ser tendenciosos para as categorias com maior número de amostras.
Já as variáveis numéricas, não seguem uma distribuição normal. Isso significa que os dados numéricos (como idades, níveis de marcador tumoral, etc.) não se distribuem em uma forma de sino típica da distribuição normal (também conhecida como distribuição gaussiana).</p>

Em uma distribuição normal:
- A maioria dos valores está próxima da média.  
- Os dados são simétricos em torno da média.  
- Os valores extremos (muito altos ou muito baixos) são raros.  

Por outro lado, se uma variável numérica não seguir essa distribuição, ela pode apresentar:  
- Assimetria (a distribuição pode estar inclinada para a direita ou para a esquerda).  
- Presença de outliers (valores extremos que podem influenciar a média e outras estatísticas).  
- Distribuições bimodais (duas "picos" distintos na frequência).  

#### Desbalanceamento dos Dados  
<p align="justify">
Existe uma notável desproporção entre os casos positivos e negativos, o que justifica a necessidade de utilizar versões ponderadas dos modelos para melhorar a precisão na previsão de casos positivos.so significa que as classes de um conjunto de dados não estão representadas de maneira igualitária.</p>

#### Composição dos Dados  
<p align="justify">
Embora não estejam explicitadas, presume-se que as variáveis incluem informações clínicas e demográficas que podem influenciar a probabilidade de desenvolvimento de câncer cervical.</p>

<p align="justify"><b>(c) Abordagens/Algoritmos Utilizados (e seus Parâmetros):</b> Foram utilizados quatro abordagens principais de aprendizado de máquina:</p>

#### Regressão Logística:

-	Versões ponderadas (proporção 1:9 para negativos versus positivos) e não ponderadas.
-	Foco na relação linear entre as variáveis independentes e dependentes.

#### Árvore de Decisão:

-	Controlada pelo parâmetro "min samples split" (mínimo de amostras necessárias para dividir um nó interno), onde um maior valor resulta em uma árvore mais simples.
-	Construídas versões ponderadas e não ponderadas.

#### Random Forest:

-	Composta por múltiplas árvores de decisão.
-	O número ideal de árvores foi determinado como sendo 7.
-	Inclui versões ponderadas e não ponderadas.

#### Adaboosting:

-	Cria um classificador forte a partir de classificadores fracos, corrigindo erros iterativamente.
-	Também possui versões ponderadas e não ponderadas.

<p align="justify"><b>(d) Métricas de Avaliação Empregadas:</b> As métricas de avaliação utilizadas para medir o desempenho dos modelos incluem:</p>

-	**Acurácia**: Medida de quão frequentemente o modelo faz previsões corretas.
-	**Área sob a curva ROC (Receiver Operating Characteristic)**: Avalia a capacidade do modelo em distinguir entre classes.
-	**Área sob a curva de precisão-recall (PR)**: Medida que considera a proporção de verdadeiros positivos em relação a todos os positivos previstos.
-	**Matrizes de Confusão**: Usadas para calcular as taxas de verdadeiros positivos, falsos positivos, verdadeiros negativos e falsos negativos.

<p align="justify"><b>(e) Resultados Obtidos:</b> Os resultados indicam que:</p>

-	Para o conjunto de treinamento das versões não ponderadas, o modelo Adaboosting apresentou a maior acurácia e áreas mais altas sob as curvas ROC e PR.
-	No conjunto de teste não ponderado, a árvore de decisão teve a maior acurácia, enquanto o random forest apresentou as maiores áreas sob as curvas ROC e PR.
-	Para as versões ponderadas, a árvore de decisão teve a maior acurácia e área sob a curva ROC, enquanto o Adaboosting teve a maior área sob a curva PR.
-	O random forest demonstrou a maior acurácia para o conjunto de teste ponderado, e a regressão logística teve as maiores áreas sob as curvas ROC e PR nesse contexto.
-	Embora modelos simples como a regressão logística e a árvore de decisão apresentem menor acurácia, eles tendem a evitar o problema de sobreajuste, enquanto modelos mais complexos como random forest e Adaboosting oferecem melhor capacidade de ajuste, mas podem ser mais propensos a sobreajustar.
<p align="justify">
Esses resultados sugerem que, embora modelos mais simples possam ser preferíveis em certas condições, o uso de técnicas de aprendizado de máquina mais complexas pode aumentar a precisão na detecção de casos positivos, o que é crucial para o diagnóstico precoce do câncer cervical.</p>

# Descrição do _dataset_ selecionado

Nesta seção, você deverá descrever detalhadamente o _dataset_ selecionado. Lembre-se de informar o link de acesso a ele, bem como, de descrever cada um dos seus atributos (a que se refere, tipo do atributo etc.), se existem atributos faltantes etc.

# Canvas analítico

Nesta seção, você deverá estruturar o seu Canvas Analítico. O Canvas Analítico tem o papel de registrar a organização das ideias e apresentar o modelo de negócio. O Canvas Analítico deverá ser preenchido integralmente mesmo que você não tenha "tantas certezas".

> **Links Úteis**:
> - [Modelo do Canvas Analítico](https://github.com/ICEI-PUC-Minas-PMV-SI/PesquisaExperimentacao-Template/blob/main/help/Software-Analtics-Canvas-v1.0.pdf)

# Vídeo de apresentação da Etapa 01

Nesta seção, um vídeo de, 5 a 8 minutos deverá ser produzido. No vídeo, cada aluno do grupo deverá apresentar uma parte do trabalho realizado nesta etapa. Todos os alunos deverão participar do vídeo. Alunos que não participarem, serão penalizados na nota final da etapa.

# Referências

Inclua todas as referências (livros, artigos, sites, etc) utilizados no desenvolvimento do trabalho utilizando o padrão ABNT.

> **Links Úteis**:
> - [Padrão ABNT PUC Minas](https://portal.pucminas.br/biblioteca/index_padrao.php?pagina=5886)
>
<p align="justify">
CARDOSO, Lucas Buk; PARRO, Vanderlei Cunha; PERES, Stela Verzinhasse; CURADO, Maria Paula; FERNANDES, Gisele Aparecida; WÜNSCH FILHO, Victor; TOPORCOV, Tatiana Natasha. Aprendizado de máquina para prever a sobrevivência de pacientes com câncer colorretal. Scientific Reports, v. 13, art. 8874, 2023. Disponível em: https://www.nature.com/articles/s41598-023-35649-9. Acesso em: 22 fev. 2025.</p>

<p align="justify">
INSTITUTO NACIONAL DE CÂNCER. INCA prevê aumento da mortalidade prematura por câncer de intestino até 2030. 27 jan. 2023. Disponível em: https://www.gov.br/inca/pt-br/assuntos/noticias/2023/inca-preve-aumento-da-mortalidade-prematura-por-cancer-de-intestino-ate-2030#:~:text=INCA%20prev%C3%AA%20aumento%20da%20mortalidade%20prematura%20por%20c%C3%A2ncer%20de%20intestino%20at%C3%A9%202030,-Nenhuma%20regi%C3%A3o%20brasileira&text=A%20probabilidade%20de%20%C3%B3bito%20prematuro,aumento%20de%2010%25%20at%C3%A9%202030. Acesso em: 22 fev. 2025.</p>

<p align="justify">
KASSIM, Z.; ZAKI, W. M. D. W.; AWANG, S. R. Cervical cancer risk factors classification using machine learning. In: INTERNATIONAL CONFERENCE ON ARTIFICIAL INTELLIGENCE IN COMPUTER SCIENCE AND ARTIFICIAL INTELLIGENCE (AICSAI), 2021, Langkawi, Malaysia. Proceedings of the International Conference on Artificial Intelligence in Computer Science and Artificial Intelligence (AICSAI). New York: ACM, 2021. p. 1–5. Disponível em: https://dl.acm.org/doi/10.1145/3468891.3468894. Acesso em: 18 fev. 2025.</p>

<p align="justify">
LUDERMIR, Teresa Bernarda. Inteligência Artificial. Estudos Avançados, v. 35, n. 101, p. 273-289, jan./abr. 2021. Disponível em: https://www.scielo.br/j/ea/a/wXBdv8yHBV9xHz8qG5RCgZd/?lang=pt. Acesso em: 22 fev. 2025. DOI: 10.1590/s0103-4014.2021.35101.007.</p>

<p align="justify">
MULHO, João Augusto Druizian; DUARTE, Maurício. Avaliação de dois Algoritmos de Machine Learning na Previsão do Câncer de Mama. Revista Eletrônica e-Fatec, v. 13, n. 1, 2023. Publicado em: 01 jun. 2023.  Disponível em: https://www.pesquisafatec.com.br/ojs/index.php/efatec/article/view/266. Acesso em: 22 fev. 2025.</p>

<p align="justify">
ORGANIZAÇÃO PAN-AMERICANA DA SAÚDE (OPAS). Tópicos de Saúde: Câncer. Disponível em: https://www.paho.org/pt/topicos/cancer. Acesso em: 23 fev. 2025.</p>

<p align="justify">
PAIXÃO, G. M. M. et al. Machine Learning na Medicina: Revisão e Aplicabilidade. Arquivos Brasileiros de Cardiologia, v. 118, n. 1, jan. 2022. Disponível em: https://doi.org/10.36660/abc.20200596. Acesso em: 22 fev. 2025.</p>

<p align="justify">
SANTOS, Jeferson Antônio; NASCIMENTO FILHO, Antonio Carlos Maniglia; HISSAYASSU, Gabriela Yaeko; PIASSA, João Pedro Monteiro; SILVA, Pedro Henrique de Souza Sandim. Câncer colorretal – uma revisão abrangente sobre a epidemiologia, fatores de risco, fisiopatologia, diagnóstico e tratamento. Brazilian Journal of Health Review, Curitiba, v. 7, n. 2, p. 01-12, mar./abr. 2024. Disponível em: https://ojs.brazilianjournals.com.br/ojs/index.php/BJHR/article/view/68695/48709. Acesso em: 23 fev. 2025.</p>

