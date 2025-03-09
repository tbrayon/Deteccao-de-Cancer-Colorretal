# Introdução
<p align="justify">
O câncer colorretal é uma das doenças mais preocupantes na área da saúde, pois apresenta alta incidência e mortalidade. Diversos fatores, como genética, estilo de vida e alimentação, podem influenciar o surgimento da doença. A detecção precoce é um dos principais desafios, pois os sintomas podem demorar a aparecer, dificultando o diagnóstico. Nos últimos anos, avanços na tecnologia têm possibilitado novas formas de analisar e interpretar dados médicos, permitindo o desenvolvimento de ferramentas para auxiliar na identificação precoce e na prevenção desse tipo de câncer (SANTOS et al., 2024).</p>
<p align="justify">
Com o avanço da inteligência artificial, técnicas de aprendizado de máquina começaram a ser aplicadas na análise de dados clínicos. Alguns estudos demonstram que esses algoritmos podem encontrar padrões em grandes volumes de informações, tornando possível prever a progressão da doença e auxiliar médicos na tomada de decisões. Um estudo recente utilizou registros hospitalares de pacientes diagnosticados entre 2000 e 2021 e obteve uma taxa de acerto de aproximadamente 77%, destacando o estadiamento clínico como um dos fatores mais relevantes na análise da sobrevida dos pacientes (CARDOSO et al., 2023).</p>
<p align="justify">
Diante disso, este trabalho tem como objetivo reunir e organizar informações extraídas de estudos científicos para a construção de um conjunto de dados voltado à análise do câncer colorretal. A partir desse conjunto, serão examinadas as informações disponíveis para identificar possíveis padrões relacionados à doença, considerando fatores de risco e outras variáveis relevantes. Para isso, será utilizado o dataset "Colorectal Cancer Risk & Survival Data", sobre o câncer colorretal, levando em conta a qualidade e a confiabilidade das fontes. Além disso, será avaliada a viabilidade de utilizar bases de dados já existentes ou combinar informações de diferentes estudos, a fim de obter um conjunto de dados mais abrangente para futuras análises.</p>
<p align="justify">
A criação desse modelo pode contribuir significativamente para a área da saúde, oferecendo uma ferramenta adicional para médicos e pesquisadores. Dessa forma, espera-se que este trabalho auxilie na detecção precoce da doença e, consequentemente, aumente as chances de tratamento bem-sucedido para os pacientes.</p>

## Problema
<p align="justify">
O câncer colorretal é uma das principais causas de morte no mundo e sua incidência tem aumentado significativamente, especialmente em regiões urbanizadas e em populações com acesso desigual aos serviços de saúde. Identificar fatores de risco, padrões de tratamento e desfechos da doença é essencial para desenvolver estratégias preventivas e melhorar o prognóstico dos pacientes.
O impacto desse problema na sociedade é expressivo, pois envolve custos elevados com tratamento, perda de produtividade, além dos desafios emocionais e psicológicos para os pacientes e suas famílias. A identificação precoce e o tratamento adequado podem melhorar significativamente a taxa de sobrevivência, tornando-se um objetivo fundamental para pesquisadores e profissionais de saúde.</p>

## Questão de pesquisa
<p align="justify">
As questões de pesquisa a seguir foram elaboradas para investigar os principais fatores associados ao câncer colorretal, incluindo diagnóstico, tratamento, reincidência e nível de agressividade do tumor.</p>
<p align="justify">
1. Considerando os atributos relacionados às <strong>informações demográficas e ao diagnóstico e tratamento</strong>, qual o tratamento é mais recomendável?</p>
<p align="justify">  
2. Quais fatores de <strong>estilo de vida</strong> estão associados à <stong>reincidência do câncer após o tratamento</stong>?</p> 
<p align="justify">
3. Considerando <strong>estilo de vida, status socioeconômico e informações demográficas</strong>, quais os principais fatores que estão relacionados ao nível de agressividade do tumor?</p>  
<p align="justify">
4. Considerando os atributos relacionados ao <strong>diagnóstico e tratamento</strong>, existe uma relação com o fato de o paciente ter se submetido ao exame de colonoscopia?</p>  

## Objetivos preliminares
#### Objetivo Geral
<p align="justify">
O presente projeto tem como objetivo geral desenvolver um modelo preditivo baseado em aprendizado de máquina para a análise de fatores de risco do câncer colorretal. Para isso, será estruturado, a partir de um dataset de pacientes com câncer colorretal, conjuntos de dados que permitam a extração de padrões relevantes, possibilitando a identificação de variáveis que influenciam o diagnóstico, o prognóstico e a recorrência da doença. Com isso, busca-se fornecer uma ferramenta que possa ser utilizada por profissionais da saúde e pesquisadores para aprimorar estratégias de diagnóstico e tratamento do câncer colorretal.</p>

#### Objetivos Específicos
<p align="justify">
<strong>1.	Coletar e organizar dados relevantes:</strong> Estruturar um conjunto de dados confiável e abrangente sobre pacientes diagnosticados com câncer colorretal, considerando variáveis demográficas, socioeconômicas, de estilo de vida e de tratamento, incluindo o impacto do exame de colonoscopia nos desfechos clínicos.</p>
<p align="justify">
<strong>2.	Analisar fatores de risco e recorrência:</strong> Identificar e quantificar os principais fatores associados à reincidência do câncer após o tratamento, incluindo hábitos de vida e tipo de tratamento realizado.</p>
<p align="justify">
<strong>3.	Investigar a relação entre fatores socioeconômicos e a agressividade do tumor:</strong> Analisar a influência do estilo de vida, do status socioeconômico e das informações demográficas no nível de agressividade do tumor, verificando padrões que possam impactar o prognóstico da doença.</p>
<p align="justify">
<strong>4.	Desenvolver um modelo de aprendizado de máquina:</strong> Implementar e treinar algoritmos preditivos para identificar padrões associados à incidência, agressividade e recorrência da doença, bem como avaliar a recomendação de tratamentos mais eficazes.</p>
<p align="justify">
<strong>5.	Validar a precisão do modelo:</strong> Testar e ajustar o modelo utilizando métricas estatísticas para garantir sua confiabilidade na predição de casos e na análise de fatores prognósticos.</p>
<p align="justify"> 
<strong>6.	Aplicar os resultados para suporte à tomada de decisão:</strong> Desenvolver uma abordagem prática que auxilie médicos, pesquisadores e gestores de saúde na personalização dos tratamentos, na identificação precoce de casos de alto risco e na melhoria do prognóstico dos pacientes.</p>
<p align="justify"> 
<strong>7.	Divulgar os achados da pesquisa:</strong> Publicar os resultados em periódicos científicos e disponibilizar o modelo para a comunidade acadêmica, médica e rede pública de saúde, oferecendo suporte ao tratamento do câncer e 
colaboração à sociedade.</p>
<p align="justify"> 
Com a implementação deste projeto, espera-se contribuir significativamente para o avanço da medicina preditiva, auxiliando na redução da mortalidade e dos impactos socioeconômicos associados ao câncer colorretal.</p>

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
O público-alvo deste projeto abrange <b>profissionais de saúde , médicos, enfermeiros, pesquisadores e gestores da área médica</b> que buscam ferramentas para otimizar a identificação de fatores prognósticos e desenvolver políticas públicas baseadas em evidências. <b>Estudantes de graduação e pós graduação</b> das áreas de saúde, informática e estatística, que poderão se beneficiar do conhecimento e das técnicas utilizadas no projeto para o desenvolvimento de suas pesquisas e atividades acadêmicas. <b>População em geral</b>, que poderá se informar sobre os fatores de risco e a importância da detecção precoce do cancer colorretal. Com base em um conjunto de dados abrangente e diversificado, serão exploradas abordagens estatísticas e computacionais para gerar insights valiosos e contribuir para o avanço no combate ao câncer colorretal.</p>

## Estado da arte
<p align="justify">
Nesta seção, deverão ser descritas outras abordagens identificadas na literatura que foram utilizadas para resolver problemas similares ao problema em questão. Para isso, faça uma pesquisa detalhada e identifique, no mínimo, 5 trabalhos que tenham utilizado dados em contexto similares e então: (a) detalhe e contextualize o problema a ser solucionado no trabalho, (b) descreva as principais características do _dataset_ utilizado, (c) detalhe quais abordagens/algoritmos foram utilizados (e seus parâmetros), (d) identifique as métricas de avaliação empregadas, e (e) fale sobre os resultados obtidos. </p>

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

---

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

---

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

---

###  Estudo: Colorectal Cancer Detected by Machine Learning Models Using Conventional Laboratory Test Data (Referência [SagePub](https://journals.sagepub.com/doi/full/10.1177/15330338211058352))

#### Data do estudo:  20/11/2021

<p align="justify"><strong> a) detalhe e contextualize o problema a ser solucionado no trabalho: </strong> Atualmente, as formas mais utilizadas de detecção do câncer colorretal são a colonoscopia e a sigmoidoscopia, que são processos invasivos e complexos. O estudo tem como objetivo identificar o câncer colorretal através dos resultados de exames convencionais realizados por pacientes. O estudo utiliza modelos de Machine Learning para encontrar a presença da doença de forma não invasiva e com uma grande taxa de acerto, utilizando dados reais de exames de pacientes com diagnósticos positivos e negativos da doença. </p>

<p align="justify"><strong>(b) descreva as principais características do *dataset* utilizado: </strong> O estudo utiliza prontuários eletrônicos de pacientes com câncer colorretal e indivíduos saudáveis que visitaram o hospital The Sixth Affiliated Hospital da universidade Sun Yat-sen em Guangdong, na China. Os prontuários incluem dados demográficos, informações de internação, resultados de exames, sinais vitais, diagnósticos e dados de tratamento de cada paciente. O estágio da doença foi dividido em inicial (níveis 0, I e II) e avançado (níveis III e IV). </p>

Os dados provenientes dos prontuários que foram utilizados:  
| Parâmetro | Tradução |  
|---------|-------------------|  
| Sex (male) | Sexo (masculino) |  
| Age (years) | Idade (anos) |  
| CEA (ng/mL) – carcinoembryonic antigen | CEA (ng/mL) – antígeno carcinoembrionário |  
| α-fetoprotein (ng/mL) | α-fetoproteína (ng/mL) |  
| Alanine transaminase (U/L) | Alanina aminotransferase (U/L) |  
| Aspartate transaminase (U/L) | Aspartato aminotransferase (U/L) |  
| γ-glutamyltransferase (U/L) | γ-glutamiltransferase (U/L) |  
| Triglycerides (mmol/L) | Triglicerídeos (mmol/L) |  
| Total cholesterol (mmol/L) | Colesterol total (mmol/L) |  
| HDL (mmol/L) – high-density lipoprotein | HDL (mmol/L) – lipoproteína de alta densidade |  
| LDL (mmol/L) – low-density lipoprotein | LDL (mmol/L) – lipoproteína de baixa densidade |  
| ApoA1 (g/L) | ApoA1 (g/L) |  
| ApoB (g/L) | ApoB (g/L) |  
| Lipoprotein (a) (g/L) | Lipoproteína (a) (g/L) |  
| hs-CRP (mg/L) – high-sensitivity C-reactive protein | hs-CRP (mg/L) – proteína C reativa de alta sensibilidade |  
| Red blood cells (10¹²/L) | Glóbulos vermelhos (10¹²/L) |  
| Hemoglobin (g/L) | Hemoglobina (g/L) |  
| White blood cells (10⁹/L) | Glóbulos brancos (10⁹/L) |  
| Neutrophils (10⁹/L) | Neutrófilos (10⁹/L) |  
| Lymphocytes (10⁹/L) | Linfócitos (10⁹/L) |  
| Monocytes (10⁹/L) | Monócitos (10⁹/L) |  
| Eosinophils (10⁹/L) | Eosinófilos (10⁹/L) |  
| Platelets (10⁹/L) | Plaquetas (10⁹/L) |  
| Early colon cancer | Câncer de cólon inicial |  
| Late colon cancer | Câncer de cólon avançado |  
| Early rectal cancer | Câncer retal inicial |  
| Late rectal cancer | Câncer retal avançado |


<p align="justify"><strong> (c) detalhe quais abordagens/algoritmos foram utilizados (e seus parâmetros): </strong> Cinco modelos de Machine Learning foram utilizados: Logistic regression (LR), random forest (RF), k-nearest neighbors (KNN), support vector machine (SVM) e naive Bayes. Após um estudo de coeficientes de correlação de parâmetros com a presença da doença, os parâmetros utilizados em cada um dos cinco modelos foram: </p>

* alanina aminotransferase (ALT),   
* gama glutamil transferase (GGT),   
* lipoproteína de baixa densidade (LDL),  
* lipoproteína de alta densidade (HDL),   
* triglicérides (TG),   
* proteína C-reativa de alta sensibilidade (hs-CRP),   
* lipoproteína a (Lp(a)),   
* antígeno carcinoembrionário (CEA),   
* neutrófilos (NEU),   
* linfócitos (LYM),   
* hemoglobina (HGB), e   
* plaquetas (PLT).

<p align="justify"><strong> (d) identifique as métricas de avaliação empregadas: </strong> Antes da execução dos testes, foram utilizados os seguintes critérios de seleção para os pacientes com câncer do dataset final (1) pacientes no primeiro diagnóstico da doença e (2) pacientes entre 30 e 70 anos de idade. Foram excluídos dos testes pacientes com (1) qualquer histórico de câncer, (2) mais de cinco comorbidades além do câncer colorretal e (3) pacientes com dados incompletos.   
Para os pacientes do grupo de controle, foram utilizados os seguintes critérios de inclusão (1) pacientes entre 30 e 70 anos e (2) fizeram exames completos no hospital.  
Os modelos foram avaliados com base nas seguintes métricas: Área sob a curva (AUCs), sensibilidade (sensitivity), especificidade (specificity), valores de previsão positivos (PPV) e valores de previsão negativos (NPV) </p>

<p align="justify"><strong> (e) fale sobre os resultados obtidos: </strong> Com base em 1164 registros médicos, sendo 582 pacientes com câncer colorretal e 582 pacientes saudáveis do grupo de controle, o modelo de regressão logística (logistic regression) foi o que obteve a melhor performance em identificar o câncer colorretal (AUC: 0.865, sensibilidade: 89.5%, especificidade: 83.5%, PPV: 84.4%, NPV: 88.9%). Os quatro atributos de mais peso no modelo foram carcinoembryonic antigen (CEA), hemoglobin (HGB), lipoprotein (a) (Lp(a)), e high-density lipoprotein (HDL). Um modelo de diagnóstico para o câncer colorretal foi estabelecido baseado nesses quatro indicados, com uma AUC de 0.849 (0.840-0.860) para identificar todos os pacientes com câncer colorretal e teve a performance ainda melhor em diferenciar pacientes com fases avançadas do câncer para pessoas saudáveis com um AUC de 0.905 (0.889-0.929). A conclusão do estudo é de que a confiabilidade dos resultados é alta o suficiente para que o diagnóstico possa ser feito através de exames rotineiros e menos invasivos do que os mais utilizados atualmente.  </p>

---
### Previsão de Câncer Colorretal Usando Processamento de Imagem e Aprendizado de Máquina (Referência [ResearchGate](https://www.researchgate.net/publication/386344593_Deep_learning-assisted_colonoscopy_images_for_prediction_of_mismatch_repair_deficiency_in_colorectal_cancer))


**(a) detalhe e contextualize o problema a ser solucionado no trabalho:** O câncer colorretal (CRC) é uma das formas mais prevalentes de câncer no mundo, com alta incidência e mortalidade. Um subconjunto bem descrito deste câncer envolve tumores com deficiência no reparo de erros de correspondência (dMMR). Tumores dMMR têm dificuldade em reparar certos tipos de mutações, resultando em uma carga mutacional elevada e instabilidade microsatélite (MSI-H). Atualmente, as diretrizes recomendam que todos os cânceres colorretais recém-diagnosticados sejam testados para o status de MMR/MSI, já que pacientes com esses tumores podem ser elegíveis para terapias com inibidores de checkpoint imunológico (ICI). A detecção de dMMR/MSI também é recomendada como um teste de triagem para a síndrome de Lynch.

Entretanto, os métodos atuais de teste para MMR/MSI, como análise imunoquímica ou ensaios PCR para marcadores microsatélites, exigem recursos adicionais e nem sempre estão disponíveis em todas as unidades médicas, resultando em uma falta de teste para muitos pacientes com câncer colorretal. Portanto, há uma necessidade crítica de ferramentas acessíveis, aplicáveis universalmente e de baixo custo para auxiliar na triagem precoce de dMMR ou MSI-H em pacientes com câncer colorretal.

O uso de inteligência artificial (IA) tem mostrado grande potencial na classificação e predição utilizando dados de histopatologia e imagens, incluindo imagens de colonoscopia. Esse trabalho visa explorar o uso de aprendizado profundo para prever a deficiência no reparo de erros de correspondência (dMMR) em câncer colorretal, usando imagens de colonoscopia.


**(b) descreva as principais características do dataset utilizado:** O dataset utilizado neste estudo foi composto por um total de 5226 imagens elegíveis provenientes de 892 tumores de pacientes consecutivos. Para o desenvolvimento do modelo, 2105 imagens de câncer colorretal de 306 tumores foram selecionadas aleatoriamente para formar o conjunto de dados de treinamento do modelo, com uma abordagem balanceada entre as classes de tumores. Um conjunto de dados independente foi formado com 3121 imagens de 488 tumores proficientes no reparo de erro de correspondência (MMR) e 98 tumores deficientes em MMR (dMMR).

Essas imagens foram capturadas com alta resolução a partir de diferentes endoscópios (CF-H290, CF-H260, Olympus Medical Systems, Japão; ou EC590WM4, EC760R-V/M, Fujifilm Medical Systems, Japão), com dimensões variando de 200 a 700 pixels de largura e 150 a 650 pixels de altura. As imagens foram classificadas por um classificador de categorias de lesões, separando-as em tumores e não-tumores (incluindo mucosa normal, pólipos e outras categorias).

Imagens com qualidade inadequada, como aquelas com preparação intestinal inadequada, manchas de corante, imagens borradas ou desfocadas, ou imagens que mostravam dispositivos endoscópicos foram excluídas do dataset. Para a validação, o modelo foi testado com um conjunto de dados independente, e os resultados demonstraram boa sensibilidade e especificidade para detectar lesões coloniais, sugerindo que a IA poderia ser um auxílio eficaz para a avaliação de endoscopistas e para reduzir o número de diagnósticos perdidos.



**(c) Abordagens/Algoritmos Utilizados (e seus Parâmetros):**  A fim de aprimorar a análise das imagens, foram empregadas diversas técnicas de pré-processamento, extração de características e algoritmos avançados, visando melhorar a precisão e eficiência do modelo. A seguir, detalhamos os métodos utilizados:
- **Técnicas de Pré-processamento:** Normalização, redução de ruído (desfoque Gaussiano, filtragem mediana), e segmentação (detecção de objetos e isolamento de estruturas).  
- **Extração de Características:** Utilização de Histograma de Gradientes Orientados (HOG) para detecção de objetos e Redes Neurais Convolucionais (CNNs) para extração automática de características.  
- **Algoritmos Utilizados:** Limitação (Thresholding) para identificação de bordas de objetos com limiares de intensidade, detecção de bordas (Canny), e modelos de aprendizado profundo como CNN ou modelos pré-treinados como VGG16 e ResNet.

**Análise Estatística:**  
- **Estatísticas Descritivas:** Medidas como médias, medianas, desvios padrão e intervalos para resumir os dados.  
- **Estatísticas Inferenciais:** Testes T ou ANOVA para comparar médias entre dois ou mais grupos, testes Qui-quadrado (Chi-squared) para variáveis categóricas e coeficientes de correlação para medir a relação entre variáveis contínuas.  
- **Análise de Regressão:** Regressão Linear e Regressão Logística.  
- **Análise Multivariada:** Análise de Componentes Principais (PCA) e Análise Fatorial.

**(d) Métricas de Avaliação Empregadas:** As métricas de avaliação foram divididas em três categorias principais: análise estatística, avaliação de modelos de machine learning, e processamento de imagens.

- **Métricas Estatísticas:** P-Valor (p-value), Intervalo de Confiança, e Valor de Efeito (Effect Size).
- **Métricas para Modelos de Machine Learning:** Acurácia, Precisão, Revocação, F1-Score, AUC-ROC e Matriz de Confusão.
- **Métricas para Processamento de Imagens:** PSNR (Peak Signal-to-Noise Ratio), SSIM (Structural Similarity Index), IoU (Intersection over Union), Dice Coefficient e MSE (Mean Squared Error).

**(e) Resultados Obtidos:** Um total de 5226 imagens elegíveis de 892 tumores de pacientes consecutivos foram utilizadas para desenvolver e validar o modelo de aprendizado profundo. O modelo obteve um AUROC de 0.948 (IC de 95%: 0.919–0.977) no conjunto de dados de teste. No conjunto de validação independente, o AUROC foi 0.807 (0.760–0.854), e o NPV foi 94.2% (IC de 95%: 0.918–0.967). No conjunto de dados do ensaio prospectivo, o modelo identificou 29 tumores entre os 33 tumores deficientes em reparo de erro de correspondência (87,88%).

**(f) Atributos:** 
Os dados utilizados no estudo englobam imagens de colonoscopia e informações associadas aos tumores, além das especificações dos modelos de aprendizado profundo e das métricas empregadas para avaliação do desempenho. A seguir, apresentamos os principais atributos considerados:
- **Imagens de Colonoscopia:** 5226 imagens elegíveis, com resolução variando de 200 a 700 pixels de largura e 150 a 650 pixels de altura.  
- **Tumores:** 306 tumores com e 488 sem deficiência de MMR.  
- **Modelo de Aprendizado Profundo:** CNNs, VGG16, ResNet, com técnicas de pré-processamento como normalização e segmentação.  
- **Métricas de Avaliação:** Acurácia, Precisão, Revocação, F1-Score, AUC-ROC e NPV.

---
# Descrição do _dataset_ selecionado

## **_Dataset_: Colorectal Cancer Risk & Survival Data**

Link de acesso: [Colorectal Cancer Risk & Survival Data](https://www.kaggle.com/datasets/ankushpanday1/colorectal-cancer-risk-and-survival-data)
<p align="justify">O dataset selecionado possui <strong> 89.945 </strong> entradas com <strong> 30 </strong> atributos de dados de pacientes de câncer colorretal de diferentes partes e realidades ao redor do mundo. O intuito do dataset é colaborar com pesquisadores e profissionais da saúde a entender quem está sob maior risco, utilizando dados como idade, gênero, raça, histórico médico dentre outros. O dataset também conta com informações como acesso ao tratamento e quais fatores contribuem para um taxa de sucesso maior no tratamento dos pacientes.</p>
 	Abaixo, segue o descritivo dos atributos do dataset, subdivididos por categoria:

### **Informações Demográficas**

* **Patient\_ID**  
  * **Descrição:** Identificador único de cada paciente.  
  * **Tipo:** Número inteiro (chave primária).  
* **Age (Idade)**  
  * **Descrição:** Idade do paciente em anos.  
  * **Tipo:** Número inteiro.  
* **Gender (Gênero)**  
  * **Descrição:** Gênero do paciente.  
  * **Tipo:** Texto.  
  * **Valores possíveis:**
    * `Male` (Masculino)
    * `Female` (Feminino)
* **Race (Raça)**  
  * **Descrição:** Raça/etnia do paciente.  
  * **Tipo:** Texto.  
  * **Valores possíveis:**
    * `Asian` (Asiático)
    * `Black` (Negro)
    * `Hispanic` (Hispânico)
    * `White` (Branco)
    * `Other` (Outro)
* **Region (Região)**  
  * **Descrição:** Região geográfica do paciente.  
  * **Tipo:** Texto.  
  * **Valores possíveis:**
    * `Europe` (Europa)
    * `North America` (América do Norte)
    * `Asia Pacific` (Asia Pacífica)
    * `Latin America` (América Latina)
    * `Africa` (África)
* **Urban\_or\_Rural (Zona de Residência)**  
  * **Descrição:** Zona de residência do paciente (urbano ou rural).  
  * **Tipo:** Texto.  
  * **Valores possíveis:**
    * `Urban` (Urbano)
    * `Rural` (Rural)
* **Socioeconomic\_Status (Status Socioeconômico)**  
  * **Descrição:** Status socioeconômico do paciente.  
  * **Tipo:** Texto.  
  * **Valores possíveis:**  
    * `Low` (Renda baixa)
    * `Middle` (Renda média)
    * `High` (Renda alta)
* **Family\_History (Histórico Familiar)**  
  * **Descrição:** Indica se há histórico de câncer na família do paciente.  
  * **Tipo:** Booleano (`Sim` / `Não`).  
* **Previous\_Cancer\_History (Histórico de Câncer Prévio)**  
  * **Descrição:** Indica se o paciente já teve câncer anteriormente.  
  * **Tipo:** Booleano (`Sim` / `Não`).

---

### **Triagem e Estilo de Vida**

* **Colonoscopy\_Access (Acesso à Colonoscopia)**  
  * **Descrição:** Paciente teve acesso à colonoscopia para rastreamento.  
  * **Tipo:** Booleano (`Sim` / `Não`).  
* **Screening\_Regularity (Regularidade dos Exames)**  
  * **Descrição:** Frequência com que o paciente faz exames preventivos.  
  * **Tipo:** Texto.  
  * **Valores possíveis:**  
    * `Never` (Nunca realizou exames)
    * `Irregular` (Exames esporádicos) 
    * `Regular` (Exames regulares)
* **Diet\_Type (Tipo de Dieta)**  
  * **Descrição:** Tipo de dieta predominante do paciente.  
  * **Tipo:** Texto.  
  * **Valores possíveis:**  
    * `Balanced` (Dieta saudável e equilibrada) 
    * `Traditional` (Dieta comum, mas não excessivamente restritiva)
    * `Western` (Dieta rica em gordura, açúcar e processados)
* **BMI (Índice de Massa Corporal \- IMC)**  
  * **Descrição:** Índice de Massa Corporal (IMC) do paciente.  
  * **Tipo:** Número decimal.  
* **Physical\_Activity\_Level (Nível de Atividade Física)**  
  * **Descrição:** Nível de atividade física do paciente.  
  * **Tipo:** Texto.  
  * **Valores possíveis:**   
    * `Low` (Baixa)
    * `Medium` (Média)
    * `High` (Alta)
* **Smoking\_Status (Tabagismo)**  
  * **Descrição:** Histórico de tabagismo do paciente.  
  * **Tipo:** Texto.  
  * **Valores possíveis:**   
    * `Never` (Nunca)
    * `Former` (Já foi fumante) 
    * `Current` (É fumante)
* **Alcohol\_Consumption (Consumo de Álcool)**  
  * **Descrição:** Nível de consumo de álcool do paciente.  
  * **Tipo:** Texto.  
  * **Valores possíveis:**  
    * `Low` (Consumo baixo)  
    * `Middle` (Consumo médio)  
    * `High` (Consumo alto) 
* **Red\_Meat\_Consumption (Consumo de Carne Vermelha)**  
  * **Descrição:** Nível de consumo de carne vermelha do paciente.  
  * **Tipo:** Texto.  
  * **Valores possíveis:**  
    * `Low` (Consumo baixo)  
    * `Middle` (Consumo médio)  
    * `High` (Consumo alto) 
* **Fiber\_Consumption (Consumo de Carne Fibras)**  
  * **Descrição:** Nível de consumo de fibras do paciente.  
  * **Tipo:** Texto.  
  * **Valores possíveis:**  
    * `Low` (Consumo baixo)  
    * `Middle` (Consumo médio)  
    * `High` (Consumo alto)
---

### **Diagnóstico, Características do Câncer e Tratamento**

* **Stage\_at\_Diagnosis (Estágio no Diagnóstico)**  
  * **Descrição:** Estágio do câncer no momento do diagnóstico.  
  * **Tipo:** Texto.  
  * **Valores possíveis:**  
    * `I` (Tumor localizado, sem disseminação)
    * `II` (Tumor invadiu tecidos próximos)
    * `III` (Tumor com envolvimento significativo dos linfonodos)
    * `IV` (Câncer metastático (espalhado para órgãos distantes)
* **Tumor\_Aggressiveness (Agressividade do Tumor)**  
  * **Descrição:** Nível de agressividade do tumor.  
  * **Tipo:** Texto.  
  * **Valores possíveis:**  
    * `Low` (Baixa)
    * `Medium` (Média)
    * `High` (Alta)
* **Insurance\_Coverage (Plano de saúde)**  
  * **Descrição:** Paciente possui plano de saúde.  
  * **Tipo:** Booleano (`Sim` / `Não`).
* **Time\_to\_Diagnosis (Tempo até o Diagnóstico)**  
  * **Descrição:** Tempo decorrido entre os primeiros sintomas e o diagnóstico.  
  * **Tipo:** Texto.  
  * **Valores possíveis:**
    * `Delayed` (Tardio)
    * `Timely` (Precoce)
* **Treatment\_Access (Acesso ao Tratamento)**  
  * **Descrição:** Nível de acesso ao tratamento.  
  * **Tipo:** Texto.  
  * **Valores possíveis:**   
    * `Good` (Adequado)
    * `Limited` (Limitado) 
* **Chemotherapy\_Received (Quimioterapia)**  
  * **Descrição:** O paciente realizou quimioterapia?  
  * **Tipo:** Booleano (`Sim` / `Não`)  
* **Radiotherapy\_Received (Radioterapia)**  
  * **Descrição:** O paciente realizou radioterapia?  
  * **Tipo:** Booleano (`Sim` / `Não`).

---

### **Acompanhamento e Sobrevivência**

* **Follow\_Up\_Adherence (Acompanhamento Pós-Tratamento)**  
  * **Descrição:** Grau de acompanhamento do paciente após o tratamento.  
  * **Tipo:** Texto.  
  * **Valores possíveis:**   
    * `Good` (Bom)   
    * `Poor` (Ruim)
* **Survival\_Status (Status de Sobrevivência)**  
  * **Descrição:** Sobrevivência do paciente.  
  * **Tipo:** Texto.  
  * **Valores possíveis:**   
    * `Survived` (Sobreviveu)   
    * `Deceased` (Faleceu)
* **Recurrence (Recorrência do Câncer)**  
  * **Descrição:** O câncer reapareceu após o tratamento?  
  * **Tipo:** Booleano (`Sim` / `Não`).  
* **Time\_to\_Recurrence (Tempo até a Recorrência)**  
  * **Descrição:** Tempo decorrido até a recorrência do câncer (em meses).  
  * **Tipo:** Número inteiro.

# Canvas analítico

O Canvas Analítico tem a função de estruturar e registrar a organização das ideias, proporcionando uma visão clara e detalhada do modelo de negócio. Através dele, é possível visualizar os principais componentes estratégicos e operacionais, facilitando a análise e a tomada de decisões. Aqui está o canvas:


![Canvas_Analitico](https://github.com/user-attachments/assets/fc3dbd87-4aa9-4f5a-9fb3-a08c54437336)


# Vídeo de apresentação da Etapa 01



https://github.com/user-attachments/assets/6e42a3fc-d79a-43fa-b226-85b343884b38



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

<p align="justify"> Li H, Lin J, Xiao Y, et al. Colorectal Cancer Detected by Machine Learning Models Using Conventional Laboratory Test Data. Technology in Cancer Research & Treatment. 2021;20. doi:10.1177/15330338211058352
</p>

<p align="justify">
Cai, Y., Chen, X., Chen, J., Liao, J., Han, M., Lin, D., Hong, X., Hu, H., & Hu, J. (2024). *Deep learning-assisted colonoscopy images for prediction of mismatch repair deficiency in colorectal cancer.* Surgical Endoscopy, **39**, 859-867. [https://doi.org/10.1007/s00464-024-11426-1](https://doi.org/10.1007/s00464-024-11426-1).
</p>
