# Empanadas — Test técnico SRN

Autor: Mario Silva

Aplicación fullstack para gestionar empanadas: Backend (Node.js + Express + MySQL) y Frontend (CodeIgniter 4) que consume la API por AJAX. Incluye Docker Compose y tests mínimos.

Requisitos

Docker Desktop (o Docker + Compose)

Node.js 20+

PHP 8.x y Composer

Arranque rápido
# 1) Backend (deps + env)
cd backend && npm i && cp .env.example .env && cd ..

# 2) Docker (API + DB)
docker compose up --build -d

# 3) Frontend (CI4)
cd frontend
composer create-project codeigniter4/appstarter .
cp env .env
php spark serve   # http://localhost:8080

Backend

API corre en: http://localhost:3000

Variables (backend/.env):

DB_HOST=db
DB_PORT=3306
DB_USER=emp
DB_PASSWORD=emp
DB_NAME=empanadas
PORT=3000


Scripts:

npm run dev     # desarrollo
npm start       # producción/local
npm test        # tests (mínimos, sin DB)

Endpoints (especificación breve)

GET /api/empanadas — lista todas

POST /api/empanada — crea (201 → { id })

PUT /api/empanada/:id — actualiza (200 → { updated: true })

DELETE /api/empanada/:id — elimina (204)

Frontend (CI4)

Servir en http://localhost:8080.

En frontend/.env:

CI_ENVIRONMENT = development
app.baseURL = 'http://localhost:8080/'
API_BASE_URL = http://localhost:3000


La vista consume la API para listar, crear, editar y eliminar.

Smoke tests (rápidos)
curl http://localhost:3000/health
curl http://localhost:3000/api/empanadas

Flujo de Git (sugerido)

Ramas: main, feat/backend, feat/frontend.

PR por cada rama → merge a main.

Problemas comunes

Docker no conecta: abrir Docker Desktop y reintentar.

/api/empanadas = 500: revisar .env y que se hayan aplicado los SQL (reiniciar volumen con docker compose down -v).

CORS: backend usa cors() habilitado.