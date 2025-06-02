# Implantação da solução

## Implantação da Solução em Nuvem (AWS)

A implantação da solução em nuvem garante **escalabilidade, alta disponibilidade e segurança** para os modelos preditivos. A arquitetura proposta utiliza os seguintes serviços da AWS:

### Armazenamento de Dados

* **Amazon S3 (Simple Storage Service):**
    É utilizado para armazenar os conjuntos de dados brutos e pré-processados, modelos treinados e logs da aplicação. O S3 oferece alta durabilidade, disponibilidade e segurança. No nosso caso, um bucket será criado no S3 e será feito o upload do arquivo `colorectal_cancer_prediction.csv`. O bucket do projeto atualmente indica um uso de **14.47 MB e 0,00 objetos armazenados**.

### Monitoramento e Gerenciamento

A etapa de observação e monitoria tem como finalidade garantir a **rastreabilidade, consistência e desempenho** do pipeline de dados implementado. Para isso, a ferramenta escolhida foi o **Amazon CloudWatch**, serviço nativo da AWS voltado para o monitoramento e análise de métricas e logs.

O Amazon CloudWatch permite coletar e visualizar, em tempo real, informações críticas sobre o ambiente de execução, facilitando a identificação de falhas e inconsistências ao longo do pipeline de dados. Além disso, é possível criar **alarmes personalizados** para o acompanhamento proativo dos indicadores definidos no projeto.

### Custos dos Serviços em Nuvem

A utilização de serviços em nuvem oferece uma série de vantagens, como **flexibilidade, escalabilidade e o uso de recursos sob demanda**. No entanto, é crucial manter um **controle rigoroso dos custos** por meio de um planejamento financeiro adequado, a fim de evitar gastos desnecessários que possam comprometer a continuidade do projeto.

A AWS disponibiliza em seu site a **AWS Pricing Calculator**, uma ferramenta gratuita que possibilita estimar o custo dos serviços da AWS com base nos recursos que você pretende usar. O serviço pode ser acessado pelo link: [https://calculator.aws.amazon.com/](https://calculator.aws.amazon.com/).

Nesta seção, a implantação da solução proposta em nuvem deverá ser realizada e detalhadamente descrita. Além disso, deverá ser descrito também, o planejamento da capacidade operacional através da modelagem matemática e da simulação do sistema computacional.

Após a implantação, realize testes que mostrem o correto funcionamento da aplicação.

# Apresentação da solução

Nesta seção, um vídeo de, no máximo, 10 minutos onde deverá ser descrito o escopo todo do projeto, um resumo do trabalho desenvolvido, incluindo a comprovação de que o _deploy_ foi realizado e, as conclusões alcançadas.


