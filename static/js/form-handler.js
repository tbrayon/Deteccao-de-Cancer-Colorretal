document.addEventListener('DOMContentLoaded', () => {
    const predictForm = document.getElementById('predictForm');
    if (predictForm) {
        predictForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const form = event.target;
            const formData = new FormData(form);
            const data = {};

            // Coletar dados do formulário
            formData.forEach((value, key) => {
                data[key] = value;
            });

            // Adicionar valores padrão para campos de tratamento se não estiverem presentes no formulário
            // Garanta que estes correspondam aos valores padrão ou à lógica do seu aplicativo Flask
            if (!data.Chemotherapy_Received) data.Chemotherapy_Received = "No";
            if (!data.Radiotherapy_Received) data.Radiotherapy_Received = "No";
            if (!data.Surgery_Received) data.Surgery_Received = "No";
            if (!data.Follow_Up_Adherence) data.Follow_Up_Adherence = "Good"; // Exemplo de valor padrão
            if (!data.Recurrence) data.Recurrence = "No"; // Exemplo de valor padrão
            if (!data.Time_to_Recurrence) data.Time_to_Recurrence = 0; // Exemplo de valor padrão para numérico
            if (!data.Stage_at_Diagnosis) data.Stage_at_Diagnosis = "I"; // Exemplo de valor padrão


            try {
                const response = await fetch('/predict', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    throw new Error('Erro na requisição: ' + response.statusText);
                }

                const resultados = await response.json();

                // Armazenar os resultados na sessionStorage
                sessionStorage.setItem('predictionResults', JSON.stringify(resultados));

                // Redirecionar para a página de resultados
                window.location.href = '/resultados';

            } catch (error) {
                console.error('Erro:', error);
                alert('Ocorreu um erro ao processar a previsão. Por favor, tente novamente.');
            }
        });
    }

    // Esta parte é executada na página /resultados
    const resultsContainer = document.getElementById('resultsContainer');
    if (resultsContainer) {
        const storedResults = sessionStorage.getItem('predictionResults');

        if (storedResults) {
            const results = JSON.parse(storedResults);
            console.log("Resultados da Previsão:", results);

            let htmlContent = '<h2>Resultados da Previsão</h2>';
            htmlContent += '<table border="1" style="width:100%; border-collapse: collapse;">';
            htmlContent += '<thead><tr><th>Estratégia</th><th>Modelo</th><th>Combinação</th><th>Probabilidade de Sobrevivência</th></tr></thead>';
            htmlContent += '<tbody>';

            results.forEach(item => {
                const combinationStr = `Quimioterapia: ${item.Combination.Chemotherapy_Received}, Radioterapia: ${item.Combination.Radiotherapy_Received}, Cirurgia: ${item.Combination.Surgery_Received}`;
                htmlContent += `
                    <tr>
                        <td>${item.Strategy}</td>
                        <td>${item.Model}</td>
                        <td>${combinationStr}</td>
                        <td>${item.Probability}</td>
                    </tr>
                `;
            });
            htmlContent += '</tbody></table>';
            resultsContainer.innerHTML = htmlContent;

            // Limpar sessionStorage após a exibição, se os resultados forem para exibição única
            // sessionStorage.removeItem('predictionResults');

        } else {
            resultsContainer.innerHTML = '<p>Nenhum resultado de previsão encontrado. Por favor, volte e envie o formulário.</p>';
            console.log("Nenhum resultado de previsão encontrado.");
            // Opcionalmente, redirecionar de volta para a página do formulário
            // window.location.href = '/';
        }
    }
});
