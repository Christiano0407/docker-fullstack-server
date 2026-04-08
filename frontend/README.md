# 🎬 Disney Movies Archive - Frontend

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF?logo=vite&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3.14.2-88CE02?logo=greensock&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-4.1.2-6E9F18?logo=vitest&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-Alpine-009639?logo=nginx&logoColor=white)
![MIT](https://img.shields.io/badge/License-MIT-green.svg)

> **Aplicación web SPA** para explorar el archivo histórico de películas de Disney (1937–2016). Diseño tipo streaming con animaciones GSAP, hero section interactivo y experiencia premium dark theme.

---

## 📋 Tabla de Contenidos

- [Visión General](#-visión-general)
- [Stack Tecnológico](#-stack-tecnológico)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Quick Start](#-quick-start)
- [Features](#-features)
- [Hero Section](#-hero-section)
- [Componentes](#-componentes)
- [Páginas](#-páginas)
- [Sistema de Diseño](#-sistema-de-diseño)
- [API Client](#-api-client)
- [Desarrollo Local](#-desarrollo-local)
- [Docker](#-docker)
- [Testing](#-testing)
- [Convenciones](#-convenciones)
- [Performance](#-performance)
- [Roadmap](#-roadmap)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

---

## 🎯 Visión General

Disney Movies Archive Frontend es una **Single Page Application (SPA)** construida con React 19 y TypeScript que ofrece:

- 🎬 **Hero Section Estilo Streaming** — Slideshow automático con backdrop images, gradientes dinámicos y carousel de películas
- 📚 **Catálogo Interactivo** — Grid de películas con búsqueda, filtros y paginación
- 📊 **Archivo Histórico** — Tabla con ordenamiento y exportación a CSV
- ✨ **Animaciones Premium** — Transiciones suaves con GSAP
- 🌙 **Dark Theme** — Paleta "Deep Ocean" con acentos dorados
- 📱 **Responsive Design** — Adaptado para desktop, tablet y mobile

### Dataset

| Atributo | Valor |
|-----------|-------|
| Total películas | 579 |
| Período | 1937 – 2016 |
| Géneros | 12+ categorías |
| Ratings MPAA | G, PG, PG-13, R, Not Rated |

---

## 🛠 Stack Tecnológico

### Core

| Tecnología | Versión | Rol |
|-----------|---------|-----|
| React | 19.2.0 | Framework UI |
| TypeScript | 5.9.3 | Tipado estático |
| Vite | 7.3.1 | Bundler & Dev Server |

### Animaciones

| Tecnología | Versión | Uso |
|-----------|---------|-----|
| GSAP | 3.14.2 | Animaciones de entrada y transiciones |

### Testing

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| Vitest | 4.1.2 | Testing framework |
| Testing Library | 16.x | Testing de componentes |

### Deployment

| Tecnología | Imagen | Propósito |
|-----------|--------|-----------|
| Node.js | 20-alpine | Build stage |
| Nginx | alpine | Servidor de producción |

---

## 📁 Estructura del Proyecto

```
frontend/
│
├── .opencode/                 # OpenCode AI Skills
│   └── skills/
│       └── frontend-design/
│
├── src/
│   ├── api/
│   │   ├── moviesApi.ts      # Cliente HTTP
│   │   └── tmdb/
│   │       ├── tmdbAPI.ts
│   │       └── tmdbHelpers.ts
│   │
│   ├── components/
│   │   ├── Hero/             # Hero section streaming
│   │   │   ├── Hero.tsx
│   │   │   ├── HeroSlide.tsx
│   │   │   ├── MovieCarousel.tsx
│   │   │   ├── Hero.css
│   │   │   └── index.ts
│   │   ├── Footer.tsx
│   │   ├── GenreBar.tsx
│   │   ├── MovieCard.tsx
│   │   ├── Nav.tsx
│   │   ├── Pagination.tsx
│   │   ├── Top5Grid.tsx
│   │   └── tmdb/
│   │
│   ├── hooks/
│   │   ├── usePoster.ts
│   │   └── useTMDB.ts
│   │
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── MovieCatalog.tsx
│   │   └── MovieArchive.tsx
│   │
│   ├── css/
│   │   └── App.css           # Design system completo
│   │
│   ├── test/
│   │   ├── setup.ts
│   │   └── unit/
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── .env
├── .env.example
├── Dockerfile
├── nginx-spa.conf
├── vite.config.ts
├── vitest.config.ts
├── package.json
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

| Requisito | Mínimo | Recomendado |
|-----------|--------|-------------|
| Node.js | 18.x | 20 LTS |
| pnpm | 8.x | 10.x |
| Docker | 24.x | Latest |

### 1. Instalar dependencias

```bash
pnpm install
```

### 2. Configurar entorno

```bash
cp .env.example .env
```

### 3. Iniciar desarrollo

```bash
pnpm dev
```

---

## ✨ Features

### Core

- ✅ SPA con React 19 + TypeScript
- ✅ Router custom con transiciones GSAP
- ✅ Paginación de películas
- ✅ Búsqueda por título
- ✅ Filtrado por género y rating
- ✅ Ordenamiento
- ✅ Exportar a CSV

### Hero Section

- ✅ Slideshow automático (7 segundos)
- ✅ Backdrop images + gradientes
- ✅ Ken Burns effect con GSAP
- ✅ Movie carousel horizontal
- ✅ Navegación prev/next
- ✅ Pause on hover
- ✅ Responsive design

### UI/UX

- ✅ Dark theme premium
- ✅ Loading skeletons
- ✅ Error states
- ✅ Hover effects
- ✅ Smooth transitions

---

## 🎬 Hero Section

Hero section estilo Netflix/Disney+ con slideshow automático.

### Estructura

```
Hero
├── HeroSlide[] (5 slides)
├── MovieCarousel
├── Indicators
└── Navigation
```

### Props

```typescript
interface HeroProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
}
```

### Características

| Feature | Descripción |
|---------|-------------|
| Auto-slide | Cambio cada 7 segundos |
| Pause on hover | Pausa automática |
| Backdrop | Imágenes + gradientes por género |
| Animaciones | GSAP timeline |
| Carousel | Drag support + scroll horizontal |

---

## 🧩 Componentes

### Core Components

| Componente | Descripción | Props |
|-----------|-------------|-------|
| `Nav` | Barra de navegación | `current`, `onNavigate` |
| `MovieCard` | Tarjeta de película | `movie` |
| `Pagination` | Paginación | `offset`, `limit`, `total` |
| `Top5Grid` | Grid top 5 | `onNavigate` |
| `Footer` | Pie de página | - |

### Hero Components

| Componente | Descripción |
|-----------|-------------|
| `Hero` | Container principal |
| `HeroSlide` | Slide individual |
| `MovieCarousel` | Carousel horizontal |

### Page Components

| Componente | Descripción |
|-----------|-------------|
| `Home` | Landing con hero streaming |
| `MovieCatalog` | Grid filtrable |
| `MovieArchive` | Tabla + CSV export |

---

## 🎨 Sistema de Diseño

### Colores (Deep Ocean Theme)

```css
:root {
  --bg: #030b18;
  --surface: #071428;
  --surface-2: #0c1e3a;
  --gold: #d4a847;
  --gold-bright: #f0c75e;
  --rating-g: #22c55e;
  --rating-pg: #3b82f6;
  --rating-pg13: #f59e0b;
  --rating-r: #ef4444;
}
```

### Tipografía

```css
--font-display: 'Bebas Neue', sans-serif;
--font-body: 'Cormorant Garamond', serif;
--font-mono: 'DM Mono', monospace;
```

---

## 🔌 API Client

```typescript
export const moviesAPI = {
  async getMovies(limit: number, offset: number): Promise<MovieListResponse> {
    const res = await fetch(`${BASE_URL}/movies?limit=${limit}&offset=${offset}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  },
};
```

---

## 💻 Desarrollo Local

### Scripts

```bash
pnpm dev              # Desarrollo con HMR
pnpm build            # Build producción
pnpm lint             # ESLint
pnpm test             # Tests watch
pnpm test:run         # Tests single run
```

### Proxy

Vite proxy configurado para `/api` → `localhost:5000`

---

## 🐳 Docker

### Multi-Stage Build

```dockerfile
FROM node:20-alpine AS builder
# Build con pnpm
RUN pnpm build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
```

### Comandos

```bash
docker compose build frontend
docker compose up -d frontend
```

---

## 🧪 Testing

```bash
pnpm test             # Watch mode
pnpm test:run        # Single run
pnpm test:coverage   # Coverage
```

---

## 📏 Convenciones

### Nomenclatura

| Tipo | Convención | Ejemplo |
|------|------------|---------|
| Componentes | PascalCase | `MovieCard.tsx` |
| Hooks | camelCase + `use` | `usePoster.ts` |
| CSS Classes | BEM | `.movie-card__title` |

### Git Commits

| Prefijo | Uso |
|---------|-----|
| `feat:` | Nueva funcionalidad |
| `fix:` | Corrección de bug |
| `docs:` | Documentación |

---

## ⚡ Performance

### Bundle Size

```
dist/index.css    ~26 kB (gzip: 6.25 kB)
dist/index.js     ~289 kB (gzip: 96 kB)
```

---

## 🗺 Roadmap

### ✅ Completado

- [x] SPA con React 19
- [x] TypeScript strict
- [x] Hero Section Streaming
- [x] GSAP animations
- [x] Docker multi-stage
- [x] MovieCatalog con filtros
- [x] MovieArchive con CSV

### ⏳ Pendiente

- [ ] TMDB integration
- [ ] Video modal
- [ ] Lazy loading
- [ ] Dark/light mode

---

## 🤝 Contribución

```bash
git checkout -b feature/nueva-funcion
pnpm dev
pnpm test:run
pnpm lint
git commit -m "feat: agregar funcionalidad"
git push origin feature/nueva-funcion
```

---

## 📄 Licencia

MIT License

---

<div align="center">
  <p>Disney Movies Archive Frontend</p>
  <p>Built with React + TypeScript + Vite + GSAP</p>
</div>
