// Esta função é para o botão "Auto Preencher Teste" no index.html
// Ela AGORA irá gerar dados LOCALMENTE em JavaScript.
function fillFormWithRandomData() { // Removido async pois não estamos usando await fetch aqui
    try {
        // Cria os novos dados aleatórios do paciente diretamente em JavaScript
        // Baseado na estrutura Python que você forneceu.
        const data = {
            // Demografia
            "Age": Math.floor(Math.random() * (89 - 20)) + 20, // Simula np.random.randint(20, 89)
            "Gender": ["Male", "Female"][Math.floor(Math.random() * 2)],
            "Race": ["White", "Black", "Asian", "Other"][Math.floor(Math.random() * 4)],
            "Region": ["North America", "Europe", "Asia", "Africa", "South America", "Oceania"][Math.floor(Math.random() * 6)], // Garante que esses valores correspondam ao seu HTML <option value="...">
            "Urban_or_Rural": ["Urban", "Rural"][Math.floor(Math.random() * 2)],
            "Socioeconomic_Status": ["Low", "Medium", "High"][Math.floor(Math.random() * 3)], // Garante que "Medium" (ou "Middle") corresponda ao seu HTML <option value="...">
            // Histórico Médico
            "Family_History": (Math.random() < 0.3) ? "Yes" : "No", // Aproxima p=[0.3, 0.7]
            "Previous_Cancer_History": (Math.random() < 0.1) ? "Yes" : "No", // Aproxima p=[0.1, 0.9]
            // Características do Câncer
            "Stage_at_Diagnosis": ["I", "II", "III", "IV"][Math.floor(Math.random() * 4)],
            "Tumor_Aggressiveness": ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
            // Rastreamento/Prevenção
            "Colonoscopy_Access": ["Yes", "No"][Math.floor(Math.random() * 2)],
            "Screening_Regularity": ["Regular", "Irregular", "Never"][Math.floor(Math.random() * 3)],
            // Fatores de Estilo de Vida
            "Diet_Type": ["Western", "Balanced", "Traditional"][Math.floor(Math.random() * 3)],
            "BMI": parseFloat((Math.random() * (40.0 - 18.5) + 18.5).toFixed(1)),
            "Physical_Activity_Level": ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
            "Smoking_Status": ["Never", "Former", "Current"][Math.floor(Math.random() * 3)], // Simplificado de ponderado para este exemplo JS. Para torná-lo ponderado, você precisaria de uma função mais complexa ou array expandido.
            "Alcohol_Consumption": ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
            "Red_Meat_Consumption": ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
            "Fiber_Consumption": ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
            // Acesso à Saúde
            "Insurance_Coverage": ["Yes", "No"][Math.floor(Math.random() * 2)],
            "Time_to_Diagnosis": ["Timely", "Delayed"][Math.floor(Math.random() * 2)],
            "Treatment_Access": ["Good", "Limited"][Math.floor(Math.random() * 2)],
            // Tratamentos (Estes são valores base; app.py lida com a simulação real do tratamento)
            "Chemotherapy_Received": "No",
            "Radiotherapy_Received": "No",
            "Surgery_Received": "No",
            // Acompanhamento (Estes farão parte dos dados enviados para /predict)
            "Follow_Up_Adherence": ["Good", "Poor"][Math.floor(Math.random() * 2)],
            "Recurrence": ["Yes", "No"][Math.floor(Math.random() * 2)],
            "Time_to_Recurrence": ["Early", "Late"][Math.floor(Math.random() * 2)]
        };

        // Registra os dados que acabaram de ser gerados por esta função JavaScript
        console.log("Dados gerados por automatic.js (client-side):", data);

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const element = document.querySelector(`[name="${key}"]`);

                // Depuração aprimorada para QUALQUER campo, especialmente se ele puder estar em branco
                // ou se for um elemento select
                const isProblematicKeyExample = key === "Time_to_Recurrence" || key === "Socioeconomic_Status" || key === "Region"; // Adicione outras chaves que você suspeita
                let shouldLogDetails = isProblematicKeyExample;
                if (element && element.tagName === 'SELECT' && data[key] !== undefined) { // Sempre registra para selects sendo preenchidos
                    shouldLogDetails = true;
                }
                if (!element && data[key] !== undefined) { // Registra se o elemento não for encontrado para uma chave de dados
                    shouldLogDetails = true;
                }


                if (shouldLogDetails) {
                    console.log(`--- Depurando Campo: "${key}" ---`);
                    console.log(`Valor dos dados JS para "${key}": "${data[key]}" (Tipo: ${typeof data[key]})`);
                    console.log(`Procurando elemento HTML com name="${key}"`);
                    console.log("Elemento encontrado:", element);
                    if (element && element.tagName === 'SELECT') {
                        let options = [];
                        for (let i = 0; i < element.options.length; i++) {
                            options.push({ text: element.options[i].text, value: element.options[i].value });
                        }
                        console.log(`Valores <option value="..."> disponíveis no dropdown para "${key}":`, options.map(o => o.value));
                    }
                    console.log("--- Fim da Depuração do Campo ---");
                }


                if (element) {
                    // Garante que o valor seja uma string, pois element.value espera uma string.
                    // Lida com null ou undefined dos dados definindo o campo como string vazia.
                    const valueToSet = (data[key] === null || typeof data[key] === 'undefined') ? "" : String(data[key]);
                    element.value = valueToSet;
                    
                    // Verifica se o valor foi realmente definido, especialmente para elementos select
                    if (element.tagName === 'SELECT' && element.value !== valueToSet && valueToSet !== "") {
                           console.warn(`Para <select name="${key}">, tentou-se definir o valor como "${valueToSet}", mas o valor real se tornou "${element.value}". Isso significa que o valor "${valueToSet}" (gerado por automatic.js) NÃO é um <option value="..."> válido em seu index.html para este dropdown.`);
                    } else if (element.tagName === 'SELECT' && valueToSet === "" && element.options.length > 0 && element.selectedIndex === -1) {
                        // Se tentamos definir para "" e nenhuma opção foi selecionada (selectedIndex é -1)
                        console.warn(`Para <select name="${key}">, o valor foi definido como string vazia. O dropdown pode aparecer em branco se não houver uma <option value="">. selectedIndex atual: ${element.selectedIndex}`);
                    }

                } else {
                    // Este aviso significa que há uma chave em seu objeto 'data'
                    // para a qual nenhum elemento HTML correspondente com esse atributo 'name' foi encontrado.
                    console.warn(`Elemento do formulário com nome "${key}" NÃO ENCONTRADO em index.html.`);
                }
            }
        }
        alert('Formulário preenchido com dados gerados automaticamente.');
    } catch (error) {
        console.error('Erro em fillFormWithRandomData (geração client-side):', error);
        alert('Falha CRÍTICA ao preencher com dados gerados automaticamente.');
    }
}

// Esta função PERMANECE IGUAL. É para o botão em resultados.html
// e busca corretamente dados aleatórios do backend Python.
async function runNewRandomTestAndRefreshResults() {
    try {
        alert('Gerando novo paciente aleatório e buscando previsões...');
        const randomPatientResponse = await fetch('/random-patient'); // Ainda busca do servidor
        if (!randomPatientResponse.ok) {
            throw new Error('Falha ao buscar dados do paciente aleatório do servidor.');
        }
        const randomPatientData = await randomPatientResponse.json();
        console.log("Novo paciente aleatório buscado para previsão direta (botão da página de resultados):", randomPatientData);

        const defaultFollowUp = {
            Follow_Up_Adherence: "Good", Recurrence: "No", Time_to_Recurrence: "Late",
            Chemotherapy_Received: "No", Radiotherapy_Received: "No", Surgery_Received: "No"
        };
        const completeRandomData = { ...defaultFollowUp, ...randomPatientData };

        const predictResponse = await fetch('/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(completeRandomData)
        });

        if (!predictResponse.ok) {
            const errorText = await predictResponse.text();
            throw new Error('Falha ao obter nova previsão: ' + errorText);
        }
        const newPredictionResults = await predictResponse.json();
        sessionStorage.setItem('predictionResults', JSON.stringify(newPredictionResults));
        window.location.reload();
    } catch (error) {
        console.error('Erro em runNewRandomTestAndRefreshResults:', error);
        alert(`Ocorreu um erro ao executar o novo teste aleatório: ${error.message}. Verifique o console (Pressione F12).`);
    }
}