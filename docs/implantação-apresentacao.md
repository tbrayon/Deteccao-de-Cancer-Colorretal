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

# Deploy na AWS

## Deploy da Aplicação Flask na AWS com Elastic Beanstalk

Para implantar a aplicação **`previsao-cancer-colorretal-app`** na AWS, focaremos no **Elastic Beanstalk (EB)**. Embora existam outras opções como EC2 puro, Fargate, ECS, ou até mesmo API Gateway com Lambda (adaptando o Flask), o Elastic Beanstalk é a escolha mais prática para projetos de pequeno a médio porte. Isso porque ele **automatiza a infraestrutura e o dimensionamento** para você.

## Preparando sua Aplicação Flask

Primeiro, é essencial que a variável principal do Flask no seu projeto seja nomeada **`application`**. Se você estiver usando `app`, renomeie-a para `application`.

Depois, você precisa criar o arquivo **`requirements.txt`** com todas as dependências do seu projeto. Para isso, execute o seguinte comando no terminal:

```bash
pip freeze > requirements.txt
```

Em seguida, crie um arquivo chamado **`Procfile`** na raiz do seu projeto. Esse arquivo é crucial para o Elastic Beanstalk saber como iniciar sua aplicação usando o Gunicorn (um servidor WSGI para sistemas Unix):

```plaintext
web: gunicorn -w 4 -b 0.0.0.0:5000 application:application
```

**Observação:** O comando acima assume que seu objeto Flask se chama `application` e está definido no arquivo `application.py`. Se o nome do seu arquivo principal for diferente, ajuste `application:application` para, por exemplo, `seu_modulo_principal:application`.

## Instalação de Servidores WSGI

Para garantir que sua aplicação possa ser executada em diferentes ambientes (Linux na AWS e localmente para testes), instale os seguintes servidores WSGI:

* **Gunicorn** (para Linux, usado no Elastic Beanstalk):

    ```bash
    pip install gunicorn
    ```

* **Waitress** (para Windows, útil para testes locais):

    ```bash
    pip install waitress
    ```

## Executando e Testando Localmente

Para rodar a aplicação localmente e testar antes do deploy, use o Waitress (no Windows):

```bash
C:\Users\gina_\AppData\Roaming\Python\Python312\Scripts\waitress-serve --host=0.0.0.0 --port=5000 application:application
```

Após iniciar, você pode acessar a aplicação nos seguintes endereços:

* `http://127.0.0.1:5000/`
* `http://localhost:5000/`

---

## Detalhes do Deploy na AWS

Ao configurar seu ambiente no Elastic Beanstalk, algumas configurações comuns são:

* **Tipo de Instância:** **`T3.medium`** (bom para começar, mas pode ser ajustado conforme a demanda).
* **Zona de Disponibilidade:** **`us-east-1a`** (exemplo de zona na região N. Virginia).

Após o deploy bem-sucedido, sua aplicação estará acessível através de uma URL gerada pelo Elastic Beanstalk, similar a:

* `http://previsao-cancer-colorretal-app-env.eba-ei8fc28z.us-east-1.elasticbeanstalk.com/`

Com esses passos, você estará pronto para ter sua aplicação Flask rodando na nuvem da AWS, aproveitando a simplicidade e robustez do Elastic Beanstalk.


Nesta seção, a implantação da solução proposta em nuvem deverá ser realizada e detalhadamente descrita. Além disso, deverá ser descrito também, o planejamento da capacidade operacional através da modelagem matemática e da simulação do sistema computacional.

Após a implantação, realize testes que mostrem o correto funcionamento da aplicação.

# Apresentação da solução

Nesta seção, um vídeo de, no máximo, 10 minutos onde deverá ser descrito o escopo todo do projeto, um resumo do trabalho desenvolvido, incluindo a comprovação de que o _deploy_ foi realizado e, as conclusões alcançadas.


