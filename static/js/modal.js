// Espera o conteúdo da página principal carregar
document.addEventListener('DOMContentLoaded', () => {
  // 1. Busca o conteúdo de modal.html
  fetch('/modal.html') // Certifique-se de que o caminho está correto
    .then(response => {
      if (!response.ok) {
        throw new Error('Não foi possível carregar modal.html');
      }
      return response.text();
    })
    .then(html => {
      // 2. Injeta o HTML do modal no contêiner
      document.getElementById('modal-container').innerHTML = html;

      // 3. AGORA que o modal existe na página, podemos configurar seus botões
      const closeModalBtn = document.getElementById('closeModalBtn');
      const okModalBtn = document.getElementById('okModalBtn');
      const messageModal = document.getElementById('messageModal');

      if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
      }
      if (okModalBtn) {
        okModalBtn.addEventListener('click', closeModal);
      }
      if (messageModal) {
        messageModal.addEventListener('click', (event) => {
          if (event.target === messageModal) {
            closeModal();
          }
        });
      }
    })
    .catch(error => {
      console.error('Erro ao carregar o componente modal:', error);
      // Fallback: se o modal não carregar, usa o alert do navegador
      window.showModal = (title, message) => alert(`${title}\n${message}`);
    });
});

/**
 * Exibe o modal com um título e mensagem específicos.
 * (Esta função permanece quase a mesma)
 */
function showModal(title, message, isError = false) {
  const modal = document.getElementById('messageModal');
  const modalDialog = document.getElementById('modalDialog');
  const modalTitleEl = document.getElementById('modalTitle');
  const modalMessageEl = document.getElementById('modalMessage');

  if (!modal || !modalTitleEl || !modalMessageEl || !modalDialog) {
    console.error("Elementos do modal não encontrados. O carregamento pode ter falhado.");
    alert(`${isError ? "ERRO" : "INFO"}: ${title}\n${message}`);
    return;
  }

  modalTitleEl.textContent = title;
  modalMessageEl.innerHTML = message; // Usar innerHTML permite tags <br>, <strong>, etc.

  // Lógica de estilo (sem alterações)
  modalTitleEl.className = 'text-xl font-semibold'; // Reset
  modalDialog.classList.remove('border-t-4', 'border-red-500', 'border-green-500', 'border-indigo-500');

  if (isError) {
    modalTitleEl.classList.add('text-red-600');
    modalDialog.classList.add('border-t-4', 'border-red-500');
  } else {
    modalTitleEl.classList.add('text-indigo-700');
    modalDialog.classList.add('border-t-4', 'border-indigo-500');
  }

  modal.classList.remove('hidden');
  void modal.offsetWidth;
  modalDialog.classList.remove('scale-95', 'opacity-0');
  modalDialog.classList.add('scale-100', 'opacity-100');
}

/**
 * Fecha o modal.
 * (Esta função não precisa de alterações)
 */
function closeModal() {
  const modal = document.getElementById('messageModal');
  const modalDialog = document.getElementById('modalDialog');
  if (!modal || !modalDialog) return;

  modalDialog.classList.add('scale-95', 'opacity-0');
  modalDialog.classList.remove('scale-100', 'opacity-100');

  setTimeout(() => {
    modal.classList.add('hidden');
  }, 300);
}