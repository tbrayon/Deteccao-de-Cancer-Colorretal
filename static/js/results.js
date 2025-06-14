// /static/js/results.js

document.addEventListener('DOMContentLoaded', function() {
    // Seleciona os elementos principais da página
    const summaryMessageDiv = document.getElementById('summaryMessage');
    const resultContentDiv = document.getElementById('resultContent');
    const randomTestBtn = document.getElementById('auto-on-results');

    // Mapeamento para traduzir os nomes dos tratamentos para português
    const treatmentTranslations = {
        'Chemotherapy': 'Quimioterapia',
        'Radiotherapy': 'Radioterapia',
        'Surgery': 'Cirurgia'
    };

    /**
     * Formata e traduz a combinação de tratamentos para um texto legível.
     * @param {object} combination - O objeto de combinação do backend.
     * @returns {string} - O nome do tratamento formatado em português.
     */
    function getFormattedTreatments(combination) {
        const activeTreatments = [];
        if (combination.Chemotherapy_Received === 'Yes') activeTreatments.push(treatmentTranslations.Chemotherapy);
        if (combination.Radiotherapy_Received === 'Yes') activeTreatments.push(treatmentTranslations.Radiotherapy);
        if (combination.Surgery_Received === 'Yes') activeTreatments.push(treatmentTranslations.Surgery);

        if (activeTreatments.length === 0) return "Nenhum Tratamento";
        if (activeTreatments.length === 1) return activeTreatments[0];
        // Junta os tratamentos com "e" no final de forma elegante
        return activeTreatments.slice(0, -1).join(', ') + ' e ' + activeTreatments.slice(-1);
    }

    /**
     * Busca os dados do backend e atualiza a interface do usuário.
     */
    async function fetchAndDisplayResults() {
        // Exibe um estado de carregamento para o usuário
        summaryMessageDiv.innerHTML = '<p class="text-gray-500 animate-pulse">Gerando nova previsão, por favor aguarde...</p>';
        resultContentDiv.innerHTML = '';
        summaryMessageDiv.className = 'text-center p-4 rounded-lg mb-8 border border-gray-200 bg-gray-50';
        if (randomTestBtn) randomTestBtn.disabled = true;

        try {
            // Faz a chamada assíncrona para o endpoint /predict
            const response = await fetch('/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({}) // O backend gera o paciente aleatório
            });

            if (!response.ok) {
                throw new Error(`Erro do servidor: ${response.status}`);
            }

            const data = await response.json();

            if (!data.predictions || data.predictions.length === 0) {
                throw new Error("Nenhuma predição foi retornada pelo servidor.");
            }

            // 1. ESTILIZA O RESUMO QUE VEM DO BACKEND
            const summaryTextFromServer = data.result;
            // Usa uma Expressão Regular (RegEx) para encontrar o tratamento e a porcentagem na frase
            const regex = /(?:recomendam|é)\s(.*?)\scom uma (?:confiabilidade|probabilidade) de\s(.*?%)/;
            const match = summaryTextFromServer.match(regex);
            
            let styledSummaryHTML = `<p class="text-lg text-gray-800 font-semibold">${summaryTextFromServer}</p>`;
            if (match) {
                // Se encontrar, substitui o texto normal por um texto com a cor verde
                const styledText = summaryTextFromServer
                    .replace(match[1], `<strong class="text-green-600">${match[1]}</strong>`)
                    .replace(match[2], `<strong class="text-green-600">${match[2]}</strong>`);
                styledSummaryHTML = `<p class="text-lg text-gray-800 font-semibold">${styledText}</p>`;
            }
            summaryMessageDiv.innerHTML = styledSummaryHTML;
            summaryMessageDiv.className = 'text-center p-4 rounded-lg mb-8 border border-indigo-100 bg-indigo-50 shadow';


            // 2. CRIA A TABELA com destaque e tradução
            const bestPrediction = data.predictions.reduce((max, current) => 
                parseFloat(current.Probability) > parseFloat(max.Probability) ? current : max
            );

            const tableRows = data.predictions.map(pred => {
                const isBest = pred === bestPrediction;
                const rowClass = isBest ? 'bg-green-50' : 'hover:bg-gray-50 transition-colors duration-200';
                // Agora, a classe de texto verde é aplicada a todas as células da melhor linha
                const textClass = isBest ? 'text-green-600 font-bold' : 'text-gray-700';
                
                // USA A FUNÇÃO PARA TRADUZIR O TRATAMENTO
                const combinationText = getFormattedTreatments(pred.Combination);

                return `
                    <tr class="${rowClass}">
                        <td class="p-4 text-center ${textClass}">${pred.Model}</td>
                        <td class="p-4 text-center ${textClass}">${combinationText}</td>
                        <td class="p-4 text-center ${textClass}">${pred.Probability}</td>
                    </tr>
                `;
            }).join('');

            resultContentDiv.innerHTML = `
                <h2 class="text-2xl font-bold text-gray-800 mb-4 text-center">Recomendações Detalhadas por Modelo</h2>
                <div class="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                    <table class="min-w-full bg-white">
                        <thead class="bg-gray-100">
                            <tr>
                                <th class="p-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Modelo de IA</th>
                                <th class="p-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Tratamento Recomendado</th>
                                <th class="p-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Probabilidade de Sucesso</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">${tableRows}</tbody>
                    </table>
                </div>
            `;

        } catch (error) {
            console.error('Erro ao buscar ou processar previsões:', error);
            summaryMessageDiv.innerHTML = `<p class="font-bold text-red-600">Erro na comunicação.</p><p class="text-sm text-gray-600">Não foi possível carregar os resultados. Por favor, tente novamente.</p>`;
            summaryMessageDiv.className = 'text-center p-4 rounded-lg mb-8 border border-red-200 bg-red-50';
        } finally {
            // Reativa o botão de teste após a conclusão (com sucesso ou erro)
            if (randomTestBtn) randomTestBtn.disabled = false;
        }
    }
    
    // Adiciona o event listener ao botão "Novo Teste Aleatório"
    if (randomTestBtn) {
        randomTestBtn.addEventListener('click', function(event) {
            event.preventDefault();
            fetchAndDisplayResults();
        });
    }

    // Exibe os resultados assim que a página é carregada
    fetchAndDisplayResults();
});
