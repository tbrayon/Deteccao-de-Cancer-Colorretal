# Implantação da solução

## Implantação da Solução em Nuvem (AWS)

<p align="justify">A implantação da solução em nuvem garante <strong>escalabilidade, alta disponibilidade e segurança</strong> para os modelos preditivos. A arquitetura proposta utiliza os seguintes serviços da AWS:</p>

### Armazenamento de Dados

* **Amazon S3 (Simple Storage Service):**
<p align="justify">É utilizado para armazenar os conjuntos de dados brutos e pré-processados, modelos treinados e logs da aplicação. O S3 oferece alta durabilidade, disponibilidade e segurança. No nosso caso, um bucket será criado no S3 e será feito o upload do arquivo `colorectal_cancer_prediction.csv`. O bucket do projeto atualmente indica um uso de <strong>14.47 MB e 0,00 objetos armazenados</strong>.</p>

### Implantação no AWS Elastic Beanstalk

A implantação da aplicação no AWS Elastic Beanstalk envolve várias etapas, desde a preparação da sua aplicação até a configuração do ambiente e a implantação propriamente dita. O Elastic Beanstalk simplifica o processo de implantação e dimensionamento de aplicações e serviços web.

### Monitoramento e Gerenciamento

<p align="justify">A etapa de observação e monitoria tem como finalidade garantir a <strong>rastreabilidade, consistência e desempenho</strong> do pipeline de dados implementado. Para isso, a ferramenta escolhida foi o <strong>Amazon CloudWatch</strong>, serviço nativo da AWS voltado para o monitoramento e análise de métricas e logs.</p>    

<p align="justify">O Amazon CloudWatch permite coletar e visualizar, em tempo real, informações críticas sobre o ambiente de execução, facilitando a identificação de falhas e inconsistências ao longo do pipeline de dados. Além disso, é possível criar <strong>alarmes personalizados</strong> para o acompanhamento proativo dos indicadores definidos no projeto.</p>    

### Custos dos Serviços em Nuvem

<p align="justify">A utilização de serviços em nuvem oferece uma série de vantagens, como <strong>flexibilidade, escalabilidade e o uso de recursos sob demanda</strong>. No entanto, é crucial manter um controle rigoroso dos custos por meio de um planejamento financeiro adequado, a fim de evitar gastos desnecessários que possam comprometer a continuidade do projeto.</p>    

<p align="justify">A AWS disponibiliza em seu site a <strong>AWS Pricing Calculator</strong>, uma ferramenta gratuita que possibilita estimar o custo dos serviços da AWS com base nos recursos que você pretende usar. O serviço pode ser acessado pelo link: http://previsao-cancer-colorretal-app-env.eba-ei8fc28z.us-east-1.elasticbeanstalk.com/.</p>    

# Deploy da Aplicação Flask na AWS com Elastic Beanstalk

## Desenvolvimento e Deploy de um Modelo de Previsão de Câncer Colorretal com Flask e AWS Elastic Beanstalk

Este projeto focou na **criação e implantação de uma aplicação web** para prever o câncer colorretal. Utilizamos um modelo de machine learning pré-treinado, que emprega métricas de **Random Forest, XGBoost e Naive Bayes** para as predições. A aplicação foi desenvolvida em **Python com Flask** e implantada na nuvem usando o **AWS Elastic Beanstalk**. Optamos pelo Elastic Beanstalk por ser a forma mais prática e eficiente para o deploy, após pesquisas prévias.

## Etapas do Projeto

### 1. Preparação do Código para Deploy no AWS Elastic Beanstalk

Para garantir a compatibilidade com o Elastic Beanstalk, estruturamos o projeto com os diretórios padrão do Flask, como `/templates`, `/static` e `/models`. O arquivo principal, **`application.py`**, foi o responsável por orquestrar a aplicação.

As rotas foram implementadas com o framework Flask, integrando um **modelo de machine learning no formato `.pkl`**. Este modelo é carregado dinamicamente para realizar previsões a partir dos dados recebidos.

Para o funcionamento em produção, dois arquivos essenciais foram configurados:

* O **`Procfile`**: define o ponto de entrada da aplicação, utilizando o servidor WSGI `waitress`.
* O **`requirements.txt`**: lista todas as dependências necessárias, incluindo as bibliotecas `Flask`, `pandas`, `joblib` e `waitress==3.0.2`.

### 2. Empacotamento para o Deploy

Criamos um **arquivo `.zip` da aplicação** a partir do conteúdo interno da pasta, evitando caminhos do Windows que poderiam causar problemas. Também removemos arquivos e diretórios irrelevantes do `.zip`, como `.git/`, `.ipynb_checkpoints` e arquivos `.ipynb`.

### 3. Etapas do Deploy no Elastic Beanstalk

O arquivo `.zip` da aplicação foi enviado pelo painel da AWS EB, selecionando o ambiente Python.

Foi necessário resolver um erro de **"Bad Gateway (502)"** ajustando:

* A variável de ambiente `PORT=5000`.
* O comando correto no `Procfile`: `web: waitress-serve --host=0.0.0.0 --port=5000 application:application`.

Durante o provisionamento do ambiente na AWS, escolhemos a **instância `t3.medium`**. Instâncias menores (como `t2.micro` ou `t3.micro`) apresentaram limitações de memória e capacidade de processamento, não sendo suficientes para suportar a aplicação, especialmente durante a inicialização e o deploy.

Ao executar a aplicação com suas dependências (Flask, waitress e bibliotecas de análise), observamos travamentos frequentes e falhas de saúde do ambiente, indicando insuficiência de recursos computacionais, principalmente de memória RAM.

A `t3.medium` oferece **2 vCPUs e 4 GB de RAM**, garantindo maior estabilidade, inicialização rápida das instâncias e suporte ao volume de requisições durante os testes de carga. Essa escolha equilibra custo-benefício, pois a instância faz parte da geração T3 (econômica com *burst performance*) e permite escalabilidade via Auto Scaling, se necessário.

A integridade da aplicação foi validada pelos logs da AWS (nginx, `web.stdout.log`) e pela resposta HTTP 200 à URL pública do ambiente.

**URL pública:** `http://previsao-cancer-colorretal-app-env.eba-ei8fc28z.us-east-1.elasticbeanstalk.com/`

### 4. Testes e Acesso Externo

Após o deploy, corrigimos um problema de acesso causado pelo uso de `https://` (o ambiente respondia apenas em `http://`). Ao tentar acessar o link da aplicação por dispositivos móveis, a URL era automaticamente convertida para HTTPS. Orientamos o uso explícito da URL com HTTP.

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

Isso significa que se o ambiente estiver em estado ruim por 3 minutos seguidos, o alarme será disparado (e poderá enviar um alerta, caso um tópico SNS esteja configurado).


## Guia Rápido: Deploy de Aplicações Flask no AWS Elastic Beanstalk

Este guia vai te mostrar, passo a passo, como colocar sua aplicação Flask no ar usando o AWS Elastic Beanstalk. É uma forma simples e eficiente de ter seu projeto rodando na nuvem.

-----

## 1️⃣ Criar um Ambiente no AWS Elastic Beanstalk

Para começar, você precisa criar um ambiente para sua aplicação:

  * Acesse o **Console da AWS** e procure por **Elastic Beanstalk**:
    👉 [https://console.aws.amazon.com/elasticbeanstalk](https://console.aws.amazon.com/elasticbeanstalk)
  * Clique em **"Create Application"** (Criar Aplicação).
  * Escolha um nome para sua aplicação (por exemplo: `flask-app`).
  * Em **"Platform"** (Plataforma), selecione **`Python`**.
  * Por fim, clique em **"Create application"** (Criar aplicação) para gerar o ambiente.

-----

## 2️⃣ Criar um Pacote ZIP com Sua Aplicação

Antes de fazer o upload, sua aplicação precisa estar em um arquivo `.zip` bem estruturado. Ele deve conter:

  * Seu código-fonte (`app.py` ou `application.py`).

  * Pastas de `templates` e `arquivos estáticos`.

  * O arquivo `requirements.txt` (com todas as suas dependências).

  * O arquivo `Procfile` (para rodar o Gunicorn no Elastic Beanstalk), no formato abaixo:

    ```plaintext
    web: gunicorn -w 4 -b 0.0.0.0:5000 application:application
    ```

**Importante:** Ao compactar, certifique-se de que o ZIP contenha os arquivos diretamente, **sem uma pasta raiz extra**. Você pode fazer isso assim (dentro do diretório do seu projeto):

```bash
zip -r minha-app.zip .
```

-----

## 3️⃣ Fazer o Upload no Elastic Beanstalk

Com o pacote ZIP pronto, é hora de enviar para a AWS:

  * No Console do Elastic Beanstalk, vá para a sua aplicação.
  * Clique em **"Upload and Deploy"** (Carregar e Implantar).
  * Selecione o arquivo ZIP da sua aplicação e clique em **"Deploy"** (Implantar).
  * Aguarde alguns minutos enquanto o deploy é concluído.

-----

## 4️⃣ Testar Sua Aplicação

Depois do deploy, a AWS vai te dar uma URL pública. Para acessar sua aplicação:

  * Vá para o painel do Elastic Beanstalk.
  * Na seção **"Environments"** (Ambientes), clique no nome da sua aplicação.
  * Copie o **"Endpoint"** (por exemplo: `http://meuapp.us-east-1.elasticbeanstalk.com`).
  * Abra no navegador e veja sua aplicação rodando\!

-----

## 5️⃣ Configurar Variáveis de Ambiente (Opcional)

Se sua aplicação precisar de chaves de API, credenciais ou outras configurações:

  * Vá para o Elastic Beanstalk \> **"Configuration"** (Configuração).
  * Clique em **"Software" \> "Edit"** (Editar).
  * Adicione as variáveis na seção **"Environment Variables"** (Variáveis de Ambiente).
  * **Salve** e **Reinicie** o ambiente.

-----

## 6️⃣ Configurar Banco de Dados (Opcional)

Se você precisa de um banco de dados, use o **AWS RDS**:

  * Acesse o **AWS RDS**.
  * Crie uma instância (MySQL/PostgreSQL, por exemplo).
  * Copie o endpoint do banco e configure a conexão na sua aplicação.

-----

## 7️⃣ Configurar HTTPS (Opcional)

Para ativar SSL e usar HTTPS:

  * Vá para **"Load Balancer"** (Balanceador de Carga) no Elastic Beanstalk.
  * Adicione um **Certificado SSL** via AWS Certificate Manager.
  * Configure para **redirecionar o tráfego para HTTPS**.

-----

**Pronto\!**  Sua aplicação Flask está online via AWS Elastic Beanstalk, sem precisar de configurações complexas.


# Testes de Carga: Identificação do Limite da Aplicação

<p style="text-align: justify;">Como parte da validação de desempenho da aplicação, realizamos testes de carga progressivos com o objetivo de identificar a taxa máxima de requisições por segundo que o sistema suporta com estabilidade, antes de apresentar degradação ou falhas.</p>

## Ferramenta utilizada
<p style="text-align: justify;">Utilizamos a ferramenta **Artillery**, instalada localmente com Node.js, para simular acessos simultâneos à aplicação hospedada no **AWS Elastic Beanstalk**. O Artillery permite definir cenários de teste em arquivos `.yml`, com fases de carga configuráveis e geração de relatórios detalhados.</p>

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

<p style="text-align: justify;"><strong>Resultado:</strong></p><p style="text-align: justify;"> - Total de requisições: 3.060<br> - Sucesso HTTP 200: 3.060<br> - Erros: 0<br> - Latência média: ~150 ms<br><br> A aplicação respondeu com <strong>estabilidade total</strong>, sem apresentar erros ou lentidão, mesmo com tráfego sustentado por 1 minuto. </p>

## Teste com 52 requisições/segundo
<p style="text-align: justify;"><strong>Arquivo atualizado com <code>arrivalRate: 52</code></strong></p><p style="text-align: justify;"><strong>Resultado:</strong></p><p style="text-align: justify;"> - Total de requisições: 3.120<br> - Sucesso HTTP 200: 3.116<br> - Erros de timeout (ETIMEDOUT): 4<br> - Latência média: ~145 ms<br> - p95: 149.9 ms<br> - p99: 165.7 ms<br><br> Neste cenário, a aplicação ainda manteve respostas rápidas, mas foi possível observar os <strong>primeiros sinais de saturação</strong>, com 4 falhas (0,13%) por timeout. Isso indica que a carga de 52 requisições por segundo se aproxima do <strong>limite operacional</strong> do backend ou da infraestrutura base (EC2, Elastic Beanstalk). </p>

## Conclusão
<p style="text-align: justify;">Com isso, a partir dos testes, definimos que o <strong>ponto ideal de operação sustentada</strong> da aplicação está em <strong>até 51 requisições por segundo</strong>, garantindo disponibilidade e performance. O teste com 52 req/s serviu como referência para análise de capacidade e dimensionamento futuro. </p>

## Testes realizados

**Resultado do Teste 1:**

Este teste vai simular 10 usuários por segundo durante 1 minuto acessando a página inicial da aplicação.

```

All VUs finished. Total time: 1 minute, 1 second

--------------------------------
Summary report @ 21:52:16(-0300)
--------------------------------

http.codes.200: ................................................................ 600
http.downloaded_bytes: ......................................................... 16871400
http.request_rate: ............................................................. 10/sec
http.requests: ................................................................. 600
http.response_time:
  min: ......................................................................... 143
  max: ......................................................................... 168
  mean: ........................................................................ 144.9
  median: ...................................................................... 144
  p95: ......................................................................... 147
  p99: ......................................................................... 159.2
http.response_time.2xx:
  min: ......................................................................... 143
  max: ......................................................................... 168
  mean: ........................................................................ 144.9
  median: ...................................................................... 144
  p95: ......................................................................... 147
  p99: ......................................................................... 159.2
http.responses: ................................................................ 600
vusers.completed: .............................................................. 600
vusers.created: ................................................................ 600
vusers.created_by_name.0: ...................................................... 600
vusers.failed: ................................................................. 0
vusers.session_length:
  min: ......................................................................... 429.9
  max: ......................................................................... 487.8
  mean: ........................................................................ 436
  median: ...................................................................... 432.7
  p95: ......................................................................... 450.4
  p99: ......................................................................... 459.5
```

### 📊 Resumo do Teste de Carga 1

* **Número total de requisições:** 600
* **Erro:** 0 → **Nenhuma falha, ótimo sinal!**
* **Tempo médio de resposta:** 144,9 ms
* **Tempo máximo de resposta:** 168 ms → **Bem abaixo de 500 ms, super estável.**
* **Usuários virtuais simulados:** 600
* **Taxa de requisição constante:** 10 requisições por segundo

### 📈 O que isso mostra:

Sua aplicação está:

* **Respondendo rápido:** menos de 150 ms em média é ótimo.
* **Estável sob pressão:** nenhuma queda, nenhuma falha de resposta.
* **Capaz de manter o desempenho consistente:** latências bem próximas no tempo (mínimo e máximo variando pouco).

---

## TESTE 2: Simulação de Carga Média

Este teste aumenta a carga para **51 usuários por segundo durante 1 minuto**.

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

**Resultado do Teste 2:**

```
All VUs finished. Total time: 1 minute, 2 seconds

--------------------------------
Summary report @ 22:30:27(-0300)
--------------------------------

http.codes.200: ................................................................ 3060
http.downloaded_bytes: ......................................................... 86044140
http.request_rate: ............................................................. 51/sec
http.requests: ................................................................. 3060
http.response_time:
  min: ......................................................................... 142
  max: ......................................................................... 236
  mean: ........................................................................ 150
  median: ...................................................................... 144
  p95: ......................................................................... 194.4
  p99: ......................................................................... 223.7
http.response_time.2xx:
  min: ......................................................................... 142
  max: ......................................................................... 236
  mean: ........................................................................ 150
  median: ...................................................................... 144
  p95: ......................................................................... 194.4
  p99: ......................................................................... 223.7
http.responses: ................................................................ 3060
vusers.completed: .............................................................. 3060
vusers.created: ................................................................ 3060
vusers.created_by_name.0: ...................................................... 3060
vusers.failed: ................................................................. 0
vusers.session_length:
  min: ......................................................................... 429.3
  max: ......................................................................... 3455.1
  mean: ........................................................................ 460.7
  median: ...................................................................... 432.7
  p95: ......................................................................... 608
  p99: ......................................................................... 685.5
```

### ✅ Destaques Positivos do Teste 2

Este resultado é mais um retrato de sucesso técnico. Sua aplicação respondeu a uma carga de **51 usuários por segundo** durante 1 minuto com estabilidade impecável.

* **Requisições totais realizadas:** 3.060 → Todas as chamadas foram processadas.
* **Todas retornaram HTTP 200:** → Isso significa **0 falhas**, sem quedas ou erros de servidor.
* **Tempo médio de resposta:** 150 ms → **Excelente!** A aplicação manteve tempos baixos mesmo com tráfego intenso.
* **Latência em cenários extremos:**
    * `p95`: 194 ms
    * `p99`: 223.7 ms
    → Mesmo os 5% mais lentos responderam bem abaixo de 1 segundo.
* **Nenhum usuário falhou:** → Os 3.060 usuários simulados conseguiram completar suas sessões com sucesso.

### 💡 O que isso prova na prática

Sua aplicação:

* **Está pronta para produção com tráfego médio-alto.**
* **Tem baixa latência sob carga**, excelente para a experiência do usuário.
* **Está rodando de forma eficiente na infraestrutura atual** — não travou, não rejeitou requisições, nem sobrecarregou.

---

## TESTE 3: Avaliando o Limite da Carga

Este teste aumenta a carga ligeiramente para **52 usuários por segundo durante 1 minuto**.

```yaml
config:
  target: "http://previsao-cancer-colorretal-app-env.eba-ei8fc28z.us-east-1.elasticbeanstalk.com"
  phases:
    - duration: 60
      arrivalRate: 52
scenarios:
  - flow:
      - get:
          url: "/"
```

**Resultado do Teste 3:**

```
All VUs finished. Total time: 1 minute, 2 seconds

--------------------------------
Summary report @ 22:32:16(-0300)
--------------------------------

errors.ETIMEDOUT: .............................................................. 4
http.codes.200: ................................................................ 3116
http.downloaded_bytes: ......................................................... 87618804
http.request_rate: ............................................................. 52/sec
http.requests: ................................................................. 3120
http.response_time:
  min: ......................................................................... 142
  max: ......................................................................... 200
  mean: ........................................................................ 145.3
  median: ...................................................................... 144
  p95: ......................................................................... 149.9
  p99: ......................................................................... 165.7
http.response_time.2xx:
  min: ......................................................................... 142
  max: ......................................................................... 200
  mean: ........................................................................ 145.3
  median: ...................................................................... 144
  p95: ......................................................................... 149.9
  p99: ......................................................................... 165.7
http.responses: ................................................................ 3116
vusers.completed: .............................................................. 3116
vusers.created: ................................................................ 3120
vusers.created_by_name.0: ...................................................... 3120
vusers.failed: ................................................................. 4
vusers.session_length:
  min: ......................................................................... 428.4
  max: ......................................................................... 3444.1
  mean: ........................................................................ 446.9
  median: ...................................................................... 432.7
  p95: ......................................................................... 459.5
  p99: ......................................................................... 645.6
```

### 🔍 Visão Geral do Desempenho do Teste 3

Este resultado mostra que a aplicação **encostou no limite**, mas ainda segurou firme com uma **taxa de sucesso de 99,87%**, mesmo com 52 requisições por segundo.

* **Requisições simuladas:** 3.120
* **Requisições com sucesso (HTTP 200):** 3.116
* **Erros de timeout (ETIMEDOUT):** apenas 4
* **Taxa de requisição sustentada:** 52 por segundo
* **Tempo médio de resposta:** 145,3 ms
* **Tempo máximo:** 200 ms → ainda muito abaixo de 1 segundo

A aplicação respondeu rapidamente e com estabilidade, mesmo com uma carga densa.

### ⚠️ Sobre os 4 erros ETIMEDOUT

Esses timeouts não são alarmantes neste cenário — representam apenas **0,13% do total**. Eles indicam que, em algum instante, talvez por latência de rede, concorrência alta ou pequenas flutuações de infraestrutura, algumas conexões não foram atendidas a tempo.

> Se o ambiente for de desenvolvimento ou estiver com uma instância EC2 menor (como `t2.micro`), esse tipo de oscilação é esperada ao atingir a borda da capacidade.

### 📈 Conclusão do Teste 3

Este teste indica que **52 usuários por segundo ainda está dentro da capacidade da sua aplicação**, com performance rápida e taxa de erro praticamente nula. No entanto, ele também acende a luz de que o **limite real está se aproximando** — talvez entre 55 e 65 usuários/s, os erros comecem a aumentar.

Podemos fazer um teste mais refinado entre 52 e 60 usuários/s para descobrir com mais precisão o ponto de virada, ou até experimentar cenários que alternem períodos de carga e descanso.




