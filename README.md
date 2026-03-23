# Docker Server Fullstack

## Objetivo: Desarrollar un Producto/Proyecto Fullstack, usando Docker (Contenedores) junto a NGINX Proxy y Load Balancer

> Producto/Proyecto Docker & Nginx | Desarrollo Fullstack

- Desarrollar un proyecto Fullstack y usar Docker
- Desarrolla Docker Multi-stage, Compose y networking
- Desarrolla NginxProxy y Load Balancing
- Cómo estructurar micro-servicios simples
- Cómo pensar en Infraestructura desde cero; en tiempos de IA (Inteligencia Artificial)

---

## Fullstack Project (Frontend + Backend)

> Proyecto base para una arquitectura **Fullstack moderna**, preparada para:

- Backend API con (FastAPI)
- Frontend (por implementar)
- Gestión de dependencias con (uv)
- Entornos aislados con ().venv)
- Variables de entorno con ().env)
- Contenerización posterior con (Docker / Multi-stage builds)

---

## Desarrollo Frontend

> El Frontend está construido usando:

Stack sugerido:

- Vite
- React
- Next.js
- TypeScript
- Tailwind

Estructura inicial:

```bash
frontend
│
├── src
├── public
├── package.json
└── README.md

```

---

```bash

project-root
│
├── README.md
├── backend
│   ├── main.py
│   ├── pyproject.toml
│   ├── uv.lock
│   ├── .env
│   ├── .gitignore
│   └── .venv (local dev)
│
└── frontend
    ├── package.json
    ├── pnpm-lock.yaml
    ├── vite.config.ts
    ├── index.html
    ├── src/
    └── public/

```

> Estructura Adaptada a la API con OpenAPI

```bash

backend/
└── app/
    ├── main.py                    ← Entry point FastAPI
    │
    ├── api/
    │   └── v1/
    │       ├── __init__.py
    │       └── routes/
    │           ├── __init__.py
    │           ├── movies.py      ← Lo que ya tienes
    │           └── auth.py        ← Siguiente fase (JWT)
    │
    ├── schemas/
    │   ├── __init__.py
    │   └── movie.py               ← Pydantic models
    │
    ├── services/
    │   ├── __init__.py
    │   └── data_product_workflow.py
    │
    └── core/                      ← Cuando llegues a Auth
        ├── __init__.py
        └── config.py              ← Settings, secret keys, env vars

```

> Agregar (Add): .gitignore (Root) principal

```bash
 .gitignore
 
```

---

## Desarrollo Backend

> El backend está construido usando:

- Python 3.12
- FastAPI
- uv (gestor moderno de dependencias)
- Uvicorn (servidor ASGI)

---

## 🐳 Docker

> **Docker Compose** - 3 contenedores activos

```bash
# Desde la raíz del proyecto
cp .env.example .env
 
# Levantar todo
docker compose up --build
 
# Detener
docker compose down
 
# Detener + borrar volumen (datos)
docker compose down -v
```

---

## Dockerfile — Multi-stage

> **Nota:** El build context debe apuntar a `./backend`, no a la raíz.

```bash
Stage 1 (builder)  →  instala deps con uv, crea .venv
Stage 2 (runtime)  →  copia /app, agrega libpq-dev, expone :5000
```

---

## Build individual (sin Compose)

```bash
docker build -t backend-fastapi ./backend
docker run -d -p 5000:5000 --name backend backend-fastapi
docker logs backend
docker stop backend && docker rm backend
```

---

## 📦 Dataset

> Archivo: `data/disney_movies_2_cleaned.csv`

```bash
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `MovieTitle` | string | Título de la película |
| `ReleaseDate` | string | Fecha de estreno (DD/MM/YYYY) |
| `Genre` | string | Género |
| `Rating` | string | Clasificación MPAA |
| `TotalGross` | int | Recaudación total en USD |
| `AdjustedGross` | int | Recaudación ajustada por inflación |
```

- **Total:** 579 películas · **Rango:** 1937–2016

---

## Git Flow

```bash
main          ← Producción (solo merge desde develop)
staging       ← Pre-producción / QA
develop       ← Integración (base de todo el desarrollo)
feature/*     ← Ramas temporales por funcionalidad
```

```bash

# Crear feature
git checkout develop
git switch -c feature/nombre-feature
 
# Commit y merge
git add .
git commit -m "feat: descripción"
git checkout develop
git merge feature/nombre-feature
git branch -d feature/nombre-feature
git push origin develop
 
# Promote a main (cuando develop está estable)
git checkout main
git merge develop
git push origin main

```

---

## Contrato OpenAPI

El contrato completo está en `backend/docs/openapi.yaml`.

Para visualizarlo localmente:

1. Abre [editor.swagger.io](https://editor.swagger.io)
2. Pega el convened de `openapi.yaml`

O con el servidor corriendo:

```bash

openapi.yaml
├── info          → título, versión, descripción, licencia
├── servers       → localhost:5000 (Docker) + staging
├── tags          → Health, Movies
├── paths         → los 5 endpoints documentados
└── components
    ├── parameters → LimitParam, OffsetParam (reutilizables con $ref)
    ├── schemas    → MovieResponse, MovieListResponse, StatsResponse, ErrorResponse
    └── responses  → NotFound, InternalError (reutilizables con $ref)

```

```bash
http://localhost:5000/docs       ← Swagger UI (autogenerado por FastAPI)
http://localhost:5000/openapi.json
```

---

> Agregamos versión y endpoints & rutas (Routes) en nuestro Contrato & 'main'

## Endpoints disponibles

```bash
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/movies` | Lista paginada de películas |
| GET | `/movies/search` | Filtrar por género y/o rating |
| GET | `/movies/stats` | Estadísticas del dataset |
| GET | `/movies/{title}` | Buscar por título |
```

## Notas

> Notas referentes a las rutas (Routes) y endpoints

- Los datos provienen de `disney_movies_2_cleaned.csv`
- La paginación usa `limit` y `offset`
- Ratings disponibles: `G`, `PG`, `PG-13`, `R`, `Not Rated`

```yaml
    version="0.1.0",
    contact={
        "name": "Disney Movies API",
        "url": "http://localhost:5000/docs",
    },
    license_info={
        "name": "MIT",
    },
    openapi_tags=[
        {
            "name": "Movies",
            "description": "Operaciones sobre el dataset de películas Disney.",
        },
        {
            "name": "Health",
            "description": "Estado del servidor.",
        },
    ],
)
```

---

## Convención de commits

> Comandos: Comandos que usamos durante el desarrollo

```bash

| Prefijo | Uso |
|---------|-----|
| `feat:` | Nueva funcionalidad |
| `fix:` | Corrección de bug |
| `docs:` | Documentación |
| `refactor:` | Refactor sin cambio funcional |
| `test:` | Pruebas |
| `chore:` | Tareas de mantenimiento |

```

## 🧪 Tests — TDD Pipeline

> Estructura [Pipeline test]

```bash
app/tests/
├── conftest.py
├── unit/                          # Rápidos — sin I/O real
│   ├── test_movies_service.py     # 34 tests
│   ├── test_security.py           # 22 tests
│   └── test_auth_service.py       # 9 tests
└── integration/                   # HTTP real — TestClient
    ├── test_movies_endpoints.py   # 40 tests
    └── test_auth_endpoints.py     # 18 tests
```

> Suites por archivo

**`test_movies_service.py`**

```bash
| Suite | Función | Tests |
|-------|---------|-------|
| 1 | `_parse_row` — mapeo CSV | 5 |
| 2 | `load_data` — paginación | 8 |
| 3 | `get_movie_by_title` — búsqueda | 6 |
| 4 | `search_movies` — filtros | 9 |
| 5 | `get_stats` — agregamos | 12 |
```

**`test_security.py`**

```bash
| Suite | Función | Tests |
|-------|---------|-------|
| 1 | Password hashing (bcrypt) | 6 |
| 2 | Access token (JWT) | 8 |
| 3 | Refresh token | 5 |
| 4 | RBAC — check_permission | 5 |
```

**`test_movies_endpoints.py`**

```bash
| Suite | Endpoint | Tests |
|-------|----------|-------|
| 1 | `GET /movies` | 11 |
| 2 | `GET /movies/search` | 10 |
| 3 | `GET /movies/stats` | 9 |
| 4 | `GET /movies/{title}` | 7 |
| 5 | `GET /` health check | 3 |
```

**`test_auth_endpoints.py`**

```bash
| Suite | Endpoint | Tests |
|-------|----------|-------|
| 7 | `POST /auth/register` | 4 |
| 8 | `POST /auth/login` | 3 |
| 9 | Endpoints protegidos | 7 |
```

### Correr tests

```bash
# Con Makefile (recomendado)
make test              # todos
make test-unit         # solo unitarios
make test-integration  # solo integración
make test-movies       # movies (unit + integration)
make test-auth         # auth (unit + integration)
make test-security     # JWT + RBAC
make test-cov          # con reporte de cobertura
 
# Sin Makefile
pytest app/tests/ -v
pytest app/tests/unit/test_movies_service.py -v
pytest --cov=app --cov-report=term-missing
```

> **Pytest** [pytest.ini]

```bash
[pytest]
testpaths = app/tests
python_files = test_*.py
python_classes = Test*
python_functions = test_*
addopts = -v --tb=short
markers =
    unit: Tests unitarios (sin I/O)
    integration: Tests de integración (TestClient)
```

---

## Makefile — comandos rápidos

> El `Makefile` vive en `backend/` y evita tener que recordar rutas largas.

```bash
# Desde backend/
make help              # ver todos los comandos disponibles
 
# Dev
make install           # instalar dependencias (uv sync --dev)
make run               # servidor FastAPI con hot-reload
 
# Tests
make test              # todos los tests
make test-movies       # unit + integration de movies
make test-auth         # unit + integration de auth
make test-security     # JWT + RBAC
make test-cov          # con reporte de cobertura
 
# Docker
make docker-up         # levantar Compose (db + redis + backend)
make docker-down       # detener contenedores
make docker-logs       # ver logs del backend en tiempo real
make docker-reset      # detener + borrar volúmenes
 
# Código
make lint              # revisar estilo (ruff)
make format            # formatear (ruff format)
```

---

## 🗺 Roadmap

> Roadmap: Explicar el Proceso que se tomó y la toma de decisiones. Desde Contenedores Docker y Nginx; hasta el trabajo y desarrollo de la API. Manejo de Frontend y Backend

### ✅ Fase 1 — API Base

- [x] Endpoint `/data` functional con CSV
- [x] Docker Multi-stage build
- [x] Corrección de bugs (path resolution, `resolve()`)
- [x] Estructura professional `api/v1/routes/`

### ✅ Fase 2 — Contrato OpenAPI

- [x] Schemas Pydantic con herencia (`MovieBase → MovieResponse`)
- [x] 4 endpoints documentados con `operationId`, examples y error responses
- [x] Contrato YAML OpenAPI 3.1.0 en `docs/openapi.yaml`
- [x] Paginación con `limit` / `offset`
- [x] Endpoint de estadísticas por género

### 🔄 Fase 3 — Auth / JWT (en desarrollo)

- [ ] `POST /api/v1/auth/register`
- [ ] `POST /api/v1/auth/login`
- [ ] Protección de endpoints con `Depends(get_current_user)`
- [ ] `core/security.py` — generación y verificación de tokens
- [x] `docker-compose.yml` con db + redis + backend

### ✅ Fase TDD — Pipeline de Tests

- [x] `pytest.ini` en raíz de `backend/`
- [x] Tests unitarios: `test_movies_service.py` (34 tests)
- [x] Tests unitarios: `test_security.py` (22 tests)
- [x] Tests unitarios: `test_auth_service.py` (9 tests)
- [x] Tests integración: `test_movies_endpoints.py` (40 tests)
- [x] Tests integración: `test_auth_endpoints.py` (18 tests)
- [x] Todos los tests usan mocks — sin CSV real ni DB

### ⏳ Fase 4 — Nginx + Docker Compose completo

- [ ] Descomentar servicio `nginx` en `docker-compose.yml`
- [ ] `nginx/nginx.conf` — reverse proxy
- [ ] Descomentar servicio `frontend`
- [ ] Variables de entorno por entorno (`dev`, `staging`, `prod`)

### ⏳ Fase 5 — Frontend conectado

- [ ] Cliente TypeScript generado desde `openapi.yaml`
- [ ] Integración con endpoints de la API
- [ ] CORS configurado para producción

---

### Estructura del Proyecto + AI

> Agregamos Bases de datos - Auth - JWT Tokens | AI Skills Agents - MCP [claude CLI]

```bash
disney-movies/
├── docker-compose.yml                 # Orquestación: db + redis + backend
├── .env.example                       # Template de variables de entorno
├── .gitignore
├── README.md
│
├── .claude/
│   └── agents.md                      # Contexto del proyecto para Claude
│
├── backend/
│   ├── Makefile                       # Comandos rápidos (test, run, docker)
│   ├── app/
│   │   ├── main.py                    # Entry point FastAPI + lifespan
│   │   ├── api/
│   │   │   └── v1/
│   │   │       └── routes/
│   │   │           ├── movies.py      # Endpoints de películas
│   │   │           └── auth.py        # Endpoints de autenticación
│   │   ├── core/
│   │   │   ├── config.py              # Settings + DATABASE_URL + REDIS_URL
│   │   │   ├── database.py            # SQLAlchemy engine + get_db()
│   │   │   ├── cache.py               # Redis client + CacheKeys
│   │   │   ├── logger.py              # JSON structured logger
│   │   │   ├── security.py            # JWT + bcrypt + RBAC
│   │   │   ├── dependencies.py        # get_current_user, require_role
│   │   │   └── exceptions.py          # Excepciones de dominio
│   │   ├── models/
│   │   │   └── user.py                # ORM Model — tabla users
│   │   ├── schemas/
│   │   │   ├── movie.py               # Pydantic — Movies
│   │   │   └── auth.py                # Pydantic — Auth
│   │   ├── services/
│   │   │   ├── data_product_workflow.py  # Lógica CSV Disney
│   │   │   └── auth_service.py           # Register + Login
│   │   ├── docs/
│   │   │   └── openapi.yaml           # Contrato OpenAPI 3.1.0 v2.1.0
│   │   └── tests/
│   │       ├── conftest.py
│   │       ├── unit/
│   │       │   ├── test_movies_service.py   # 5 suites — service layer
│   │       │   ├── test_security.py         # 4 suites — JWT + RBAC
│   │       │   └── test_auth_service.py     # 2 suites — register + login
│   │       └── integration/
│   │           ├── test_movies_endpoints.py # 5 suites — HTTP movies
│   │           └── test_auth_endpoints.py   # 3 suites — HTTP auth
│   ├── data/
│   │   └── disney_movies_2_cleaned.csv
│   ├── pytest.ini                     # Configuración de pytest
│   ├── Dockerfile                     # Multi-stage build
│   ├── pyproject.toml
│   └── uv.lock
│
└── frontend/                          # (Fase 5 — WIP)
    ├── src/
    ├── Dockerfile
    └── vite.config.ts

```

---

### Stack Técnico

> Posible 'Stack' al pensar en Agregar AI | Pensar en lo que podemos usar o agregar

- CLI (Escoger la que prefieras) / ADE (+ I.A) & IDE
- Architecture.md
- Agents.md
- Skills (Crear tus propios Comandos para ejecutar IA)
- LLM (Models)
- Agents AI
- MCP (Model Context Protocol)

```bash

| Capa | Tecnología |
|------|------------|
| Backend | Python 3.12 · FastAPI · Pydantic v2 |
| Auth | JWT (PyJWT) · bcrypt · RBAC |
| ORM | SQLAlchemy |
| Base de datos | PostgreSQL 16 |
| Caché | Redis 7 |
| Package manager | uv |
| Tests | pytest · httpx · unittest.mock |
| Automatización | Makefile |
| Contrato API | OpenAPI 3.1.0 (YAML) |
| Contenedores | Docker Multi-stage · Docker Compose |
| Frontend (WIP) | React · TypeScript · Vite |
| Proxy (WIP) | Nginx |

```

---

### The MIT License

[MIT License / Github](https://docs.github.com/es/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository)

[Open Source Initiative](https://opensource.org/license/mit)

The MIT License (MIT)

Copyright (c) [2026] [Chris]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
