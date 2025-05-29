// /static/js/progress.js

let current = 1;
const total = 7; // Total de 7 seções

/**
 * Valida todos os campos 'required' dentro de uma seção específica.
 * @param {number} sectionNumber - O número da seção a ser validada.
 * @returns {boolean} - True se a seção for válida, false caso contrário.
 */
function validateSection(sectionNumber) {
    const section = document.getElementById(`section-${sectionNumber}`);
    if (!section) {
        console.error(`Seção ${sectionNumber} não encontrada para validação.`);
        return false; // Não pode validar uma seção que não existe
    }

    const fields = section.querySelectorAll('[required]');

    for (const field of fields) {
        if (!field.value || field.value.trim() === "") {
            const label = document.querySelector(`label[for="${field.id}"]`);
            const fieldName = label ? label.textContent : field.name;

            // Usa o modal para exibir a mensagem de erro
            showModal('Campo Obrigatório', `Por favor, preencha ou selecione uma opção para o campo: "${fieldName}".`, true);
            
            // Tenta focar no campo, mas apenas se ele estiver visível
            // (Em teoria, nesta abordagem, o campo sempre estará visível na seção atual)
            if (field.offsetParent !== null) { // Verifica se o elemento ou seus pais não estão com display:none
                field.focus();
            }
            return false; // Retorna 'false' se a validação falhar
        }
    }
    return true; // Retorna 'true' se todos os campos da seção estiverem válidos
}

function updateProgressBar() {
    for (let i = 1; i <= total; i++) {
        const indicator = document.getElementById(`step-indicator-${i}`);
        if (!indicator) {
            console.warn(`Indicador de progresso 'step-indicator-${i}' não encontrado.`);
            continue;
        }

        indicator.classList.remove('border-violet-600', 'text-violet-600', 'bg-violet-600', 'text-white', 'border-gray-300', 'text-gray-500', 'cursor-pointer', 'cursor-default');
        indicator.innerHTML = i;
        indicator.onclick = null;

        if (i < current) {
            indicator.classList.add('border-violet-600', 'text-violet-600', 'cursor-pointer');
            indicator.innerHTML = '&#10003;'; // Checkmark
            indicator.onclick = function() {
                // Permite voltar apenas para seções já validadas (ou qualquer seção anterior)
                // A validação ao avançar garante que as seções anteriores foram validadas.
                current = i;
                showSection(i);
            };
        } else if (i === current) {
            indicator.classList.add('border-violet-600', 'cursor-default');
            indicator.innerHTML = `<div class="w-2 h-2 bg-violet-600 rounded-full mx-auto"></div>`; // Ponto atual
        } else {
            indicator.classList.add('border-gray-300', 'text-gray-500', 'cursor-default');
        }
    }
}

function showSection(n) {
    document.querySelectorAll('.section').forEach(div => {
        div.style.display = 'none'; // Garante que o display:none seja aplicado
        div.classList.remove('active');
    });

    const targetSection = document.getElementById(`section-${n}`);
    if (targetSection) {
        targetSection.style.display = 'block'; // Garante que o display:block seja aplicado
        targetSection.classList.add('active');
    } else {
        console.error(`Seção 'section-${n}' não encontrada.`);
    }
    updateProgressBar();
}

function nextSection() {
    // 1. Valida a seção atual ANTES de tentar avançar
    if (!validateSection(current)) {
        return; // Se a validação falhar (modal já foi mostrado), não faz nada
    }

    // 2. Se a validação passar, avança para a próxima seção
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

// Inicializa o formulário na primeira seção quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    // Verifica se estamos na página do formulário antes de tentar mostrar a seção
    if (document.getElementById('predictForm')) {
        showSection(current);
    }
});