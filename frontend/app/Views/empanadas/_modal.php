<div id="empanadaModal" class="modal" aria-hidden="true" role="dialog" aria-labelledby="modalTitle">
  <div class="modal__overlay" data-modal-close></div>

  <div class="modal__panel surface" role="document" tabindex="-1">
    <header class="modal__header">
      <h2 id="modalTitle" class="muted">Empanada</h2>
      <button class="modal__close" aria-label="Cerrar" data-modal-close>&times;</button>
    </header>

    <div class="modal__body">
      <?= $this->include('empanadas/_form') ?>
    </div>
  </div>
</div>