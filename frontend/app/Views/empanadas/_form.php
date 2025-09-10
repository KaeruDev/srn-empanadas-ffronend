<form id="form" class="form-grid" novalidate>
  <input type="hidden" name="id" id="id">

  <label for="name">Nombre</label>
  <input type="Text" name="name" id="name" placeholder="Nombre" required>

  <label for="type">Tipo</label>
  <select class="select-modal" name="type" id="type" required>
    <option value="" disabled selected>Tipo</option>
    <option value="Horno">Horno</option>
    <option value="Frita">Frita</option>
  </select>

  <label for="filling">Relleno (opcional)</label>
  <input type="text" name="filling" id="filling" placeholder="Relleno (opcional)">

  <label for="price">Precio (opcional)</label>
  <input name="price" id="price" type="number" step="1" placeholder="Precio (opcional)">

  <label class="form-check" for="is_sold_out">
    <input type="checkbox" id="is_sold_out" class="is_sold_out"> Agotada
  </label>

  <div class="actions">
    <button class="btn btn--primary" id="modalSubmit">Guardar</button>
    <button type="button" class="btn btn--secondary" id="cancel">Cancelar</button>
  </div>
</form>