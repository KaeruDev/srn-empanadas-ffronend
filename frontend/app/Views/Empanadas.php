<?= $this->extend('layouts/main') ?>

<?= $this->section('content') ?>
<header class="empanadas-header">
    <div class="title_add">
        <h1 class="empanadas-title">Empanadas</h1>
        <button class="btn btn-empanadas" id="openCreate">Agregar empanada</button>
    </div>
    <div class="filter-container">
        <div class="search-box">
            <label for="search">Buscar:</label>
            <input type="text" id="search" placeholder="Buscar por nombre o tipo">
        </div>
        <div class="filter-box">
            <label for="filter">Filtrar por tipo:</label>
            <select id="filter">
                <option value="">Todos</option>
                <option value="Horno">Horno</option>
                <option value="Frita">Frita</option>
            </select>
        </div>
        <div class="filter-box">
            <label for="soldOutFilter">Disponibilidad:</label>
            <select id="soldOutFilter">
                <option value="all">Todas</option>
                <option value="available">Disponibles</option>
                <option value="sold_out">Agotadas</option>
            </select>
        </div>
    </div>
</header>

<!-- tabla -->
<?= $this->include('empanadas/_table') ?>

<!-- modal (con el form adentro) -->
<?= $this->include('empanadas/_modal') ?>

<p id="msg" class="msg"></p>
<?= $this->endSection() ?>

<?= $this->section('scripts') ?>
<script type="module" src="<?= base_url('js/paginate.js') ?>" defer></script>
<script type="module" src="<?= base_url('js/filters.js') ?>" defer></script>
<script type="module" src="<?= base_url('js/modal.js') ?>" defer></script>
<script type="module" src="<?= base_url('js/empanadas.js') ?>" defer></script>
<?= $this->endSection() ?>