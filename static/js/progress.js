let current = 1;
const total = 7; // CORRIGIDO: Seu HTML tem 7 passos/indicadores

function updateProgressBar() {
    for (let i = 1; i <= total; i++) {
        const indicator = document.getElementById(`step-indicator-${i}`);
        if (!indicator) {
            console.warn(`Indicador de progresso 'step-indicator-${i}' não encontrado. Pulando.`);
            continue;
        }

        // Redefine classes e conteúdo
        indicator.classList.remove(
            'border-violet-600', // Borda de concluído/atual
            'text-violet-600',   // Marca de seleção de concluído / Texto atual (se houver)
            'bg-violet-600',     // REMOVIDO do fundo do passo concluído
            'text-white',        // Para marca de seleção se o fundo for violeta
            'border-gray-300',   // Borda do passo futuro
            'text-gray-500',     // Texto do passo futuro
            'cursor-pointer',    // Para passos clicáveis
            'cursor-default'     // Para passos não clicáveis
        );
        indicator.innerHTML = i; // O conteúdo padrão é o número
        indicator.onclick = null;  // Remove qualquer manipulador de clique existente

        if (i < current) {
            // PASSOS CONCLUÍDOS: Borda violeta, marca de seleção violeta, clicável
            indicator.classList.add('border-violet-600', 'text-violet-600', 'cursor-pointer');
            indicator.innerHTML = '&#10003;'; // Marca de seleção Unicode '✓'
            indicator.onclick = function() {
                current = i; // Define 'current' para o passo clicado
                showSection(i);
            };
        } else if (i === current) {
            // PASSO ATUAL: Borda violeta, ponto violeta interno
            indicator.classList.add('border-violet-600', 'cursor-default');
            // O HTML interno cria o ponto diretamente com Tailwind
            indicator.innerHTML = `<div class="w-2 h-2 bg-violet-600 rounded-full mx-auto"></div>`;
        } else {
            // PRÓXIMOS PASSOS: Borda cinza, número cinza
            indicator.classList.add('border-gray-300', 'text-gray-500', 'cursor-default');
        }
    }
}

function showSection(n) {
    document.querySelectorAll('.section').forEach(div => {
        div.classList.remove('active');
        div.style.display = 'none';
    });

    const targetSection = document.getElementById(`section-${n}`);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.style.display = 'block';
    } else {
        console.error(`Seção 'section-${n}' não encontrada.`);
    }
    updateProgressBar(); // Atualiza os visuais da barra de progresso sempre que uma seção é mostrada
}

function nextSection() {
    const currentSectionElement = document.getElementById(`section-${current}`);
    if (currentSectionElement && currentSectionElement.style.display !== 'block') {
        console.warn(`Tentativa de avançar a partir da seção oculta-${current}.`);
        return;
    }
    if (current < total) {
        current++;
        showSection(current);
    }
}

function prevSection() {
    if (current > 1) {
        current--;
        showSection(current);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    showSection(current); // Mostra a primeira seção no carregamento inicial da página

    const predictForm = document.getElementById('predictForm');
    if (predictForm) {
        predictForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const formData = new FormData(predictForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            // Garante que todos os campos esperados estejam presentes com valores padrão se não forem definidos explicitamente
            data.Chemotherapy_Received = data.Chemotherapy_Received || "No";
            data.Radiotherapy_Received = data.Radiotherapy_Received || "No";
            data.Surgery_Received = data.Surgery_Received || "No";
            data.Follow_Up_Adherence = data.Follow_Up_Adherence || "Good";
            data.Recurrence = data.Recurrence || "No";
            // Para Time_to_Recurrence, seu formulário envia "Early" ou "Late"
            // Se puder estar faltando no formulário de alguma forma (ex: não é o último passo), garanta um padrão válido:
            data.Time_to_Recurrence = data.Time_to_Recurrence || "Early"; 
            data.Stage_at_Diagnosis = data.Stage_at_Diagnosis || "I";

            try {
                const response = await fetch('/predict', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Erro na requisição: ${response.status} - ${errorText}`);
                }

                const resultados = await response.json();
                sessionStorage.setItem('predictionResults', JSON.stringify(resultados));
                window.location.href = '/resultados';
            } catch (error) {
                console.error('Erro de envio:', error);
                alert(`Ocorreu um erro ao processar a previsão: ${error.message}. Tente novamente.`);
            }
        });
    }
});