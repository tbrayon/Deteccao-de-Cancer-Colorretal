// /static/js/form-handler.js

document.addEventListener('DOMContentLoaded', () => {
    const predictForm = document.getElementById('predictForm');
    if (predictForm) {
        predictForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // A validação por seção já foi feita pelo progress.js

            const form = event.target;
            const formData = new FormData(form);
            const data = {};

            formData.forEach((value, key) => {
                data[key] = value;
            });

            // Adicionar valores padrão para campos de tratamento se não estiverem presentes no formulário
            // (Estes são mais relevantes se os campos de tratamento não estão no formulário principal)
            data.Chemotherapy_Received = data.Chemotherapy_Received || "No";
            data.Radiotherapy_Received = data.Radiotherapy_Received || "No";
            data.Surgery_Received = data.Surgery_Received || "No";
            // Os campos de Follow-up Adherence, Recurrence, Time_to_Recurrence já estão na última seção do formulário.

            console.log("Dados enviados para /predict:", data); // Log para debug

            try {
                const response = await fetch('/predict', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    const errorText = await response.text(); // Tenta pegar mais detalhes do erro
                    throw new Error(`Erro na requisição: ${response.status} - ${errorText || response.statusText}`);
                }

                const resultados = await response.json();

                sessionStorage.setItem('predictionResults', JSON.stringify(resultados));
                window.location.href = '/resultados';

            } catch (error) {
                console.error('Log interno - Erro ao enviar formulário:', error);
                showModal('Erro na Previsão', `Ocorreu um erro ao processar a sua solicitação: ${error.message}. Por favor, tente novamente.`, true);
            }
        });
    }

    // Esta parte é executada na página /resultados
    const resultsContainer = document.getElementById('resultsContainer'); // Usado no seu Code 4 como resultContent
    const summaryMessage = document.getElementById('summaryMessage');

    if (resultsContainer && summaryMessage) { // Garante que ambos elementos existam
        const storedResults = sessionStorage.getItem('predictionResults');

        if (storedResults) {
            try {
                const results = JSON.parse(storedResults);
                console.log("Resultados da Previsão (página de resultados):", results);

                const getNumericProb = (probText) => {
                    if (typeof probText !== 'string') return -1;
                    const num = parseFloat(probText.replace('%', '')); // Remove '%' antes de converter
                    return isNaN(num) ? -1 : num;
                };

                const bestResult = results.reduce((max, item) => {
                    return getNumericProb(item.Probability) > getNumericProb(max.Probability) ? item : max;
                }, { Probability: "-1%" }); 

                if (getNumericProb(bestResult.Probability) > -1) {
                    summaryMessage.className = "text-center p-4 rounded-lg mb-8 border bg-indigo-50 border-indigo-200";
                    summaryMessage.innerHTML = `
                        <p class="text-lg font-semibold text-indigo-800">Melhor Estratégia Encontrada</p>
                        <p class="text-md text-gray-700 mt-1">A estratégia <strong>${bestResult.Strategy} (${bestResult.Model})</strong> resultou na maior probabilidade de sobrevivência: <strong class="text-2xl text-green-600">${bestResult.Probability}</strong></p>`;
                } else {
                    summaryMessage.className = "text-center p-4 rounded-lg mb-8 border bg-red-50 border-red-200";
                    summaryMessage.innerHTML = `
                        <p class="text-lg font-semibold text-red-800">Falha na Previsão</p>
                        <p class="text-md text-gray-700 mt-1">Nenhuma probabilidade válida foi calculada ou recebida.</p>`;
                }
                
                const tableRows = results.map(item => {
                    const isBest = bestResult.Model === item.Model && bestResult.Strategy === item.Strategy && bestResult.Probability === item.Probability;
                    const combinationStr = `Quimio: ${item.Combination.Chemotherapy_Received}, Rádio: ${item.Combination.Radiotherapy_Received}, Cirurgia: ${item.Combination.Surgery_Received}`;
                    const probabilityDisplay = (typeof item.Probability === 'string' && item.Probability.includes('%')) 
                                                ? item.Probability 
                                                : '<span class="text-red-500 font-semibold">Inválido</span>';

                    return `
                        <tr class="${isBest ? 'bg-green-50' : ''}">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium ${isBest ? 'text-green-900' : 'text-gray-900'}">${item.Strategy}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm ${isBest ? 'text-green-800' : 'text-gray-600'}">${item.Model}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm ${isBest ? 'text-green-800' : 'text-gray-600'}">${combinationStr}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-bold ${isBest ? 'text-green-600' : 'text-gray-700'}">${probabilityDisplay}</td>
                        </tr>
                    `;
                }).join('');

                resultsContainer.innerHTML = `
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-300">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estratégia</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modelo</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Combinação de Tratamento</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Probabilidade de Sobrevivência</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">${tableRows}</tbody>
                        </table>
                    </div>
                `;
            } catch (e) {
                console.error("Erro ao processar resultados da previsão:", e);
                summaryMessage.innerHTML = '<p class="font-bold text-red-600">Erro: Falha ao processar os dados da previsão.</p>';
                resultsContainer.innerHTML = '<p>Não foi possível exibir os detalhes da previsão devido a um erro.</p>';
            }
        } else {
            summaryMessage.innerHTML = '<p class="font-bold text-red-600">Nenhum resultado de previsão encontrado.</p>';
            resultsContainer.innerHTML = '<p>Por favor, volte e envie o formulário para ver os resultados.</p>';
            console.log("Nenhum resultado de previsão encontrado no sessionStorage.");
        }
    }
});