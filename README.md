# 🎬 Disney Movies Archive

![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.12-FFD43B?logo=python&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-Alpine-009639?logo=nginx&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql&logoColor=white)
![MIT](https://img.shields.io/badge/License-MIT-green.svg)

> **Disney Movies Archive** — Aplicación web fullstack para explorar el catálogo histórico de películas de Disney (1937–2016). Arquitectura moderna con microservicios, API REST documentada y frontend tipo streaming.

---

## 📋 Tabla de Contenidos

- [Visión General](#-visión-general)
- [Arquitectura del Sistema](#-arquitectura-del-sistema)
- [Stack Tecnológico](#-stack-tecnológico)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Quick Start](#-quick-start)
- [Servicios](#-servicios)
- [Docker Compose](#-docker-compose)
- [Configuración](#-configuración)
- [Desarrollo Local](#-desarrollo-local)
- [API Documentation](#-api-documentation)
- [Features](#-features)
- [Git Flow](#-git-flow)
- [Convenciones](#-convenciones)
- [Roadmap](#-roadmap)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

---

## 🎯 Visión General

Disney Movies Archive es una aplicación **fullstack** que permite:

- 📚 Explorar 579 películas de Disney (1937–2016)
- 🔍 Filtrar por género, rating MPAA y búsqueda por título
- 📊 Visualizar estadísticas históricas y financieras
- 🎬 Hero section estilo streaming con slideshow automático
- 📥 Exportar datos a CSV
- 📱 Diseño responsivo para desktop, tablet y mobile

### Dataset

|属性|Valor|
|------|------|
| Total películas | 579 |
| Período | 1937 – 2016 |
| Géneros | 12+ categorías |
| Ratings | G, PG, PG-13, R, Not Rated |

---

## 🛠 Stack Tecnológico
 
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
| Frontend | React · TypeScript · Vite |
| Proxy | Nginx |

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENTE (Browser)                              │
│                          SPA React + TypeScript                             │
└─────────────────────────────────┬───────────────────────────────────────────┘
                                  │
                                  │ HTTP :80
                                  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         NGINX (Reverse Proxy)                              │
│                    Load Balancer + SSL Termination                          │
│                         Puerto: 80                                         │
└──────────┬──────────────────────────────────────┬───────────────────────┘
             │                                      │
             │ :5000                               │ :5000
             ▼                                      ▼
┌────────────────────────┐              ┌────────────────────────┐
│    BACKEND API #1     │              │    BACKEND API #2     │
│    FastAPI + Uvicorn  │              │    FastAPI + Uvicorn  │
│    Puerto: 5000       │              │    Puerto: 5000       │
│    Python 3.12        │              │    Python 3.12        │
└──────────┬─────────────┘              └──────────┬─────────────┘
           │                                             │
           │ Read Only                                 │ Read Only
           ▼                                             ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         DATA LAYER                                         │
│                    /app/data (CSV Files)                                   │
│              disney_movies_2_cleaned.csv                                   │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Flujo de Datos

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  Client  │────▶│  Nginx   │────▶│  LB Pool │────▶│  Backend │
│  (React) │     │  Proxy   │     │           │     │  (x2)    │
└──────────┘     └──────────┘     └──────────┘     └──────────┘
    │                                                   │
    │                                                   │
    │◀──────────────────────────────────────────────────│
    │                    JSON Response                       │
    └──────────────────────────────────────────────────────┘
```

---

## 🛠 Stack Tecnológico

### Backend

| Tecnología | Versión | Rol |
|------------|---------|-----|
| Python | 3.12 | Lenguaje |
| FastAPI | 0.115+ | Framework API |
| Pydantic | 2.x | Validación de datos |
| Uvicorn | 0.30+ | Servidor ASGI |
| SQLAlchemy | 2.x | ORM |
| PostgreSQL | 16 | Base de datos |
| Redis | 7.x | Cache (opcional) |
| PyJWT | 2.x | Autenticación |
| pytest | 8.x | Testing |

### Frontend

| Tecnología | Versión | Rol |
|------------|---------|-----|
| React | 19.2 | Framework UI |
| TypeScript | 5.9 | Tipado estático |
| Vite | 7.3 | Bundler |
| GSAP | 3.14 | Animaciones |
| Vitest | 4.1 | Testing |
| Testing Library | 16.x | Testing UI |

### Infrastructure

| Tecnología | Rol |
|------------|-----|
| Docker | Contenedores |
| Docker Compose | Orquestación |
| Nginx | Reverse Proxy + Load Balancer |
| Alpine Linux | Imágenes mínimas |

---

## 📁 Estructura del Proyecto

```
docker-fullstack-server/
│
├── README.md                    # Este archivo
│
├── docker-compose.yml           # Orquestación de servicios
│
├── .env.example                 # Variables de entorno ejemplo
│
├── .gitignore                   # Git ignore principal
│
├── nginx/                       # Configuración Nginx
│   └── nginx.conf              # Reverse proxy + load balancer
│
├── backend/                     # API REST (Python/FastAPI)
│   ├── app/
│   │   ├── main.py            # Entry point FastAPI
│   │   ├── api/
│   │   │   └── v1/
│   │   │       └── routes/
│   │   │           └── movies.py
│   │   ├── schemas/           # Pydantic models
│   │   ├── services/          # Lógica de negocio
│   │   ├── core/              # Config, security
│   │   └── docs/              # OpenAPI docs
│   ├── data/                   # CSV files (read-only)
│   ├── tests/                  # Pytest tests
│   ├── pyproject.toml         # Dependencias
│   ├── uv.lock                # Lock file
│   ├── Dockerfile             # Multi-stage build
│   └── README.md              # Documentación backend
│
└── frontend/                   # SPA (React/TypeScript)
    ├── src/
    │   ├── api/              # Clientes HTTP
    │   ├── components/        # Componentes React
    │   │   ├── Hero/         # Hero section streaming
    │   │   ├── Nav.tsx
    │   │   ├── MovieCard.tsx
    │   │   ├── Top5Grid.tsx
    │   │   └── Pagination.tsx
    │   ├── pages/             # Páginas
    │   │   ├── Home.tsx
    │   │   ├── MovieCatalog.tsx
    │   │   └── MovieArchive.tsx
    │   ├── css/               # Estilos
    │   ├── hooks/             # Custom hooks
    │   └── types/             # TypeScript types
    ├── public/                # Assets públicos
    ├── .opencode/             # OpenCode AI skills
    ├── Dockerfile             # Multi-stage build
    ├── nginx-spa.conf         # Nginx SPA config
    ├── vite.config.ts         # Vite config
    ├── package.json
    ├── tsconfig.json
    └── README.md              # Documentación frontend
```

---

## 🚀 Quick Start

### Prerequisites

| Requisito | Mínimo | Recomendado |
|-----------|--------|-------------|
| Docker | 24.x | Latest |
| Docker Compose | 2.x | Latest |
| Git | 2.x | Latest |

### 1. Clonar el repositorio

```bash
git clone https://github.com/Christiano0407/docker-fullstack-server.git
cd docker-fullstack-server
```

### 2. Levantar todos los servicios

```bash
# Build e inicio de todos los servicios
docker compose up -d --build

# Ver estado
docker compose ps

# Ver logs
docker compose logs -f
```

### 3. Acceder a la aplicación

| Servicio | URL |
|---------|-----|
| Frontend | http://localhost |
| Backend API | http://localhost:5000 |
| API Docs | http://localhost:5000/docs |
| OpenAPI Schema | http://localhost:5000/openapi.json |

---

## 🐳 Servicios

### Backend API (x2 instancias)

```
disney-backend-1
disney-backend-2
```

- **Puerto interno:** 5000
- **Framework:** FastAPI + Uvicorn
- **Función:** API REST con paginación, búsqueda y estadísticas
- **Balanceador:** Round-robin entre instancias

### Frontend

```
disney-frontend
```

- **Puerto interno:** 80
- **Framework:** React + Vite
- **Servidor:** Nginx Alpine
- **Función:** SPA con GSAP animations

### Nginx Proxy

```
disney-nginx
```

- **Puerto:** 80 (expuesto)
- **Función:** Reverse proxy + Load balancer
- **Balanceo:** Round-robin entre backend_1 y backend_2

---

## 🐙 Docker Compose

### Servicios Configurados

```yaml
services:
  backend:      # Instancia API #1
  backend_2:    # Instancia API #2 (load balancing)
  frontend:     # React SPA
  nginx:        # Reverse proxy + Load balancer
```

### Redes

```yaml
networks:
  disney-networks:
    driver: bridge
```

### Comandos Útiles

```bash
# Iniciar todos los servicios
docker compose up -d

# Rebuild específico
docker compose up -d --build frontend
docker compose up -d --build backend

# Ver logs
docker compose logs -f
docker compose logs -f backend

# Detener todos
docker compose down

# Detener y eliminar volúmenes
docker compose down -v

# Rebuild completo
docker compose down && docker compose up -d --build
```

### Health Checks

| Servicio | Endpoint | Interval |
|---------|----------|----------|
| backend | http://localhost:5000/ | 30s |
| frontend | http://localhost/ | 30s |

---

## ⚙️ Configuración

### Variables de Entorno

Crear archivo `.env` en la raíz:

```bash
cp .env.example .env
```

### Backend Environment

```env
# Backend
PYTHONUNBUFFERED=1
ENVIRONMENT=development
INSTANCE_ID=backend_1

# Database (futuro)
DATABASE_URL=postgresql://user:pass@localhost:5432/disney
REDIS_URL=redis://localhost:6379
```

### Frontend Environment

```env
# Build args
VITE_API_URL=/api/v1
VITE_ENVIRONMENT=production
VITE_TMDB_TOKEN=your_tmdb_token_here
```

---

## 💻 Desarrollo Local

### Backend

```bash
cd backend

# Instalar dependencias
uv sync

# Activar virtualenv
source .venv/bin/activate

# Desarrollo con hot-reload
uvicorn app.main:app --reload --port 5000

# Tests
pytest tests/ -v
```

### Frontend

```bash
cd frontend

# Instalar dependencias
pnpm install

# Desarrollo con HMR
pnpm dev

# Build producción
pnpm build

# Tests
pnpm test:run
```

### Proxy Development

Vite proxy configurado para desarrollo sin backend real:

```typescript
// vite.config.ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
    },
  },
}
```

---

## 📚 API Documentation

### Base URL

```
Development: http://localhost:5000
Production:  /api/v1
```

### Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/v1/movies` | Lista paginada |
| GET | `/api/v1/movies?limit=10&offset=0` | Con paginación |
| GET | `/api/v1/movies/search` | Búsqueda con filtros |
| GET | `/api/v1/movies/stats` | Estadísticas |
| GET | `/api/v1/movies/{title}` | Por título |

### Ejemplo de Respuesta

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

### Documentación Interactiva

Accede a http://localhost:5000/docs para Swagger UI o http://localhost:5000/redoc para ReDoc.

---

## ✨ Features

### Backend
- ✅ API REST con FastAPI
- ✅ Paginación (limit/offset)
- ✅ Filtrado por género y rating
- ✅ Búsqueda por título
- ✅ Estadísticas agregadas
- ✅ Contrato OpenAPI 3.1
- ✅ Documentación automática
- ✅ Pydantic validation
- ✅ Health checks
- ✅ Docker multi-stage
- ✅ Load balancing (x2 instancias)
- ⏳ Autenticación JWT

### Frontend
- ✅ SPA con React 19
- ✅ TypeScript strict mode
- ✅ Hero section streaming style
- ✅ Slideshow automático con GSAP
- ✅ Movie carousel horizontal
- ✅ Búsqueda y filtros
- ✅ Paginación
- ✅ Exportar a CSV
- ✅ Diseño responsivo
- ✅ Dark theme premium
- ✅ Loading skeletons
- ✅ Error states

### Infrastructure
- ✅ Docker Compose orchestration
- ✅ Nginx reverse proxy
- ✅ Load balancing round-robin
- ✅ Health checks
- ✅ Network isolation
- ✅ Multi-stage builds
- ✅ Volume mounts (read-only data)

---

## 🌿 Git Flow

```
main (produccion)
   │
   └── develop (integracion)
          │
          ├── feature/nueva-funcion
          ├── feature/hero-streaming
          └── bugfix/correccion-bug
```

### Comandos

```bash
# Crear feature branch
git checkout develop
git switch -c feature/nombre-feature

# Commit (Conventional Commits)
git add .
git commit -m "feat: agregar nueva funcionalidad"
git commit -m "fix: corregir bug en paginacion"
git commit -m "docs: actualizar README"

# Merge a develop
git checkout develop
git merge feature/nombre-feature
git branch -d feature/nombre-feature

# Deploy a production
git checkout main
git merge develop
git push origin main
```

---

## 📏 Convenciones

### Commits (Conventional Commits)

| Prefijo | Uso |
|---------|-----|
| `feat:` | Nueva funcionalidad |
| `fix:` | Corrección de bug |
| `docs:` | Documentación |
| `refactor:` | Refactor sin cambio funcional |
| `test:` | Tests |
| `chore:` | Mantenimiento |

### API Endpoints

```
GET    /api/v1/movies        # Lista
GET    /api/v1/movies/{id}  # Detalle
POST   /api/v1/movies        # Crear
PUT    /api/v1/movies/{id}   # Actualizar
DELETE /api/v1/movies/{id}   # Eliminar
```

### Nomenclatura

| Tipo | Convención | Ejemplo |
|------|------------|---------|
| Archivos Python | snake_case | `movies_service.py` |
| Clases Python | PascalCase | `MovieService` |
| Funciones | snake_case | `get_movies()` |
| Componentes React | PascalCase | `MovieCard.tsx` |
| Hooks | camelCase + use | `useMovies.ts` |
| Variables CSS | kebab-case | `.movie-card` |

---

## 🗺 Roadmap

### ✅ Completado

| Fase | Descripción | Estado |
|------|-------------|--------|
| 1 | API Base con CSV | ✅ |
| 2 | Contrato OpenAPI | ✅ |
| 3 | Docker Multi-stage | ✅ |
| 4 | Docker Compose + Nginx | ✅ |
| 5 | Frontend SPA | ✅ |
| 6 | Hero Section Streaming | ✅ |

### 🔄 En Progreso

| Fase | Descripción | Estado |
|------|-------------|--------|
| TDD | Pipeline de Tests | 🔄 |

### ⏳ Pendiente

| Fase | Descripción | Estado |
|------|-------------|--------|
| 7 | Autenticación JWT | ⏳ |
| 8 | PostgreSQL Integration | ⏳ |
| 9 | Redis Cache | ⏳ |
| 10 | TMDB Integration | ⏳ |
| 11 | CI/CD Pipeline | ⏳ |

---

## 🤝 Contribución

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/nueva-funcion`)
3. Commit tus cambios (`git commit -m 'feat: agregar funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcion`)
5. Abre un Pull Request

### Checklist Pre-commit

- [ ] Tests pasan (`pytest` / `pnpm test:run`)
- [ ] Lint pasa (`ruff` / `pnpm lint`)
- [ ] Build compila (`docker compose build`)
- [ ] Documentación actualizada

---

## 📄 Licencia

MIT License - Ver archivo [LICENSE](LICENSE) en el repositorio raíz.

---

## 🔗 Enlaces

### Proyecto
- [Disney Movies API - Backend](backend/README.md)
- [Disney Movies Frontend](frontend/README.md)
- [Repositorio](https://github.com/Christiano0407/docker-fullstack-server)

### Documentación
- [FastAPI](https://fastapi.tiangolo.com/)
- [React](https://react.dev)
- [Docker](https://docs.docker.com/)
- [Nginx](https://nginx.org/en/docs/)

### APIs
- [TMDB API](https://www.themoviedb.org/documentation/api)

---

<div align="center">
  <p>Disney Movies Archive</p>
  <p>Fullstack Application with Docker, FastAPI, React & Nginx</p>
  <p>Built with ❤️ by <a href="https://github.com/Christiano0407">Christiano0407</a></p>
</div>
