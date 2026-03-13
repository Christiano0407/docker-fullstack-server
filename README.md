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

```bash
## 🛠 Stack Técnico
 
| Capa | Tecnología |
|------|------------|
| Backend | Python 3.12 · FastAPI · Pydantic v2 |
| Auth | JWT (PyJWT) · bcrypt · RBAC |
| ORM | SQLAlchemy |
| Base de datos | PostgreSQL 16 |
| Package manager | uv |
| Tests | pytest · httpx · unittest.mock |
| Contrato API | OpenAPI 3.1.0 (YAML) |
| Contenedores | Docker Multi-stage · Docker Compose |
| Frontend (WIP) | React · TypeScript · Vite |
| Proxy (WIP) | Nginx |

```

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

## Git Flow

```bash
main          ← Producción (solo merge desde develop)
staging       ← Pre-producción / QA
develop       ← Integración (base de todo el desarrollo)
feature/*     ← Ramas temporales por funcionalidad
```

> Desarrollo mientras trabajas [Git - GitHub - Terminal]

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

### ✅ Fase TDD — Pipeline de Tests

- [x] `pytest.ini` en raíz de `backend/`
- [x] Tests unitarios: `test_movies_service.py` (34 tests)
- [x] Tests unitarios: `test_security.py` (22 tests)
- [x] Tests unitarios: `test_auth_service.py` (9 tests)
- [x] Tests integración: `test_movies_endpoints.py` (40 tests)
- [x] Tests integración: `test_auth_endpoints.py` (18 tests)
- [x] Todos los tests usan mocks — sin CSV real ni DB

### ⏳ Fase 4 — Docker Compose + Nginx

- [ ] `docker-compose.yml` con servicios backend + frontend + nginx
- [ ] Nginx como reverse proxy
- [ ] Variables de entorno por entorno (`dev`, `staging`, `prod`)

### ⏳ Fase 5 — Frontend conectado

- [ ] Cliente TypeScript generado desde `openapi.yaml`
- [ ] Integración con endpoints de la API
- [ ] CORS configurado para producción

---

### Licencia

MIT
