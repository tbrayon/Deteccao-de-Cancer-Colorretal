## 🛠️ Instruções de Utilização

### 📦 Instalação do Site

O site em **HTML/CSS/JavaScript** é um projeto estático e pode ser hospedado em qualquer servidor web (como GitHub Pages, Netlify, Vercel ou um servidor próprio via Apache/Nginx).

Para uso local:

1. Faça o download ou clone o repositório:
   ```bash
   git clone https://github.com/tbrayon/Tratamento-de-Cancer-Colorretal.git
   ```
2. Abra o diretório do projeto:
   ```bash
   cd Tratamento-de-Cancer-Colorretal
   ```
3. Clique duas vezes no arquivo `index.html` para abrir no navegador **ou** arraste-o diretamente para o navegador.

### 🔗 Conexão com o Backend (Flask)

1. Certifique-se de ter o Python instalado (versão 3.7 ou superior).
2. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```
3. Execute o servidor Flask:
   ```bash
   python app.py
   ```
4. Por padrão, o backend estará acessível em `http://localhost:5000`.

> ⚠️ **Importante**: O frontend está configurado para enviar requisições ao `localhost:5000`. Caso esteja em produção (por exemplo, em um servidor na AWS), ajuste o endpoint nas chamadas AJAX do JavaScript.

---

## 📜 Histórico de Versões

### [0.1.0] - 18/06/2025

#### Adicionado
- Modelo preditivo com **Naive Bayes**, **Random Forest** e **XGBoost**.
- Aplicação Flask com endpoint para predição e recomendação de tratamento.
- Interface do usuário com formulário multiparte, envio de dados e exibição de resultados.
- Sistema de mensagens interativas com modal.
- Implantação do sistema na AWS para testes de carga e escalabilidade.
- Análise de dados demográficos e fatores de risco com visualizações.

---
