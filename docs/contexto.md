# Introdução
<p align="justify">
O câncer colorretal é uma das doenças mais preocupantes na área da saúde, pois apresenta alta incidência e mortalidade. Diversos fatores, como genética, estilo de vida e alimentação, podem influenciar o surgimento da doença. A detecção precoce é um dos principais desafios, pois os sintomas podem demorar a aparecer, dificultando o diagnóstico. Nos últimos anos, avanços na tecnologia têm possibilitado novas formas de analisar e interpretar dados médicos, permitindo o desenvolvimento de ferramentas para auxiliar na identificação precoce e na prevenção desse tipo de câncer.</p>
<p align="justify">
Com o avanço da inteligência artificial, técnicas de aprendizado de máquina começaram a ser aplicadas na análise de dados clínicos. Alguns estudos demonstram que esses algoritmos podem encontrar padrões em grandes volumes de informações, tornando possível prever a progressão da doença e auxiliar médicos na tomada de decisões. Um estudo recente utilizou registros hospitalares de pacientes diagnosticados entre 2000 e 2021 e obteve uma taxa de acerto de aproximadamente 77%, destacando o estadiamento clínico como um dos fatores mais relevantes na análise da sobrevida dos pacientes (CARDOSO et al., 2023).</p>
<p align="justify">
Diante disso, este trabalho tem como objetivo reunir e organizar informações extraídas de estudos científicos para criar um conjunto de dados voltado à prevenção do câncer colorretal. A partir desses dados, será desenvolvido um modelo capaz de fazer previsões sobre a doença, analisando fatores de risco e auxiliando na identificação precoce de possíveis casos. Para isso, será necessário escolher um dataset adequado, levando em consideração a qualidade e a confiabilidade das fontes. Também será avaliada a possibilidade de utilizar bases de dados já existentes ou combinar informações de diferentes estudos para obter um conjunto de dados mais completo e representativo.</p>
<p align="justify">
A criação desse modelo pode contribuir significativamente para a área da saúde, oferecendo uma ferramenta adicional para médicos e pesquisadores. Dessa forma, espera-se que este trabalho auxilie na detecção precoce da doença e, consequentemente, aumente as chances de tratamento bem-sucedido para os pacientes.</p>

## Problema

"Nesta seção, você deve apresentar o problema que a sua investigação/experimentação busca resolver. Por exemplo, caso o _dataset_ selecionado, seja um _dataset_ que contenha uma série temporal com o preço de diversas ações da bolsa de valores, o problema pode estar relacionado a dificuldade em saber a melhor hora (hora certa??) de comprar ou então, de executar a venda de uma determinada ação.

Descreva ainda o contexto em que essa aplicação será usada, se houver: empresa parceira, tecnologias etc. Novamente, descreva apenas o que de fato existir, pois ainda não é a hora de apresentar requisitos  detalhados ou projetos."




O câncer colorretal é uma das principais causas de morte no mundo e sua incidência tem aumentado significativamente, especialmente em regiões urbanizadas e em populações com acesso desigual aos serviços de saúde. Identificar fatores de risco, padrões de tratamento e desfechos da doença é essencial para desenvolver estratégias preventivas e melhorar o prognóstico dos pacientes.
O impacto desse problema na sociedade é expressivo, pois envolve custos elevados com tratamento, perda de produtividade, além dos desafios emocionais e psicológicos para os pacientes e suas famílias. A identificação precoce e o tratamento adequado podem melhorar significativamente a taxa de sobrevivência, tornando-se um objetivo fundamental para pesquisadores e profissionais de saúde.


> **Links Úteis**:
> - [Objetivos, Problema de pesquisa e Justificativa](https://medium.com/@versioparole/objetivos-problema-de-pesquisa-e-justificativa-c98c8233b9c3)
> - [Matriz Certezas, Suposições e Dúvidas](https://medium.com/educa%C3%A7%C3%A3o-fora-da-caixa/matriz-certezas-suposi%C3%A7%C3%B5es-e-d%C3%BAvidas-fa2263633655)
> - [Brainstorming](https://www.euax.com.br/2018/09/brainstorming/)

## Questão de pesquisa

A questão de pesquisa é a base de todo o trabalho que será desenvolvido. É ela que motiva a realização da pesquisa e deverá ser adequada ao problema identificado. Ao término de sua pesquisa/experimentação, o objetivo é que seja encontrada a resposta da questão de pesquisa previamente definida.

> **Links Úteis**:
> - [Questão de pesquisa](https://www.enago.com.br/academy/how-to-develop-good-research-question-types-examples/)
> - [Problema de pesquisa](https://blog.even3.com.br/problema-de-pesquisa/)

## Objetivos preliminares

"Aqui você deve descrever os objetivos preliminares do trabalho indicando que o objetivo geral é experimentar modelos de aprendizado de máquina adequados para solucionar o problema apresentado acima. 

Apresente também alguns (pelo menos 2) objetivos específicos dependendo de onde você vai querer concentrar a sua prática investigativa, ou como você vai aprofundar no seu trabalho.

Por exemplo: um objetivo específico pode estar relacionado a predizer a tendência de alta, estabilidade ou queda de uma determinada ação em uma determinada janela do tempo ou então, predizer o valor exato de uma determinada ação.
Lembre-se que, à medida que a pesquisa/experimentação evolui, os objetivos podem evoluir também, portanto, não se esqueça de fazer as atualizações necessárias.
 
> **Links Úteis**:
> - [Objetivo geral e objetivo específico: como fazer e quais verbos utilizar](https://blog.mettzer.com/diferenca-entre-objetivo-geral-e-objetivo-especifico/)"





O presente projeto tem como objetivo a análise de dados relacionados ao câncer colorretal utilizando técnicas de aprendizado de máquina. Considerando a alta incidência e mortalidade dessa doença, torna-se fundamental investigar fatores de risco, padrões de tratamento e desfechos clínicos para auxiliar na tomada de decisão e aprimorar estratégias de prevenção e intervenção.

## Justificativa

"Descreva a importância ou a motivação para trabalhar com o conjunto de dados escolhido. Indique as razões pelas quais você escolheu seus objetivos específicos, as razões para aprofundar o estudo do problema identificado e qual o impacto que tal problema provoca na sociedade. Lembre-se de quantificar (com dados reais e suas respectivas fontes) este impacto.

> **Links Úteis**:
> - [Como montar a justificativa](https://guiadamonografia.com.br/como-montar-justificativa-do-tcc/)"

<p align="justify">
O câncer colorretal (CCR) configura-se como um grave problema de saúde pública, tanto no Brasil quanto em escala global. Dados provenientes do Ministério da Saúde e da Organização Mundial da Saúde (OMS) revelam um aumento progressivo na incidência e mortalidade associadas ao CCR, consolidando-o como uma das neoplasias mais prevalentes e letais. A detecção precoce assume um papel crucial no sucesso do tratamento e na elevação das taxas de sobrevida dos pacientes. Contudo, o diagnóstico em estágios iniciais representa um desafio significativo, em grande parte devido à natureza assintomática da doença em suas fases iniciais e à baixa adesão aos programas de rastreamento.</p>
<p align="justify">
O Instituto Nacional de Câncer (INCA) projeta um aumento na mortalidade prematura por câncer de intestino até o ano de 2030. Esta tendência alarmante sublinha a urgência da implementação de medidas preventivas e de diagnóstico precoce. Segundo o INCA, 'a probabilidade de óbito prematuro por câncer de intestino entre indivíduos de 30 a 69 anos pode apresentar um incremento de 10% até 2030'. Adicionalmente, informações provenientes dos Registros Hospitalares de Câncer (RHC) indicam que, no período de 2015 a 2019, aproximadamente 65% dos casos de câncer de intestino foram diagnosticados em estágios avançados, abrangendo todas as faixas etárias. Estes dados reforçam a necessidade de intervenções eficazes e podem ser consultados em: https://www.gov.br/inca/pt-br/assuntos/noticias/2023/inca-preve-aumento-da-mortalidade-prematura-por-cancer-de-intestino-ate-2030.</p>
<p align="justify">
A Organização Pan-Americana da Saúde (OPAS/OMS) destaca a relevância do câncer como uma das principais causas de óbito nas Américas, enfatizando a necessidade de estratégias abrangentes de prevenção e controle.</p>
<p align="justify">
No que concerne à distribuição por sexo, os tipos de câncer mais frequentemente diagnosticados em homens são: próstata (21,8%), pulmão (8,6%), colorretal (7,7%) e bexiga (4,5%). Em mulheres, os tipos mais comuns são: mama (26,1%), pulmão (8,5%), colorretal (7,9%) e útero (5,4%).</p>
<p align="justify">
No tocante à mortalidade, os cânceres que mais contribuem para o óbito em homens são: pulmão (17,5%), próstata (13,3%), colorretal (9,6%) e pâncreas (6,4%). Em mulheres, as principais causas de morte por câncer são: mama (15,7%), pulmão (16,5%), colorretal (9,6%) e pâncreas (6,6%). Informações adicionais sobre o câncer como um problema de saúde global podem ser encontradas em: https://www.paho.org/pt/topicos/cancer."</p>
<p align="justify">
A relevância do estudo se justifica pelo impacto significativo do câncer colorretal na sociedade, tanto em termos de custos para o sistema de saúde quanto no bem-estar dos pacientes e suas famílias. A aplicação de modelos de aprendizado de máquina pode contribuir para a detecção precoce junto aos médicos da atenção primária, a personalização do tratamento e a melhoria do prognóstico dos indivíduos acometidos pela doença.</p>

## Público-Alvo

"Descreva quem serão as pessoas que poderão se beneficiar com a sua investigação indicando os diferentes perfis. O objetivo aqui não é definir quem serão os clientes ou quais serão os papéis dos usuários na aplicação. A ideia é, dentro do possível, conhecer um pouco mais sobre o perfil dos usuários: conhecimentos prévios, relação com a tecnologia, relações hierárquicas, etc.

Adicione informações sobre o público-alvo por meio de uma descrição textual, diagramas de personas e mapa de stakeholders.

> **Links Úteis**:
> - [Público-alvo](https://blog.hotmart.com/pt-br/publico-alvo/)
> - [Como definir o público alvo](https://exame.com/pme/5-dicas-essenciais-para-definir-o-publico-alvo-do-seu-negocio/)
> - [Público-alvo: o que é, tipos, como definir seu público e exemplos](https://klickpages.com.br/blog/publico-alvo-o-que-e/)
> - [Qual a diferença entre público-alvo e persona?](https://rockcontent.com/blog/diferenca-publico-alvo-e-persona/)"

<p align="justify">
O público-alvo deste projeto abrange *profissionais de saúde*, médicos, enfermeiros, pesquisadores e gestores da área médica que buscam ferramentas para otimizar a identificação de fatores prognósticos e desenvolver políticas públicas baseadas em evidências. *Estudantes de graduação e pós graduação* das áreas de saúde, informática e estatística, que poderão se beneficiar do conhecimento e das técnicas utilizadas no projeto para o desenvolvimento de suas pesquisas e atividades acadêmicas. *População em geral*, que poderá se informar sobre os fatores de risco e a importância da detecção precoce do cancer colorretal. Com base em um conjunto de dados abrangente e diversificado, serão exploradas abordagens estatísticas e computacionais para gerar insights valiosos e contribuir para o avanço no combate ao câncer colorretal. </p>

## Estado da arte

Nesta seção, deverão ser descritas outras abordagens identificadas na literatura que foram utilizadas para resolver problemas similares ao problema em questão. Para isso, faça uma pesquisa detalhada e identifique, no mínimo, 5 trabalhos que tenham utilizado dados em contexto similares e então: (a) detalhe e contextualize o problema a ser solucionado no trabalho, (b) descreva as principais características do _dataset_ utilizado, (c) detalhe quais abordagens/algoritmos foram utilizados (e seus parâmetros), (d) identifique as métricas de avaliação empregadas, e (e) fale sobre os resultados obtidos. 

> **Links Úteis**:
> - [Google Scholar](https://scholar.google.com/)
> - [IEEE Xplore](https://ieeexplore.ieee.org/Xplore/home.jsp)
> - [Science Direct](https://www.sciencedirect.com/)
> - [ACM Digital Library](https://dl.acm.org/)

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
