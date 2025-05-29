        document.addEventListener('DOMContentLoaded', () => {
            const resultContent = document.getElementById('resultContent');
            const summaryMessage = document.getElementById('summaryMessage');
            const storedResults = sessionStorage.getItem('predictionResults');

            if (!storedResults) {
                summaryMessage.innerHTML = '<p class="font-bold text-red-600">Erro: Dados de previsão não encontrados.</p>';
                // Opcionalmente, redirecionar para o formulário se nenhum resultado for encontrado, ou desabilitar o botão "Novo Teste Aleatório".
                // Por exemplo: document.getElementById('auto-on-results').disabled = true;
                return;
            }

            const results = JSON.parse(storedResults);
            
            const getNumericProb = (probText) => {
                if (typeof probText !== 'string') return -1;
                const num = parseFloat(probText);
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
                    <p class="text-md text-gray-700 mt-1">Nenhuma probabilidade válida foi calculada.</p>`;
            }
            
            const tableRows = results.map(item => {
                const isBest = bestResult.Model === item.Model && bestResult.Strategy === item.Strategy;
                const combinationStr = `Quimio: ${item.Combination.Chemotherapy_Received}, Rádio: ${item.Combination.Radiotherapy_Received}, Cirurgia: ${item.Combination.Surgery_Received}`;
                const probabilityDisplay = (typeof item.Probability === 'string' && item.Probability.includes('%')) 
                                                ? item.Probability 
                                                : '<span class="text-red-500 font-semibold">Inválido</span>';

                return `
                    <tr class="${isBest ? 'bg-green-50' : ''}">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium ${isBest ? 'text-green-900' : 'text-gray-900'}">${item.Strategy}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm ${isBest ? 'text-green-800' : 'text-gray-600'}">${item.Model}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm ${isBest ? 'text-green-800' : 'text-gray-600'}">${combinationStr}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-bold ${isBest ? 'text-green-600' : ''}">${probabilityDisplay}</td>
                    </tr>
                `;
            }).join('');

            resultContent.innerHTML = `
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-300">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estratégia</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modelo</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Combinação</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Probabilidade</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">${tableRows}</tbody>
                    </table>
                </div>
            `;
        });
