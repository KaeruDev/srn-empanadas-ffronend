export function paginate(data, currentPage, itemsPerPage) {
  const totalItems = data.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return {
    items: data.slice(start, end),
    totalItems,
    currentPage,
    totalPages
  };
}