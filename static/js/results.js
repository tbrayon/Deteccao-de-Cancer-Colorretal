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
        return activeTreatments.slice(0, -1).join(', ') + ' e ' + activeTreatments.slice(-1);
    }

    /**
     * Busca os dados do backend e atualiza a interface do usuário.
     */
    function renderPredictionResults() {
        // 1. Process and style the summary message
        const storedResults = sessionStorage.getItem('predictionResults');
        const data = JSON.parse(storedResults);
        console.log(data);
        const summaryTextFromServer = data.result;

        const regex = /(?:recomendam|é)\s(.*?)\scom uma (?:confiabilidade|probabilidade) de\s(.*?%)/;
        const match = summaryTextFromServer.match(regex);

        let styledSummaryHTML = `<p class="text-lg text-gray-800 font-semibold">${summaryTextFromServer}</p>`;
        if (match) {
            const styledText = summaryTextFromServer
                .replace(match[1], `<strong class="text-green-600">${match[1]}</strong>`)
                .replace(match[2], `<strong class="text-green-600">${match[2]}</strong>`);
            styledSummaryHTML = `<p class="text-lg text-gray-800 font-semibold">${styledText}</p>`;
        }

        summaryMessageDiv.innerHTML = styledSummaryHTML;
        summaryMessageDiv.className = 'text-center p-4 rounded-lg mb-8 border border-indigo-100 bg-indigo-50 shadow';

        // 2. Process and render the predictions table
        const bestPrediction = data.predictions.reduce((max, current) =>
            parseFloat(current.Probability) > parseFloat(max.Probability) ? current : max
        );

        const tableRows = data.predictions.map(pred => {
            const isBest = pred === bestPrediction;
            const rowClass = isBest ? 'bg-green-50' : 'hover:bg-gray-50 transition-colors duration-200';
            const textClass = isBest ? 'text-green-600 font-bold' : 'text-gray-700';
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
