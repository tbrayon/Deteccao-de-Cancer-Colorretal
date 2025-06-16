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

<p align="justify">A AWS disponibiliza em seu site a <strong>AWS Pricing Calculator</strong>, uma ferramenta gratuita que possibilita estimar o custo dos serviços da AWS com base nos recursos que você pretende usar. O serviço pode ser acessado pelo link: [https://calculator.aws.amazon.com/](https://calculator.aws.amazon.com/).</p>    

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

**Pronto\!**  Sua aplicação Flask está online via AWS Elastic Beanstalk, sem precisar de configurações complexas. Se precisar de mais ajustes, é só me chamar\!



# Apresentação da solução

Nesta seção, um vídeo de, no máximo, 10 minutos onde deverá ser descrito o escopo todo do projeto, um resumo do trabalho desenvolvido, incluindo a comprovação de que o _deploy_ foi realizado e, as conclusões alcançadas.


