export function aplicarFiltros(data) {
  const searchInp = document.getElementById('search');
  const typeFilter = document.getElementById('filter');
  const soldOutFilter = document.getElementById('soldOutFilter');

  let filtradas = data;

  // Filtro de búsqueda
  const search = searchInp?.value.trim().toLowerCase() || '';
  if (search) {
    filtradas = filtradas.filter(e =>
      (e.name ?? '').toLowerCase().includes(search) ||
      (e.type ?? '').toLowerCase().includes(search)
    );
  }

  // Filtro por tipo
  const tipo = typeFilter?.value || '';
  if (tipo) {
    filtradas = filtradas.filter(e => e.type === tipo);
  }

  // Filtro por disponibilidad
  const soldOut = soldOutFilter?.value || 'all';
  if (soldOut === 'available') {
    filtradas = filtradas.filter(e => !e.is_sold_out);
  } else if (soldOut === 'sold_out') {
    filtradas = filtradas.filter(e => e.is_sold_out);
  }

  return filtradas;
}