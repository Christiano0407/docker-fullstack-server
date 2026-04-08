# 🎬 Disney Movies API

![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.12-FFD43B?logo=python&logoColor=white)
![Pydantic](https://img.shields.io/badge/Pydantic-2.x-E92063?logo=pydantic&logoColor=white)
![Uvicorn](https://img.shields.io/badge/Uvicorn-0.30-499536?logo=uvicorn&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)
![MIT](https://img.shields.io/badge/License-MIT-green.svg)

> **API REST** para consultar y analizar el dataset de películas Disney (1937–2016). Construida con FastAPI, documentada con OpenAPI 3.1 y desplegada con Docker multi-stage.

---

## 📋 Tabla de Contenidos

- [Visión General](#-visión-general)
- [Stack Tecnológico](#-stack-tecnológico)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Quick Start](#-quick-start)
- [Endpoints](#-endpoints)
- [Schemas](#-schemas)
- [Desarrollo Local](#-desarrollo-local)
- [Docker](#-docker)
- [Testing](#-testing)
- [API Documentation](#-api-documentation)
- [Convenciones](#-convenciones)
- [Roadmap](#-roadmap)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

---

## 🎯 Visión General

Disney Movies API es un servicio REST que proporciona acceso programático al catálogo histórico de películas de Disney:

- **579 películas** documentadas
- **Período:** 1937 – 2016
- **12+ géneros** clasificados
- **Ratings MPAA:** G, PG, PG-13, R, Not Rated
- **Datos financieros:** Box office y adjusted gross

### Features

- ✅ Paginación con limit/offset
- ✅ Filtrado por género y rating
- ✅ Búsqueda por título
- ✅ Estadísticas agregadas por género
- ✅ Validación con Pydantic v2
- ✅ Contrato OpenAPI 3.1
- ✅ Documentación automática (Swagger/ReDoc)
- ✅ Docker multi-stage
- ✅ Health checks
- ⏳ Autenticación JWT

---

## 🛠 Stack Tecnológico

| Tecnología | Versión | Rol |
|------------|---------|-----|
| Python | 3.12 | Lenguaje |
| FastAPI | 0.115+ | Framework web |
| Pydantic | 2.x | Validación de datos |
| Uvicorn | 0.30+ | Servidor ASGI |
| SQLAlchemy | 2.x | ORM |
| PostgreSQL | 16 | Base de datos |
| Redis | 7.x | Cache |
| PyJWT | 2.x | JWT Auth |
| pytest | 8.x | Testing |
| ruff | 0.x | Linting |
| uv | 0.x | Package manager |

### Dependencies

```toml
[project.dependencies]
fastapi = "^0.115.0"
pydantic = "^2.12.0"
pydantic-settings = "^2.6.0"
uvicorn = { extras = ["standard"], version = "^0.30.0" }
sqlalchemy = "^2.0.0"
psycopg2-binary = "^2.9.0"
redis = "^5.0.0"
pyjwt = "^2.12.0"
python-dotenv = "^1.2.0"
python-dateutil = "^2.9.0"
pandas = "^3.0.0"
numpy = "^2.0.0"

[project.optional-dependencies]
dev = ["pytest", "pytest-asyncio", "httpx", "ruff"]
```

---

## 📁 Estructura del Proyecto

```
backend/
│
├── app/
│   ├── __init__.py
│   ├── main.py                 # Entry point FastAPI
│   │
│   ├── api/
│   │   ├── __init__.py
│   │   └── v1/
│   │       ├── __init__.py
│   │       └── routes/
│   │           ├── __init__.py
│   │           ├── movies.py    # Endpoints de películas
│   │           └── auth.py     # Endpoints de autenticación (futuro)
│   │
│   ├── schemas/
│   │   ├── __init__.py
│   │   └── movie.py           # Pydantic models
│   │
│   ├── services/
│   │   ├── __init__.py
│   │   ├── data_product_workflow.py  # Lógica de datos
│   │   └── auth_service.py    # Servicio auth (futuro)
│   │
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py          # Configuración
│   │   └── security.py       # Security utils (futuro)
│   │
│   └── docs/
│       └── openapi.yaml       # Contrato OpenAPI
│
├── data/                       # CSV files (read-only en Docker)
│   └── disney_movies_2_cleaned.csv
│
├── tests/
│   ├── __init__.py
│   ├── conftest.py           # Fixtures
│   ├── unit/
│   │   ├── test_movies_service.py
│   │   ├── test_auth_service.py
│   │   └── test_security.py
│   └── integration/
│       ├── test_movies_endpoints.py
│       └── test_auth_endpoints.py
│
├── .env                        # Variables locales (no commitear)
├── .env.example               # Template
├── .gitignore
├── .python-version            # Python version
├── Dockerfile                 # Multi-stage build
├── pyproject.toml            # Dependencias uv
├── uv.lock                   # Lock file
├── pytest.ini                # Pytest config
├── ruff.toml                 # Ruff config
└── README.md                 # Este archivo
```

---

## 🚀 Quick Start

### Prerequisites

- Python 3.12+
- uv package manager
- Docker (opcional)

### 1. Clonar y entrar al backend

```bash
cd backend
```

### 2. Instalar dependencias

```bash
# Con uv
uv sync

# Activar virtualenv
source .venv/bin/activate
```

### 3. Ejecutar servidor

```bash
# Desarrollo con hot-reload
uvicorn app.main:app --reload --port 5000

# Producción
uvicorn app.main:app --host 0.0.0.0 --port 5000
```

### 4. Acceder a la API

| Recurso | URL |
|---------|-----|
| API | http://localhost:5000 |
| Swagger UI | http://localhost:5000/docs |
| ReDoc | http://localhost:5000/redoc |
| OpenAPI Schema | http://localhost:5000/openapi.json |
| Health | http://localhost:5000/ |

---

## 🔌 Endpoints

### Movies

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/v1/movies` | Lista paginada de películas |
| GET | `/api/v1/movies/search` | Búsqueda con filtros |
| GET | `/api/v1/movies/stats` | Estadísticas del dataset |
| GET | `/api/v1/movies/{title}` | Película por título |

### Paginación

```bash
GET /api/v1/movies?limit=10&offset=0
```

| Parámetro | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `limit` | int | 10 | Items por página (max: 100) |
| `offset` | int | 0 | Items a saltar |

### Búsqueda

```bash
GET /api/v1/movies/search?genre=Adventure&rating=PG
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `genre` | string | Filtrar por género |
| `rating` | string | Filtrar por rating MPAA |

### Respuesta

```json
{
  "count": 10,
  "total": 579,
  "limit": 10,
  "offset": 0,
  "data": [
    {
      "movie_title": "Snow White and the Seven Dwarfs",
      "release_date": "21/12/1937",
      "genre": "Musical",
      "rating": "G",
      "total_gross": 184925485,
      "adjusted_gross": 5228953251
    }
  ]
}
```

### Estadísticas

```bash
GET /api/v1/movies/stats
```

```json
{
  "total_movies": 579,
  "genres": [
    {
      "genre": "Adventure",
      "count": 137,
      "total_gross_sum": 16487763857,
      "avg_gross": 120348641.29
    }
  ],
  "top_grossing": {
    "movie_title": "Snow White and the Seven Dwarfs",
    "adjusted_gross": 5228953251
  },
  "most_recent": {
    "movie_title": "Rogue One: A Star Wars Story",
    "release_date": "16/12/2016"
  }
}
```

---

## 📦 Schemas

### Movie

```python
class Movie(BaseModel):
    movie_title: str
    release_date: str  # DD/MM/YYYY
    genre: str
    rating: Literal["G", "PG", "PG-13", "R", "Not Rated"]
    total_gross: int
    adjusted_gross: int
```

### MovieListResponse

```python
class MovieListResponse(BaseModel):
    count: int
    total: int
    limit: int
    offset: int
    data: list[Movie]
```

### StatsResponse

```python
class GenreStats(BaseModel):
    genre: str
    count: int
    total_gross_sum: int
    avg_gross: float

class StatsResponse(BaseModel):
    total_movies: int
    genres: list[GenreStats]
    top_grossing: Movie
    most_recent: Movie
```

---

## 💻 Desarrollo Local

### Configuración

```bash
# Crear .env
cp .env.example .env

# Editar según necesidad
nano .env
```

### Variables de Entorno

```env
ENVIRONMENT=development
DATABASE_URL=postgresql://user:pass@localhost:5432/disney
REDIS_URL=redis://localhost:6379
SECRET_KEY=your-secret-key-here
```

### Comandos

```bash
# Instalar dependencias
uv sync

# Agregar nueva dependencia
uv add fastapi
uv add --dev pytest

# Remover dependencia
uv remove fastapi

# Actualizar lock file
uv lock

# Sync con lock file
uv sync --locked
```

### Servidor de Desarrollo

```bash
# Con hot-reload
uvicorn app.main:app --reload --port 5000 --reload

# Con workers para producción
uvicorn app.main:app --workers 4 --port 5000
```

---

## 🐳 Docker

### Build

```bash
# Build imagen
docker build -t disney-backend ./backend

# Build multi-stage (automático en docker-compose)
docker build -t disney-backend:latest ./backend
```

### Dockerfile

```dockerfile
# Stage 1: Builder
FROM python:3.12-slim AS builder
WORKDIR /app
RUN pip install uv
COPY pyproject.toml uv.lock ./
RUN uv sync --no-dev
COPY . .

# Stage 2: Runtime
FROM python:3.12-slim
WORKDIR /app
COPY --from=builder /app/.venv /app/.venv
COPY --from=builder /app /app
ENV PATH="/app/.venv/bin:$PATH"
EXPOSE 5000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "5000"]
```

### Docker Compose (partial)

```yaml
services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: disney-backend-1
    environment:
      - PYTHONUNBUFFERED=1
      - ENVIRONMENT=development
      - INSTANCE_ID=backend_1
    volumes:
      - ./backend/data:/app/data:ro
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5000/"]
      interval: 30s
      timeout: 10s
      retries: 3
    expose:
      - "5000"
```

---

## 🧪 Testing

### Estructura de Tests

```
tests/
├── conftest.py              # Fixtures compartidas
├── unit/
│   ├── test_movies_service.py
│   ├── test_auth_service.py
│   └── test_security.py
└── integration/
    ├── test_movies_endpoints.py
    └── test_auth_endpoints.py
```

### Fixtures Disponibles

```python
@pytest.fixture
def sample_movie():
    return Movie(...)  # Movie fixture

@pytest.fixture
def auth_headers():
    return {"Authorization": "Bearer token"}  # Auth fixture
```

### Comandos

```bash
# Todos los tests
pytest tests/ -v

# Tests unitarios
pytest tests/unit/ -v

# Tests de integración
pytest tests/integration/ -v

# Tests con coverage
pytest --cov=app tests/ --cov-report=html

# Tests específicos
pytest tests/unit/test_movies_service.py -v
```

### Tests Disponibles

| Módulo | Tests |
|--------|-------|
| `test_movies_service.py` | 34 tests |
| `test_security.py` | 22 tests |
| `test_auth_service.py` | 9 tests |
| `test_movies_endpoints.py` | 40 tests |
| `test_auth_endpoints.py` | 18 tests |

> **Total: 123 tests** — Todos con mocks (no requieren DB ni CSV real)

---

## 📚 API Documentation

### Swagger UI

Accede a http://localhost:5000/docs para documentación interactiva.

### ReDoc

Accede a http://localhost:5000/redoc para documentación estilo documento.

### OpenAPI Schema

```bash
# Descargar schema
curl http://localhost:5000/openapi.json > openapi.json

# Generar cliente
openapi-generator-cli generate -i openapi.json -g typescript-axios -o ./generated/client
```

---

## 📏 Convenciones

### Código Python

```python
# Imports
import standard library first
import third-party second
import local third

# Nomenclatura
class PascalCase:          # Clases
    def snake_case():      # Funciones
        SNAKE_CASE = 1     # Constantes
        snake_case = 1     # Variables
```

### API Endpoints

```
GET    /api/v1/movies           # Lista
GET    /api/v1/movies/{title}  # Detalle
POST   /api/v1/movies          # Crear (futuro)
PUT    /api/v1/movies/{title}  # Actualizar (futuro)
DELETE /api/v1/movies/{title}  # Eliminar (futuro)
```

### Git Commits (Conventional Commits)

| Prefijo | Uso |
|---------|-----|
| `feat:` | Nueva funcionalidad |
| `fix:` | Corrección de bug |
| `docs:` | Documentación |
| `refactor:` | Refactor sin cambio funcional |
| `test:` | Tests |
| `chore:` | Mantenimiento |

---

## 🗺 Roadmap

### ✅ Completado

| Fase | Descripción |
|------|-------------|
| 1 | API Base con CSV |
| 2 | Contrato OpenAPI |
| 3 | Paginación |
| 4 | Filtrado y búsqueda |
| 5 | Estadísticas |
| 6 | Docker multi-stage |
| 7 | Health checks |
| 8 | Pipeline de tests |

### 🔄 En Progreso

| Fase | Descripción | Estado |
|------|-------------|--------|
| TDD | Tests completos | 🔄 |

### ⏳ Pendiente

| Fase | Descripción |
|------|-------------|
| 9 | Autenticación JWT |
| 10 | PostgreSQL Integration |
| 11 | Redis Cache |
| 12 | Rate limiting |

---

## 🤝 Contribución

### Flujo de Trabajo

```bash
# 1. Fork y clone
git clone https://github.com/YOUR_USER/docker-fullstack-server.git
cd docker-fullstack-server/backend

# 2. Crear branch
git checkout -b feature/nueva-funcion

# 3. Desarrollar
uv sync
uvicorn app.main:app --reload

# 4. Tests
pytest tests/ -v

# 5. Commit
git add .
git commit -m "feat: agregar nueva funcionalidad"

# 6. Push y PR
git push origin feature/nueva-funcion
```

### Checklist Pre-commit

- [ ] `pytest tests/ -v` pasa sin errores
- [ ] `ruff check .` sin warnings
- [ ] `uvicorn app.main:app` inicia correctamente
- [ ] Tests nuevos incluidos
- [ ] README.md actualizado si necesario

---

## 📄 Licencia

MIT License - Ver archivo [LICENSE](LICENSE) en el repositorio raíz.

---

## 🔗 Enlaces

### Proyecto
- [Disney Movies Archive - Main](https://github.com/Christiano0407/docker-fullstack-server)
- [Frontend](https://github.com/Christiano0407/docker-fullstack-server/tree/main/frontend)

### Documentación
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Pydantic Documentation](https://docs.pydantic.dev/)
- [Uvicorn Documentation](https://www.uvicorn.org/)
- [uv Package Manager](https://github.com/astral-sh/uv)
- [pytest Documentation](https://docs.pytest.org/)

---

<div align="center">
  <p>Disney Movies API</p>
  <p>Built with FastAPI + Pydantic + Docker</p>
  <p>By <a href="https://github.com/Christiano0407">Christiano0407</a></p>
</div>
