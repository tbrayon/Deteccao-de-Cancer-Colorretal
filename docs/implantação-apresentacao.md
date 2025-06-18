# Implantação da solução

## Implantação da Solução em Nuvem (AWS)

<p align="justify">A implantação da solução em nuvem garante <strong>escalabilidade, alta disponibilidade e segurança</strong> para os modelos preditivos. A arquitetura proposta utiliza os seguintes serviços da AWS:</p>

### Armazenamento de Dados

* **Amazon S3 (Simple Storage Service):**
<p align="justify">É utilizado para armazenar os conjuntos de dados brutos e pré-processados, modelos treinados e logs da aplicação. O S3 oferece alta durabilidade, disponibilidade e segurança. No nosso caso, um bucket será criado no S3 e será feito o upload do arquivo `colorectal_cancer_prediction.csv`. O bucket do projeto atualmente indica um uso de <strong>14.47 MB e 0,00 objetos armazenados</strong>.</p>

### Implantação no AWS Elastic Beanstalk

<p align="justify">A implantação da aplicação no AWS Elastic Beanstalk envolve várias etapas, desde a preparação da sua aplicação até a configuração do ambiente e a implantação propriamente dita. O Elastic Beanstalk simplifica o processo de implantação e dimensionamento de aplicações e serviços web.</p>

### Monitoramento e Gerenciamento

<p align="justify">A etapa de observação e monitoria tem como finalidade garantir a <strong>rastreabilidade, consistência e desempenho</strong> do pipeline de dados implementado. Para isso, a ferramenta escolhida foi o <strong>Amazon CloudWatch</strong>, serviço nativo da AWS voltado para o monitoramento e análise de métricas e logs.</p>    

<p align="justify">O Amazon CloudWatch permite coletar e visualizar, em tempo real, informações críticas sobre o ambiente de execução, facilitando a identificação de falhas e inconsistências ao longo do pipeline de dados. Além disso, é possível criar <strong>alarmes personalizados</strong> para o acompanhamento proativo dos indicadores definidos no projeto.</p>    

<p align="justify">Foi configurado um alarme de integridade do ambiente (“Environment Health”),  se o ambiente estiver em estado ruim por 3 minutos seguidos, o alarme será disparado (e poderá enviar um alerta, caso um item SNS esteja configurado).</p>

### Custos dos Serviços em Nuvem

<p align="justify">A utilização de serviços em nuvem oferece uma série de vantagens, como <strong>flexibilidade, escalabilidade e o uso de recursos sob demanda</strong>. No entanto, é crucial manter um controle rigoroso dos custos por meio de um planejamento financeiro adequado, a fim de evitar gastos desnecessários que possam comprometer a continuidade do projeto.</p>    

<p align="justify">A AWS disponibiliza em seu site a <strong>AWS Pricing Calculator</strong>, uma ferramenta gratuita que possibilita estimar o custo dos serviços da AWS com base nos recursos que você pretende usar.</p>    


# Deploy da Aplicação Flask na AWS com Elastic Beanstalk

## Desenvolvimento e Deploy de um Modelo de Previsão de Câncer Colorretal

<p align="justify">Este projeto focou na <strong>criação e implantação de uma aplicação web</strong> para prever o câncer colorretal. Utilizamos um modelo de machine learning pré-treinado, que emprega métricas de <strong>Random Forest, XGBoost e Naive Bayes</strong> para as predições. A aplicação foi desenvolvida em <strong>Python com Flask</strong> e implantada na nuvem usando o <strong>AWS Elastic Beanstalk</strong>. Optamos pelo Elastic Beanstalk por ser a forma mais prática e eficiente para o deploy, após pesquisas prévias.</p>

## Etapas do Projeto

### 1. Preparação do Código para Deploy no AWS Elastic Beanstalk

<p align="justify">Para garantir a compatibilidade com o Elastic Beanstalk, estruturamos o projeto com os diretórios padrão do Flask, como `/templates`, `/static` e `/models`. O arquivo principal, <strong>`application.py`</strong>, foi o responsável por orquestrar a aplicação.</p>

<p align="justify">As rotas foram implementadas com o framework Flask, integrando um <strong>modelo de machine learning no formato `.pkl`</strong>. Este modelo é carregado dinamicamente para realizar previsões a partir dos dados recebidos.</p>

Para o funcionamento em produção, dois arquivos essenciais foram configurados:

* O **`Procfile`**: define o ponto de entrada da aplicação, utilizando o servidor WSGI `waitress`.
* O **`requirements.txt`**: lista todas as dependências necessárias, incluindo as bibliotecas `Flask`, `pandas`, `joblib` e `waitress==3.0.2`.

### 2. Empacotamento para o Deploy

<p align="justify">Criamos um <strong>arquivo `.zip` da aplicação</strong> a partir do conteúdo interno da pasta, evitando caminhos do Windows que poderiam causar problemas. Também removemos arquivos e diretórios irrelevantes do `.zip`, como `.git/`, `.ipynb_checkpoints` e arquivos `.ipynb`.</p>

### 3. Etapas do Deploy no Elastic Beanstalk

O arquivo `.zip` da aplicação foi enviado pelo painel da AWS EB, selecionando o ambiente Python.

Foi necessário resolver um erro de **"Bad Gateway (502)"** ajustando:

* A variável de ambiente `PORT=5000`.
* O comando correto no `Procfile`: `web: waitress-serve --host=0.0.0.0 --port=5000 application:application`.

<p align="justify">Durante o provisionamento do ambiente na AWS, escolhemos a <strong>instância `t3.medium`</strong>. Instâncias menores (como `t2.micro` ou `t3.micro`) apresentaram limitações de memória e capacidade de processamento, não sendo suficientes para suportar a aplicação, especialmente durante a inicialização e o deploy.</p>

<p align="justify">Ao executar a aplicação com suas dependências (Flask, waitress e bibliotecas de análise), observamos travamentos frequentes e falhas de saúde do ambiente, indicando insuficiência de recursos computacionais, principalmente de memória RAM.</p>

<p align="justify">A `t3.medium` oferece <strong>2 vCPUs e 4 GB de RAM</strong>, garantindo maior estabilidade, inicialização rápida das instâncias e suporte ao volume de requisições durante os testes de carga. Essa escolha equilibra custo-benefício, pois a instância faz parte da geração T3 (econômica com *burst performance*) e permite escalabilidade via Auto Scaling, se necessário.</p>

A integridade da aplicação foi validada pelos logs da AWS (nginx, `web.stdout.log`) e pela resposta HTTP 200 à URL pública do ambiente.

**URL pública:** `http://previsao-cancer-colorretal-app-env.eba-ei8fc28z.us-east-1.elasticbeanstalk.com/`

### 4. Testes e Acesso Externo

<p align="justify">Após o deploy, corrigimos um problema de acesso causado pelo uso de `https://` (o ambiente respondia apenas em `http://`). Ao tentar acessar o link da aplicação por dispositivos móveis, a URL era automaticamente convertida para HTTPS. Orientamos o uso explícito da URL com HTTP.</p>

Confirmamos que o acesso externo estava disponível após limpar caches e forçar o protocolo correto no navegador.

## Configurações Extras

### Monitoramento e Alertas com AWS CloudWatch

Configuramos um alarme de integridade do ambiente (**“Environment Health”**) com os seguintes parâmetros no AWS CloudWatch:

* **Namespace:** `AWS/ElasticBeanstalk`
* **Métrica:** `EnvironmentHealth`
* **Ambiente monitorado:** `Previsao-cancer-colorretal-app-env`
* **Estatística:** Média (`Average`)
* **Período:** 1 minuto
* **Limite de alarme:** Aciona se 3 pontos de dados consecutivos estiverem fora da faixa.

<p align="justify">Isso significa que se o ambiente estiver em estado ruim por 3 minutos seguidos, o alarme será disparado (e poderá enviar um alerta, caso um tópico SNS esteja configurado).</p>


# Testes de Carga: Identificação do Limite da Aplicação

<p style="text-align: justify;">Como parte da validação de desempenho da aplicação, realizamos testes de carga progressivos com o objetivo de identificar a taxa máxima de requisições por segundo que o sistema suporta com estabilidade, antes de apresentar degradação ou falhas.</p>

## Ferramenta utilizada
<p style="text-align: justify;">Utilizamos a ferramenta <strong>Artillery</strong>, instalada localmente com Node.js, para simular acessos simultâneos à aplicação hospedada no <strong>AWS Elastic Beanstalk</strong>. O Artillery permite definir cenários de teste em arquivos `.yml`, com fases de carga configuráveis e geração de relatórios detalhados.</p>

## Teste com 51 requisições/segundo
**Arquivo `test-carga.yml` criado com o seguinte cenário:**
```yaml
config:
  target: "http://previsao-cancer-colorretal-app-env.eba-ei8fc28z.us-east-1.elasticbeanstalk.com"
  phases:
    - duration: 60
      arrivalRate: 51
scenarios:
  - flow:
      - get:
          url: "/"
```

<p style="text-align: justify;"><strong>Execução:</strong></p>

artillery run teste-carga.yml

<p align="justify"> <strong>Resultado:</strong></p> - Total de requisições: 3.060<br> - Sucesso HTTP 200: 3.060<br> - Erros: 0<br> - Latência média: ~150 ms<br><br> A aplicação respondeu com <strong>estabilidade total</strong>, sem apresentar erros ou lentidão, mesmo com tráfego sustentado por 1 minuto. </p>

## Teste com 52 requisições/segundo
<p align="justify"><strong>Arquivo atualizado com <code>arrivalRate: 52</code></strong></p><p style="text-align: justify;"><strong>Resultado:</strong></p>

<p align="justify">- Total de requisições: 3.120<br> - Sucesso HTTP 200: 3.116<br> - Erros de timeout (ETIMEDOUT): 4<br> - Latência média: ~145 ms<br> - p95: 149.9 ms<br> - p99: 165.7 ms<br><br> Neste cenário, a aplicação ainda manteve respostas rápidas, mas foi possível observar os <strong>primeiros sinais de saturação</strong>, com 4 falhas (0,13%) por timeout. Isso indica que a carga de 52 requisições por segundo se aproxima do <strong>limite operacional</strong> do backend ou da infraestrutura base (EC2, Elastic Beanstalk). </p>

## Conclusão
<p align="justify"> Com isso, a partir dos testes, definimos que o ponto ideal de operação sustentada da aplicação está em até 51 requisições por segundo, garantindo disponibilidade e performance. O teste com 52 req/s serviu como referência para análise de capacidade e dimensionamento futuro.</p>

# Apresentação da solução

<p style="text-align: justify;">Nesta seção, um vídeo de, no máximo, 5 minutos descreve o escopo todo do projeto, um resumo do trabalho desenvolvido, incluindo a comprovação de que a implantação foi realizada e, as conclusões alcançadas.</p>

O serviço pode ser acessado pelo link: http://previsao-cancer-colorretal-app-env.eba-ei8fc28z.us-east-1.elasticbeanstalk.com/.

https://github.com/user-attachments/assets/3d0881fb-2dfc-475a-a8e0-85c405b3dfee





