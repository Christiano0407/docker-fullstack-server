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

## Estructura del Frontend

> Frontend [Docker Compose + Nginx Proxy]

```bash

frontend/
├── Dockerfile              ← multi-stage: build + nginx
├── nginx-spa.conf          ← sirve React SPA dentro del container
├── vite.config.ts          ← proxy /api → localhost:5000 en dev
├── .env.development        ← VITE_API_URL=http://localhost:5000/api/v1
├── .env.production         ← VITE_API_URL=/api/v1
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── App.css             ← design system completo (dark editorial)
    ├── api/
    │   └── moviesApi.ts    ← cliente HTTP tipado
    └── components/
        ├── MovieCard.tsx   ← tarjeta individual
        ├── MovieList.tsx   ← lista con fetch + estados
        └── Pagination.tsx  ← controles de paginación

```

---

### Licencia

MIT