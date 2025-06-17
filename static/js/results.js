// /static/js/results.js

document.addEventListener('DOMContentLoaded', function () {
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
        const last = activeTreatments.pop();
        return activeTreatments.join(', ') + ' e ' + last;
    }

    /**
     * Busca os dados do backend e atualiza a interface do usuário.
     */
    function renderPredictionResults() {
        // 1. Processa os dados
        const storedResults = sessionStorage.getItem('predictionResults');
        const data = JSON.parse(storedResults);
        console.log(data);

        // --- LÓGICA PARA A PARTE DE CIMA (COM DESTAQUE) ---

        // Encontra a predição com maior probabilidade APENAS para usar no resumo
        const bestPrediction = data.predictions.reduce((max, current) =>
            parseFloat(current.Probability) > parseFloat(max.Probability) ? current : max
        );

        const bestTreatmentText = getFormattedTreatments(bestPrediction.Combination);
        const bestProbabilityText = bestPrediction.Probability;

        // Cria a mensagem de resumo com o estilo de destaque
        const styledSummaryHTML = `
            <p class="text-lg text-gray-800 font-semibold">
                Os modelos deram recomendações diferentes. A mais promissora é <strong class="text-green-600">${bestTreatmentText}</strong> com uma confiabilidade de <strong class="text-green-600">${bestProbabilityText}</strong>. É indicada uma análise mais ampla considerando todo o histórico do paciente.
            </p>
        `;

        summaryMessageDiv.innerHTML = styledSummaryHTML;
        summaryMessageDiv.className = 'text-center p-4 rounded-lg mb-8 border border-indigo-100 bg-indigo-50 shadow';

        // --- LÓGICA PARA A TABELA (SEM DESTAQUE) ---

        // Gera as linhas da tabela, com todas tendo o mesmo estilo
        const tableRows = data.predictions.map(pred => {
            // As classes são fixas, sem nenhuma condição para destacar a melhor linha
            const rowClass = 'hover:bg-gray-50 transition-colors duration-200';
            const textClass = 'text-gray-700';
            const combinationText = getFormattedTreatments(pred.Combination);

            return `
            <tr class="${rowClass}">
                <td class="p-4 text-center ${textClass}">${pred.Model}</td>
                <td class="p-4 text-center ${textClass}">${combinationText}</td>
                <td class="p-4 text-center ${textClass}">${pred.Probability}</td>
            </tr>
            `;
        }).join('');
        
        // Insere a tabela de volta no HTML
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
    }


    // Adiciona o event listener ao botão "Novo Teste Aleatório"
    if (randomTestBtn) {
        randomTestBtn.addEventListener('click', function (event) {
            event.preventDefault();
            renderPredictionResults();
        });
    }

    // Exibe os resultados assim que a página é carregada
    renderPredictionResults();
});