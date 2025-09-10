<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?= esc($title ?? 'Empanadas') ?></title>

  <meta name="api-base" content="<?= getenv('API_BASE_URL') ?>">

  <link rel="stylesheet" href="<?= base_url('styles/base.css') ?>">
  <link rel="stylesheet" href="<?= base_url('styles/components/table.css') ?>">
  <link rel="stylesheet" href="<?= base_url('styles/components/form.css') ?>">
  <link rel="stylesheet" href="<?= base_url('styles/components/modal.css') ?>">
  <link rel="stylesheet" href="<?= base_url('styles/main.css') ?>">
  <link rel="stylesheet" href="<?= base_url('styles/empanadas.css') ?>">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

  <?= $this->renderSection('head') ?>
</head>
<body>
  <div class="container">
    <header class="main-header">
      <h1 class="page-title">SRN Empanadas</h1>
      <!-- agregar aqui toast -->
       <div class="toast-container" id="toast">
          <!--agregar aqui los mensaje -->
       </div>
    </header>
    <?= $this->renderSection('content') ?>
  </div>

  <?= $this->renderSection('scripts') ?>
</body>
</html>
