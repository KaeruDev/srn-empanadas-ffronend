import { aplicarFiltros } from './filters.js';
import { paginate } from './paginate.js';


const API = document.querySelector('meta[name="api-base"]').content;

const tbody = document.getElementById('tbody');
const form = document.getElementById('form');
const idInput = document.getElementById('id');
const nameInput = document.getElementById('name');
const typeInput = document.getElementById('type');
const fillingInput = document.getElementById('filling');
const priceInput = document.getElementById('price');
const soldOutInput = document.getElementById('is_sold_out');
const msg = document.getElementById('msg');
const formTitle = document.getElementById('formTitle');
const cancelBtn = document.getElementById('cancel');

const searchInput = document.getElementById('search');
const typeFilter = document.getElementById('filter');
const soldOutFilter = document.getElementById('soldOutFilter');

let cache = [];
let currentPage = 1;
const itemsPerPage = 5;


function renderTable(data) {
  const pagination = paginate(data, currentPage, itemsPerPage);
  tbody.innerHTML = pagination.items.map(e => `
    <tr>
      <td>${e.id}</td>
      <td class="type-empanada">${e.type ?? ''}</td>
      <td class="empanada-name">${e.name ?? ''}</td>
      <td>${e.filling ?? ''}</td>
      <td>${!isNaN(Number(e.price)) ? Number(e.price).toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }) : ''}</td>
      <td class="${e.is_sold_out ? "out-stock" : "stock" }">${e.is_sold_out ? 'Agotada' : 'Disponible'}</td>
      <td>
        <button class="btn btn--sm edit" data-edit="${e.id}">
          <i class="fa fa-pencil" aria-hidden="true" data-edit="${e.id}"></i>
        </button>
        <button class="btn btn--sm del" data-del="${e.id}">
          <i class="fa fa-trash" aria-hidden="true" data-del="${e.id}"></i>
        </button>
      </td>
    </tr>
  `).join('');
  renderPagination(pagination);
}


function renderPagination({ currentPage: page, totalPages }) {
  const paginator = document.getElementById('paginator');
  if (!paginator) return;
  paginator.innerHTML = '';

  const prevBtn = document.createElement('button');
  prevBtn.textContent = 'Anterior';
  prevBtn.disabled = page === 1;
  prevBtn.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      filterEmpanadas();
    }
  };
  paginator.appendChild(prevBtn);

  const info = document.createElement('span');
  info.textContent = ` Pagina ${page} de ${totalPages} `;
  paginator.appendChild(info);

  const nextBtn = document.createElement('button');
  nextBtn.textContent = 'Siguiente';
  nextBtn.disabled = page === totalPages;
  nextBtn.onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      filterEmpanadas();
    }
  };
  paginator.appendChild(nextBtn);
}

function filterEmpanadas() {
  const filtered = aplicarFiltros(cache);
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  if (currentPage > totalPages) currentPage = totalPages;
  renderTable(filtered);
}

async function loadData() {
  console.log('Cargando datos de empanadas desde la API...');
  const r = await fetch(`${API}/api/empanadas`);
  const data = await r.json();
  cache = data;
  filterEmpanadas();
}

searchInput?.addEventListener('input', () => {
  currentPage = 1;
  filterEmpanadas();
});
typeFilter?.addEventListener('change', () => {
  currentPage = 1;
  filterEmpanadas();
});
soldOutFilter?.addEventListener('change', () => {
  currentPage = 1;
  filterEmpanadas();
});

tbody?.addEventListener('click', async (ev) => {
  const editId = ev.target.getAttribute('data-edit');
  const delId  = ev.target.getAttribute('data-del');
  if (editId) editEmpanada(Number(editId));
  if (delId)  await deleteEmpanada(Number(delId));
});


form?.addEventListener('submit', async (ev) => {
  ev.preventDefault(); msg.textContent = '';

  const payload = {
    name: nameInput.value.trim(),
    type: typeInput.value.trim(),
    filling: fillingInput.value.trim() || null,
    price: priceInput.value ? Number(priceInput.value) : null,
    is_sold_out: soldOutInput.checked
  };
  if (!payload.name || !payload.type) {
    msg.textContent = 'Name and type are required';
    return;
  }

  const idVal = idInput.value;
  const url = idVal ? `${API}/api/empanada/${idVal}` : `${API}/api/empanada`;
  const method = idVal ? 'PUT' : 'POST';

  const res = await fetch(url, {
    method,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    clearForm();
    await loadData();
    window.empModal?.close();
  } else {
    const err = await safeJson(res);
    msg.textContent = err?.error || `Error ${res.status}`;
  }
});

async function deleteEmpanada(id){
  msg.textContent = '';
  const res = await fetch(`${API}/api/empanada/${id}`, { method:'DELETE' });
  if (res.status === 204) loadData();
  else msg.textContent = `Could not delete (status ${res.status})`;
}

function editEmpanada(empId){
  const e = cache.find(x => x.id === empId);
  if(!e) return;
  idInput.value = e.id;
  nameInput.value = e.name ?? '';
  typeInput.value = e.type ?? '';
  fillingInput.value = e.filling ?? '';
  priceInput.value = e.price ?? '';
  soldOutInput.checked = !!e.is_sold_out;
  
  const modalTitle = document.getElementById('modalTitle');
  if (modalTitle) modalTitle.textContent = 'Editar empanada';

  cancelBtn.style.display = '';
  window.empModal?.open('edit');
}

cancelBtn?.addEventListener('click', () => clearForm());

function clearForm(){
  idInput.value = '';
  form.reset();
  soldOutInput.checked = false;
  cancelBtn.style.display = 'none';
  if (msg) msg.textContent = '';
}

async function safeJson(res){
  try { return await res.json(); } catch { return null; }
}

document.addEventListener('DOMContentLoaded', loadData);