(function () {
  const modal = document.getElementById('empanadaModal');
  if (!modal) return;

  const panel = modal.querySelector('.modal__panel');
  const title = modal.querySelector('#modalTitle');
  const openBtn = document.getElementById('openCreate');
  const cancelBtn = document.getElementById('cancel');
  const form = document.getElementById('form');

  function open(mode = 'create') {
    title.textContent = mode === 'edit' ? 'Editar empanada' : 'Agregar empanada';
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => panel.focus(), 0);
  }
  function close() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBtn?.addEventListener('click', () => {
    form?.reset?.();
    const sold = document.getElementById('is_sold_out');
    if (sold) sold.checked = false;
    cancelBtn.style.display = 'none';
    open('create');
  });

  cancelBtn?.addEventListener('click', close);
  modal.addEventListener('click', (e) => {
    if (e.target.matches('[data-modal-close], .modal__overlay')) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
  });
  
  window.empModal = { open, close };
})();
