# Implantação da solução

## Implantação da Solução em Nuvem (AWS)

<p align="justify">A implantação da solução em nuvem garante <strong>escalabilidade, alta disponibilidade e segurança</strong> para os modelos preditivos. A arquitetura proposta utiliza os seguintes serviços da AWS:</p>

### Armazenamento de Dados

* **Amazon S3 (Simple Storage Service):**
<p align="justify">É utilizado para armazenar os conjuntos de dados brutos e pré-processados, modelos treinados e logs da aplicação. O S3 oferece alta durabilidade, disponibilidade e segurança. No nosso caso, um bucket será criado no S3 e será feito o upload do arquivo `colorectal_cancer_prediction.csv`. O bucket do projeto atualmente indica um uso de <strong>14.47 MB e 0,00 objetos armazenados</strong>.</p>

### Monitoramento e Gerenciamento

<p align="justify">A etapa de observação e monitoria tem como finalidade garantir a <strong>rastreabilidade, consistência e desempenho</strong> do pipeline de dados implementado. Para isso, a ferramenta escolhida foi o <strong>Amazon CloudWatch</strong>, serviço nativo da AWS voltado para o monitoramento e análise de métricas e logs.</p>    

<p align="justify">O Amazon CloudWatch permite coletar e visualizar, em tempo real, informações críticas sobre o ambiente de execução, facilitando a identificação de falhas e inconsistências ao longo do pipeline de dados. Além disso, é possível criar <strong>alarmes personalizados</strong> para o acompanhamento proativo dos indicadores definidos no projeto.</p>    

### Custos dos Serviços em Nuvem

<p align="justify">A utilização de serviços em nuvem oferece uma série de vantagens, como <strong>flexibilidade, escalabilidade e o uso de recursos sob demanda</strong>. No entanto, é crucial manter um controle rigoroso dos custos por meio de um planejamento financeiro adequado, a fim de evitar gastos desnecessários que possam comprometer a continuidade do projeto.</p>    

<p align="justify">A AWS disponibiliza em seu site a <strong>AWS Pricing Calculator</strong>, uma ferramenta gratuita que possibilita estimar o custo dos serviços da AWS com base nos recursos que você pretende usar. O serviço pode ser acessado pelo link: [https://calculator.aws.amazon.com/](https://calculator.aws.amazon.com/).</p>    

## Testes da Aplicação

Para garantir a qualidade, confiabilidade e robustez da aplicação, a fase de testes é crucial. Abaixo, apresentamos as principais etapas e tipos de testes implementados:

### 1. Testes de Unidade

**Objetivo:** Verificar se as menores unidades de código (funções, métodos, classes) funcionam conforme o esperado de forma isolada.
**Ferramentas:** `pytest` (para Python).

* **Conexão com o S3:** Verificar se a função de conexão ao S3 tenta se conectar corretamente.

### 2. Testes de Integração

**Objetivo:** Verificar a interação entre diferentes módulos ou serviços da aplicação.

* **Integração do modelo com dados de entrada:** Simular o envio de novos dados para o modelo e verificar se ele retorna previsões válidas.
* **Conectividade entre serviços AWS:** Assegurar que o S3 e outros serviços estão se comunicando perfeitamente.

### 3. Testes de Funcionalidade (End-to-End - E2E)

**Objetivo:** Validar o fluxo completo da aplicação do ponto de vista do usuário final ou do processo de negócio.

### 4. Testes de Performance e Carga

**Objetivo:** Avaliar a capacidade da aplicação de lidar com grandes volumes de dados ou alta concorrência, bem como seu desempenho sob diferentes condições.

### 5. Testes de Segurança

**Objetivo:** Identificar vulnerabilidades e garantir que a aplicação esteja protegida contra acessos não autorizados e outras ameaças.


Nesta seção, a implantação da solução proposta em nuvem deverá ser realizada e detalhadamente descrita. Além disso, deverá ser descrito também, o planejamento da capacidade operacional através da modelagem matemática e da simulação do sistema computacional.

Após a implantação, realize testes que mostrem o correto funcionamento da aplicação.

# Apresentação da solução

Nesta seção, um vídeo de, no máximo, 10 minutos onde deverá ser descrito o escopo todo do projeto, um resumo do trabalho desenvolvido, incluindo a comprovação de que o _deploy_ foi realizado e, as conclusões alcançadas.


