# Disney Movies API

 > API REST para consultar y analizar el dataset de películas Disney (1937–2016).

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

## Desarrollo Backend

> El backend está construido usando:

- Python 3.12
- FastAPI
- uv (gestor moderno de dependencias)
- Uvicorn (servidor ASGI)

> Agregamos:

- Openapi [Contrato de la API]
- Docker [Contenedores]
- NGINX Proxy & Load BAlancer

---

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

## Arquitectura & Estructura

> Estructura Adaptada a la API con OpenAPI

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

```bash
frontend
│
├── src
├── public
├── package.json
└── README.md

```

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

## uv Deps to Pipeline Tests

> project file [.toml]

```bash

# Deps principales
uv add pydantic-settings sqlalchemy psycopg2-binary pyjwt bcrypt redis

# Deps de desarrollo (tests)
uv add --dev pytest pytest-asyncio httpx

# Correr
pytest app/tests/unit/test_movies_service.py -v
pytest app/tests/ -v

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

### ⏳ Fase 4 — Docker Compose + Nginx

- [ ] `docker-compose.yml` con servicios backend + frontend + nginx
- [ ] Nginx como reverse proxy
- [ ] Variables de entorno por entorno (`dev`, `staging`, `prod`)

### ⏳ Fase 5 — Frontend conectado

- [ ] Cliente TypeScript generado desde `openapi.yaml`
- [ ] Integración con endpoints de la API
- [ ] CORS configurado para producción

> Agregamos el Pipeline Test [Tests TDD]

### ✅ Fase TDD — Pipeline de Tests

- [x] `pytest.ini` en raíz de `backend/`
- [x] Tests unitarios: `test_movies_service.py` (34 tests)
- [x] Tests unitarios: `test_security.py` (22 tests)
- [x] Tests unitarios: `test_auth_service.py` (9 tests)
- [x] Tests integración: `test_movies_endpoints.py` (40 tests)
- [x] Tests integración: `test_auth_endpoints.py` (18 tests)
- [x] Todos los tests usan mocks — sin CSV real ni DB

---

### Licencia

MIT
