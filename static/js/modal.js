// /static/js/modal.js

/**
 * Exibe o modal com um título e mensagem específicos.
 * @param {string} title - O título do modal.
 * @param {string} message - A mensagem a ser exibida.
 * @param {boolean} [isError=false] - Se verdadeiro, estiliza o título e a borda como erro.
 */
function showModal(title, message, isError = false) {
    const modal = document.getElementById('messageModal');
    const modalDialog = document.getElementById('modalDialog');
    const modalTitleEl = document.getElementById('modalTitle');
    const modalMessageEl = document.getElementById('modalMessage');

    if (!modal || !modalTitleEl || !modalMessageEl || !modalDialog) {
        console.error("Elementos do modal não encontrados no HTML. Verifique se o HTML do modal está presente e os IDs estão corretos.");
        // Fallback para alert se o modal não estiver configurado corretamente
        const prefix = isError ? "ERRO" : "INFO";
        alert(`${prefix}: ${title}\n${message}`);
        return;
    }

    modalTitleEl.textContent = title;
    modalMessageEl.textContent = message;

    // Limpa classes de estilização anteriores do título e do diálogo
    modalTitleEl.classList.remove('text-red-600', 'text-green-600', 'text-indigo-700', 'text-gray-800'); // Adicionado text-indigo-700
    modalDialog.classList.remove('border-t-4', 'border-red-500', 'border-green-500', 'border-indigo-500');

    if (isError) {
        modalTitleEl.classList.add('text-red-600');
        modalDialog.classList.add('border-t-4', 'border-red-500'); // Borda superior vermelha para erro
    } else if (title.toLowerCase().includes('sucesso') || title.toLowerCase().includes('concluído')) {
        modalTitleEl.classList.add('text-green-600');
        modalDialog.classList.add('border-t-4', 'border-green-500'); // Borda superior verde para sucesso
    } else {
        modalTitleEl.classList.add('text-indigo-700'); // Cor padrão para informação/aguarde
        modalDialog.classList.add('border-t-4', 'border-indigo-500'); // Borda superior índigo para informação
    }

    modal.classList.remove('hidden');
    // Força o reflow para a animação de entrada funcionar
    void modal.offsetWidth; 
    modalDialog.classList.remove('scale-95', 'opacity-0');
    modalDialog.classList.add('scale-100', 'opacity-100');
}

/**
 * Fecha o modal.
 */
function closeModal() {
    const modal = document.getElementById('messageModal');
    const modalDialog = document.getElementById('modalDialog');

    if (!modal || !modalDialog) return;

    modalDialog.classList.add('scale-95', 'opacity-0');
    modalDialog.classList.remove('scale-100', 'opacity-100');
    
    // Espera a animação de saída terminar antes de esconder o modal completamente
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300); // Esta duração deve corresponder à duração da transição CSS no HTML/Tailwind
}

// Adiciona os event listeners quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    const closeModalBtn = document.getElementById('closeModalBtn');
    const okModalBtn = document.getElementById('okModalBtn');
    const messageModal = document.getElementById('messageModal'); // O backdrop do modal

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    if (okModalBtn) {
        okModalBtn.addEventListener('click', closeModal);
    }

    // Opcional: fechar o modal clicando no backdrop (fora da caixa de diálogo)
    if (messageModal) {
        messageModal.addEventListener('click', function(event) {
            // Verifica se o clique foi diretamente no elemento 'messageModal' (o backdrop)
            // e não em um de seus filhos (como o modalDialog).
            if (event.target === messageModal) {
                closeModal();
            }
        });
    }
});