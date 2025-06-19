# Apresentação da Solução

<p align="justify">Este projeto desenvolveu um modelo preditivo de machine learning para o câncer colorretal, uma doença com alta incidência e mortalidade, visando auxiliar no diagnóstico precoce e tratamento. Utilizando o dataset "Colorectal Cancer Risk & Survival Data", que contém informações demográficas, de estilo de vida, diagnóstico e tratamento de quase 90.000 pacientes, a equipe pré-processou os dados e testou modelos como Random Forest, XGBoost e Naive Bayes. Embora Random Forest e XGBoost mostrassem viés para a classe "Sobreviveu", o Naive Bayes foi considerado o mais eficaz por equilibrar a detecção de sobreviventes e não sobreviventes. A análise exploratória revelou a maior incidência de câncer colorretal em pacientes de 35 a 75 anos, predominantemente homens brancos de áreas urbanas, e a associação de hábitos como tabagismo e consumo de álcool com menor sobrevida. A solução foi implantada na AWS para escalabilidade e monitoramento, demonstrando viabilidade com testes de carga.</p>

<p align="justify">Este sistema forma uma aplicação web completa para predição de câncer colorretal e recomendação de tratamento. A aplicação Flask em Python serve como backend, carregando modelos de Machine Learning pré-treinados e um pré-processador para transformar os dados do paciente. Ele calcula a probabilidade de sobrevivência para diferentes combinações de tratamento e oferece uma recomendação ideal. A interface do usuário é construída com HTML e JavaScript, permitindo que o usuário insira informações do paciente em um formulário multiparte ou utilize dados de pacientes aleatórios. Após o envio, o JavaScript envia os dados para o backend, que retorna as previsões. O frontend então exibe esses resultados detalhados e um resumo claro, tudo estilizado para uma experiência de usuário intuitiva, e inclui um sistema de modal para mensagens interativas.</p>


## 🚀 Acesse o Projeto

🔗 **Aplicação Web:** 
http://previsao-cancer-colorretal-app-env.eba-ei8fc28z.us-east-1.elasticbeanstalk.com/
<br>


https://github.com/user-attachments/assets/8cbf0d7a-dafa-40ee-8e66-da55ba9c8389

