# 🎬 Disney Movies Archive - Frontend

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF?logo=vite&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3.14.2-88CE02?logo=greensock&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-4.1.2-6E9F18?logo=vitest&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-Alpine-009639?logo=nginx&logoColor=white)

> **Aplicación web SPA** para explorar el archivo histórico de películas de Disney (1937–2016). Catalogación interactiva con animaciones, filtros avanzados y exportación de datos.

---

## 📋 Tabla de Contenidos

- [Visión General](#-visión-general)
- [Stack Tecnológico](#-stack-tecnológico)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación Rápida](#-instalación-rápida)
- [Desarrollo Local](#-desarrollo-local)
- [Variables de Entorno](#-variables-de-entorno)
- [Scripts Disponibles](#-scripts-disponibles)
- [Arquitectura](#-arquitectura)
- [Diseño del Sistema](#-diseño-del-sistema)
- [Flujo de Datos](#-flujo-de-datos)
- [API Endpoints](#-api-endpoints)
- [Componentes](#-componentes)
- [Docker](#-docker)
- [Testing](#-testing)
- [Convenciones de Código](#-convenciones-de-código)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

---

## 🎯 Visión General

Disney Movies Archive es una aplicación **Single Page Application (SPA)** construida con React que permite:

- ✅ Explorar el catálogo completo de películas Disney (579 títulos)
- ✅ Filtrar por género, clasificación MPAA y búsqueda por título
- ✅ Ordenar por fecha, gross y título
- ✅ Visualizar estadísticas históricas del archivo
- ✅ Exportar datos a CSV
- ✅ Animaciones fluidas con GSAP
- ✅ Diseño completamente responsivo
- ✅ Estados de carga, error y vacío optimizados

---

## 🛠 Stack Tecnológico

### Core
| Tecnología | Versión | Rol |
|------------|---------|-----|
| React | 19.2.0 | Framework UI |
| TypeScript | 5.9.3 | Tipado estático |
| Vite | 7.3.1 | Bundler & Dev Server |

### Animaciones
| Tecnología | Versión | Uso |
|------------|---------|-----|
| GSAP | 3.14.2 | Animaciones de entrada y transiciones |

### Testing
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Vitest | 4.1.2 | Testing framework |
| Testing Library | 16.x | Testing de componentes React |

### Deployment
| Tecnología | Imagen | Propósito |
|------------|--------|-----------|
| Node.js | 20-alpine | Build stage |
| Nginx | alpine | Servidor de producción |

### Package Manager
| Herramienta | Versión |
|------------|---------|
| pnpm | 10.x |

---

## 📁 Estructura del Proyecto

```
frontend/
│
├── .opencode/                      # Configuración de OpenCode (AI)
│   └── skills/
│       └── frontend-design/        # Skill de diseño frontend
│
├── public/                         # Assets públicos estáticos
│
├── src/
│   ├── api/
│   │   ├── moviesApi.ts           # Cliente HTTP tipado para movies
│   │   └── tmdb/                  # (Futuro) Cliente TMDB API
│   │
│   ├── components/
│   │   ├── Footer.tsx             # Pie de página
│   │   ├── GenreBar.tsx           # Barra de géneros (en desarrollo)
│   │   ├── MovieCard.tsx          # Tarjeta de película
│   │   ├── MovieList.tsx          # Lista de películas (no usado)
│   │   ├── Nav.tsx                # Navegación principal
│   │   ├── Pagination.tsx         # Controles de paginación
│   │   ├── Top5Grid.tsx           # Grid de top 5 películas
│   │   └── tmdb/                  # Componentes TMDB (en desarrollo)
│   │       ├── Hero.tsx
│   │       └── VideoModal.tsx
│   │
│   ├── hooks/
│   │   ├── usePoster.ts           # Hook para posters de TMDB
│   │   └── useTMDB.ts             # Hook para datos TMDB
│   │
│   ├── pages/
│   │   ├── Home.tsx               # Página principal (landing)
│   │   ├── MovieArchive.tsx        # Archivo histórico (tabla + CSV)
│   │   └── MovieCatalog.tsx        # Catálogo (grid + filtros)
│   │
│   ├── types/
│   │   └── tmdb.ts                # Tipos TypeScript para TMDB
│   │
│   ├── utils/
│   │   └── tmdbHelpers.ts         # Helpers para URLs de TMDB
│   │
│   ├── css/
│   │   └── App.css                 # Estilos principales (953 líneas)
│   │
│   ├── test/
│   │   ├── setup.ts                # Configuración global de tests
│   │   └── unit/
│   │       └── moviesApi.test.tsx  # Tests unitarios del API client
│   │
│   ├── App.tsx                    # Componente raíz + Router SPA
│   ├── main.tsx                   # Punto de entrada
│   └── index.css                  # Reset CSS + variables globales
│
├── .env                           # Variables locales (no commitear)
├── .env.example                   # Plantilla de variables
├── .gitignore
├── Dockerfile                     # Multi-stage build
├── nginx-spa.conf                 # Configuración Nginx SPA
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── vitest.config.ts
└── README.md
```

---

## 📦 Requisitos Previos

| Requisito | Versión Mínima | Versión Recomendada |
|-----------|----------------|---------------------|
| Node.js | 18.x | 20 LTS |
| pnpm | 8.x | 10.x |
| Docker | 24.x | Latest |
| Git | 2.x | Latest |

---

## 🚀 Instalación Rápida

### 1. Clonar repositorio

```bash
git clone https://github.com/Christiano0407/docker-fullstack-server.git
cd docker-fullstack-server/frontend
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env
```

### 4. Iniciar desarrollo

```bash
pnpm dev
```

---

## 💻 Desarrollo Local

### Requisitos
- Backend corriendo en `http://localhost:5000`
- O usar el proxy de Vite para desarrollo sin backend

### Proxy Automático (vite.config.ts)

Vite configura automáticamente un proxy para `/api`:

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
```

### Comandos

```bash
# Desarrollo con HMR
pnpm dev

# Puerto personalizado
pnpm dev --port 3000

# Preview del build de producción
pnpm build && pnpm preview
```

---

## ⚙️ Variables de Entorno

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `VITE_API_URL` | URL base del backend | `/api/v1` |
| `VITE_ENVIRONMENT` | Entorno de ejecución | `development` |
| `VITE_TMDB_TOKEN` | Token API de TMDB (opcional) | - |

> **Nota:** Las variables deben tener prefijo `VITE_` para ser accesibles en el navegador.

---

## 📜 Scripts Disponibles

```bash
# === Desarrollo ===
pnpm dev              # Dev server con HMR en puerto 5173
pnpm dev --port 3000 # Puerto personalizado

# === Build ===
pnpm build            # Build de producción (TypeScript + Vite)
pnpm preview          # Preview del build localmente

# === Calidad de Código ===
pnpm lint             # ESLint (sin autofix)
pnpm lint:fix        # ESLint con correcciones automáticas

# === TypeScript ===
pnpm typecheck        # Verificación de tipos (tsc -b)

# === Testing ===
pnpm test             # Tests en modo watch
pnpm test:run         # Tests ejecución única
pnpm test:coverage    # Tests con cobertura de código
```

---

## 🏗 Arquitectura

### Arquitectura General

```
┌─────────────────────────────────────────────────────────────────────┐
│                           BROWSER                                     │
│                                                                      │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────────────┐ │
│  │   SPA App   │───▶│  moviesApi  │───▶│  Nginx (Proxy/Load Bal.) │ │
│  │   (React)   │    │  (Fetch)    │    │         Port 80          │ │
│  └─────────────┘    └─────────────┘    └─────────────────────────┘ │
│        │                                          │                 │
│        ▼                                          ▼                 │
│  ┌─────────────┐                          ┌─────────────────────┐   │
│  │  Components │                          │   Backend Pool      │   │
│  │  (GSAP)    │                          │  ┌──────┐ ┌──────┐  │   │
│  └─────────────┘                          │  │  B1  │ │  B2  │  │   │
│                                           │  │:5000 │ │:5000 │  │   │
│                                           │  └──────┘ └──────┘  │   │
│                                           │    FastAPI          │   │
└───────────────────────────────────────────────────────────────────┘
```

### Router SPA (Custom)

El routing se maneja con estado en `App.tsx`:

```typescript
type Page = 'home' | 'catalog' | 'archive';

const [current, setCurrent] = useState<Page>('home');
```

Transiciones con GSAP overlay para efectos de página.

---

## 🎨 Diseño del Sistema

### Variables CSS (App.css)

```css
:root {
  /* === Colores Base === */
  --bg: #030b18;
  --surface: #071428;
  --surface-2: #0c1e3a;
  --surface-3: #122a4d;
  
  /* === Tipografía === */
  --font-display: 'Bebas Neue', sans-serif;
  --font-body: 'Cormorant Garamond', serif;
  --font-mono: 'DM Mono', monospace;
  
  /* === Espaciado === */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  --space-xl: 4rem;
  
  /* === Transiciones === */
  --ease-smooth: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### Estructura de Páginas

| Página | Ruta | Descripción |
|--------|------|-------------|
| `Home` | `/` | Landing con hero, top 5, stats |
| `MovieCatalog` | `/catalog` | Grid con filtros y paginación |
| `MovieArchive` | `/archive` | Tabla histórica con exportación CSV |

### BEM Naming Convention

```css
.block {}
.block__element {}
.block--modifier {}
```

Ejemplo:
```css
.home__hero {}
.home__hero--mesh {}
.home__rowRef {}
```

---

## 🔄 Flujo de Datos

### Fetch de Películas

```
User Visits Catalog
        │
        ▼
┌───────────────────┐
│  MovieCatalog     │
│  (useEffect)      │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│  moviesAPI         │
│  .getMovies()     │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐     ┌────────────────┐
│  fetch()          │────▶│  Backend API   │
│  /api/v1/movies   │     │  /api/v1/movies│
└────────┬──────────┘     └────────────────┘
         │
    ┌────┴────┐
    │         │
Success     Error
    │         │
    ▼         ▼
setMovies  setError
    │
    ▼
Filtered + Sorted
    │
    ▼
Paginated
    │
    ▼
Render MovieCard Grid
```

### Estados de Carga

```typescript
interface State {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}
```

---

## 🔌 API Endpoints

### Consumidos por Frontend

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/v1/movies` | Lista paginada (limit, offset) |
| `GET` | `/api/v1/movies/stats` | Estadísticas del dataset |
| `GET` | `/api/v1/movies/search` | Búsqueda con filtros |

### Parámetros de Query

```typescript
// Paginación
GET /api/v1/movies?limit=12&offset=0

// Búsqueda
GET /api/v1/movies/search?genre=Adventure&rating=PG

// Stats
GET /api/v1/movies/stats
```

### Tipos TypeScript

```typescript
interface MovieListResponse {
  count: number;
  total: number;
  limit: number;
  offset: number;
  data: Movie[];
}

interface Movie {
  movie_title: string;
  release_date: string;     // Formato: DD/MM/YYYY
  genre: string;
  rating: 'G' | 'PG' | 'PG-13' | 'R' | 'Not Rated';
  total_gross: number;     // USD sin ajustar
  adjusted_gross: number;  // USD ajustado por inflación
}

interface StatsResponse {
  total_movies: number;
  genres: GenreStats[];
  top_grossing: Movie;
  most_recent: Movie;
}
```

---

## 🧩 Componentes

### Core Components

| Componente | Descripción | Props |
|------------|-------------|-------|
| `Nav` | Barra de navegación | `current: Page`, `onNavigate: (p) => void` |
| `MovieCard` | Tarjeta de película | `movie: Movie` |
| `Pagination` | Controles de paginación | `offset`, `limit`, `total`, `onPrev`, `onNext` |
| `Top5Grid` | Grid de top 5 | `onNavigate: (p) => void` |
| `Footer` | Pie de página | - |

### Page Components

| Componente | Descripción |
|-----------|-------------|
| `Home` | Landing page con hero animado, stats, top 5 |
| `MovieCatalog` | Grid filtrable con búsqueda y paginación |
| `MovieArchive` | Tabla histórica con ordenamiento y exportación CSV |

### Hooks Personalizados

| Hook | Descripción |
|------|-------------|
| `usePoster(movieTitle)` | Obtiene poster de TMDB (futuro) |
| `useTMDB()` | Datos de TMDB (futuro) |

---

## 🎬 Hero Component (Streaming Style)

Hero section estilo Netflix/Disney+ con slideshow automático, carousel de películas y animaciones GSAP.

### Estructura de Archivos

```
src/components/Hero/
├── Hero.tsx           # Componente principal con slideshow
├── HeroSlide.tsx      # Slide individual con backdrop y contenido
├── MovieCarousel.tsx  # Carousel horizontal de películas
├── Hero.css           # Estilos (900+ líneas)
└── index.ts          # Barrel exports
```

### Características Implementadas

| Característica | Descripción |
|----------------|-------------|
| **Backdrop Images** | Imágenes de TMDB en alta resolución con Ken Burns effect |
| **Gradient Overlay** | Overlay oscuro progresivo de izquierda para legibilidad del texto |
| **Auto-Slideshow** | Cambio automático cada 7 segundos |
| **Pause on Hover** | Pausa automática al pasar el mouse |
| **Navigation Arrows** | Botones prev/next con hover effects |
| **Progress Indicators** | Dots indicadores con estado activo |
| **Movie Carousel** | Carousel horizontal con drag support |
| **GSAP Animations** | Transiciones suaves con timeline |
| **Responsive Design** | Adaptado para mobile, tablet y desktop |

### Componentes Hijos

#### HeroSlide

Slide individual del hero con backdrop, overlay y contenido.

```typescript
interface HeroSlideProps {
  movie: Movie;           // Datos de la película
  isActive: boolean;      // Estado activo para animación
  onSelect: () => void;   // Callback al hacer click en Play
}
```

**Elementos visuales:**
- Título de la película (font-display, 4-8rem)
- Metadata (rating badge, año, género)
- Descripción (máx 2 líneas)
- Botones Play y My List
- Stats (box office, adjusted gross)

#### MovieCarousel

Carousel horizontal de películas destacadas.

```typescript
interface MovieCarouselProps {
  movies: Movie[];              // Lista de películas
  currentIndex: number;         // Índice activo
  onSelectMovie: (m: Movie) => void;  // Callback de selección
}
```

**Características:**
- Scroll horizontal con grab cursor
- Drag support (mouse)
- Card activa con scale y glow
- Gradientes de colores por película
- Auto-scroll al cambiar slide

### Props del Hero Principal

```typescript
interface HeroProps {
  movies: Movie[];                      // Películas para el slideshow
  onSelectMovie: (movie: Movie) => void;  // Callback de selección
}
```

### Estilos CSS

```css
/* Container principal */
.hero { }
.hero__slides { }
.hero__loading { }

/* Slide */
.hero-slide { }
.hero-slide--active { }
.hero-slide__backdrop { }
.hero-slide__overlay { }
.hero-slide__content { }

/* Botones */
.hero-btn { }
.hero-btn--play { }
.hero-btn--list { }

/* Navegación */
.hero__nav { }
.hero__nav-btn { }
.hero__indicators { }
.hero__indicator { }

/* Carousel */
.movie-carousel { }
.movie-carousel__track { }
.movie-carousel__card { }
.movie-carousel__poster { }
```

### Animaciones GSAP

```typescript
// Animación de entrada del slide
gsap.to(imageRef, { scale: 1, duration: 1.5, ease: 'power2.out' })
gsap.to(contentRef, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' })

// Timeline con stagger
const tl = gsap.timeline({ delay: 0.15 });
tl.to(ref1, { opacity: 1, y: 0 })
  .to(ref2, { ... }, '-=0.3')
```

### Responsive Breakpoints

| Breakpoint | Comportamiento |
|------------|----------------|
| `< 480px` | Stack vertical, sin descripción, carousel más pequeño |
| `768px` | Ajuste de tamaños, navegación oculta |
| `1024px` | Contenido al 60% del ancho |
| `> 1024px` | Contenido al 50% del ancho |

### Bundle Size

```
dist/index.css    ~26 kB (Hero styles incluidos)
dist/index.js     ~288 kB (GSAP + React)
```

### Uso en Home

```typescript
import { Hero } from '../components/Hero';

function Home() {
  const handleSelectMovie = (movie: Movie) => {
    console.log('Selected:', movie.movie_title);
  };

  return (
    <div className="wrapper__home">
      <Hero
        movies={heroMovies}
        onSelectMovie={handleSelectMovie}
      />
      {/* Resto del contenido... */}
    </div>
  );
}
```

### TMDB Integration

El Hero soporta imágenes de TMDB para backdrops y posters:

```typescript
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';
const backdropUrl = `${IMAGE_BASE_URL}/k3j9J9mAH8NOGzN9z4YUxS8qT8.jpg`;
```

> **Nota:** Requiere token de API de TMDB en `VITE_TMDB_TOKEN` para usar imágenes reales.

---

## 🐳 Docker

### Build Multi-Stage

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
ARG VITE_API_URL=/api/v1
RUN pnpm build

# Stage 2: Runtime
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx-spa.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Comandos Docker Compose

```bash
# Desde la raíz del proyecto
cd docker-fullstack-server

# Build de imagen
docker compose build frontend

# Levantar contenedor
docker compose up -d frontend

# Ver logs
docker compose logs -f frontend

# Detener
docker compose down
```

### Variables de Build

```yaml
# docker-compose.yml
build:
  context: ./frontend
  args:
    VITE_API_URL: /api/v1
    VITE_ENVIRONMENT: production
```

---

## 🧪 Testing

### Estructura de Tests

Los tests van junto al componente que prueban:

```
src/
├── components/
│   ├── MovieCard.tsx
│   └── MovieCard.test.tsx    ← Tests aquí
│
├── api/
│   ├── moviesApi.ts
│   └── moviesApi.test.tsx
│
└── test/
    └── setup.ts              ← Config global
```

### Configuración (vitest.config.ts)

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
});
```

### Ejecutar Tests

```bash
# Modo watch (desarrollo)
pnpm test

# Ejecución única (CI/CD)
pnpm test:run

# Con cobertura
pnpm test:coverage
```

### Tests Implementados

| Módulo | Cobertura |
|--------|----------|
| `moviesApi` | Fetch, errores, respuestas tipadas |
| Componentes | Renderizado, props, estados |

---

## 📏 Convenciones de Código

### Nomenclatura

| Tipo | Convención | Ejemplo |
|------|------------|---------|
| Componentes | PascalCase | `MovieCard.tsx` |
| Hooks | camelCase + `use` | `usePoster.ts` |
| Utilidades | camelCase | `tmdbHelpers.ts` |
| Tests | `*.test.{ts,tsx}` | `MovieCard.test.tsx` |
| Types | PascalCase | `tmdb.ts` |

### Imports

```typescript
// Componentes locales (relative paths)
import MovieCard from './MovieCard';
import Footer from '../components/Footer';

// Alias para API
import { moviesAPI } from '../api/moviesApi';

// Tipos
import type { Movie } from '../api/moviesApi';
```

### Estilos CSS

- Usar **variables CSS** para colores, espaciado y tipografía
- **BEM** para naming de clases
- Evitar `!important`
- Mobile-first responsive

---

## 🤝 Contribución

### Flujo de Trabajo

```bash
# 1. Fork y clone
git clone https://github.com/TU_USER/docker-fullstack-server.git
cd docker-fullstack-server/frontend

# 2. Crear rama
git checkout -b feature/nueva-funcion

# 3. Desarrollar
pnpm dev

# 4. Tests
pnpm test:run
pnpm lint

# 5. Commit (Conventional Commits)
git commit -m 'feat: agregar nueva funcionalidad'
git commit -m 'fix: corregir bug en paginación'
git commit -m 'refactor: extraer estilos a CSS modules'

# 6. Push y PR
git push origin feature/nueva-funcion
```

### Checklist Pre-commit

- [ ] `pnpm test:run` pasa sin errores
- [ ] `pnpm lint` sin warnings
- [ ] `pnpm build` compila correctamente
- [ ] Tests nuevos incluidos
- [ ] README.md actualizado si necesario

---

## 📄 Licencia

MIT License - Ver archivo `LICENSE` en el repositorio raíz.

---

## 🔗 Enlaces

### Proyecto
- [Disney Movies API - Backend](https://github.com/Christiano0407/docker-fullstack-server)
- [Repositorio Principal](https://github.com/Christiano0407/docker-fullstack-server)

### Documentación
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [GSAP Documentation](https://gsap.com/docs/)
- [Vitest Guide](https://vitest.dev/guide/)
- [Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)

### APIs
- [The Movie Database (TMDB)](https://www.themoviedb.org/documentation/api)

---

<div align="center">
  <p>Disney Movies Archive Frontend</p>
  <p>Construido con React + TypeScript + Vite + GSAP</p>
  <p>Construido con SKILLS</p>
</div>
