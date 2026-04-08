---
name: disney-frontend-design
description: |
  Skill especializado para el proyecto Disney Movies Archive Frontend.
  Guía de diseño, convenciones de código, patrones de componentes y mejores prácticas.
version: 1.0.0
tags: [react, typescript, gsap, css, frontend, disney]
---

# 🎨 Disney Movies Archive - Frontend Design Skill

Skill especializado para desarrollar y mantener el frontend de Disney Movies Archive.
Diseñado para uso con OpenCode AI.

---

## 📋 Índice

1. [Filosofía de Diseño](#-filosofía-de-diseño)
2. [Stack Tecnológico](#-stack-tecnológico)
3. [Sistema de Diseño](#-sistema-de-diseño)
4. [Variables CSS](#-variables-css)
5. [Convenciones de Código](#-convenciones-de-código)
6. [Patrones de Componentes](#-patrones-de-componentes)
7. [Patrones de Hooks](#-patrones-de-hooks)
8. [Gestión de Estado](#-gestión-de-estado)
9. [Animaciones con GSAP](#-animaciones-con-gsap)
10. [API Client](#-api-client)
11. [Arquitectura de Páginas](#-arquitectura-de-páginas)
12. [CSS Guidelines](#-css-guidelines)
13. [Performance](#-performance)
14. [Accesibilidad](#-accesibilidad)
15. [Testing](#-testing)
16. [Docker & Deployment](#-docker--deployment)
17. [Errores Comunes a Evitar](#-errores-comunes-a-evitar)

---

## 🎯 Filosofía de Diseño

### Principios Fundamentales

1. **Dark Theme Premium** - Paleta "Deep Ocean" con acentos dorados
2. **Minimalismo Funcional** - Diseño limpio sin sacrificar funcionalidad
3. **Performance First** - Carga rápida, animaciones optimizadas
4. **Responsive Design** - Mobile-first con breakpoints claros
5. **TypeScript Estricto** - Sin `any`, tipos explícitos

### Identidad Visual

| Elemento | Valor |
|----------|-------|
| **Tema** | Dark premium |
| **Paleta** | Deep Ocean (azules oscuros) + Gold accent |
| **Tipografía Display** | Bebas Neue |
| **Tipografía Body** | Cormorant Garamond |
| **Tipografía Mono** | DM Mono |

---

## 🛠 Stack Tecnológico

### Dependencias de Producción

```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "gsap": "^3.14.2"
}
```

### Dependencias de Desarrollo

```json
{
  "typescript": "~5.9.3",
  "vite": "^7.3.1",
  "@vitejs/plugin-react": "^5.1.1",
  "vitest": "^4.1.2",
  "@testing-library/react": "^16.3.2",
  "eslint": "^9.39.1",
  "typescript-eslint": "^8.48.0"
}
```

---

## 🎨 Sistema de Diseño

### Colores

```css
/* ═══════════════════════════════════════
   Color Palette — Deep Ocean Theme
   ═══════════════════════════════════════ */

/* Base Colors */
--clr-base: #0046FF;
--clr-base-black: #001BB7;
--clr-base-white: #60B5FF;

/* Neutros */
--clr-white: #fff;
--clr-white-one: #f2f2f2f2;    /* ⚠️ Error: debería ser #f2f2f2 */
--clr-black: #111;
--clr-black-one: #333;

/* Backgrounds */
--bg: #030b18;         /* Fondo principal */
--bg-mid: #050f20;      /* Fondo intermedio */
--surface: #071428;     /* Superficie elevada */
--surface-2: #0a1a33;   /* Superficie nivel 2 */
--surface-3: #0d2040;   /* Superficie nivel 3 */

/* Bordes */
--border: rgba(100, 160, 255, 0.08);
--border-2: rgba(100, 160, 255, 0.14);

/* Textos */
--text-muted: #6e7990;
--text-dim: #6e7990;    /* Alias de text-muted */

/* Acentos Gold */
--gold: #d4a847;
--gold-dim: #a68a3a;
--gold-bright: #f0c75e;
--accent: #d4a847;      /* Alias recomendado para usar */

/* Blues */
--blue-dim: #2d5a8a;
--blue: #3b82f6;

/* Ratings MPAA */
--rating-g: #22c55e;
--rating-pg: #3b82f6;
--rating-pg13: #f59e0b;
--rating-r: #ef4444;
--rating-nr: #6b7280;
```

### Tipografía

```css
/* ═══════════════════════════════════════
   Typography System
   ═══════════════════════════════════════ */

/* Fonts */
--font-display: 'Bebas Neue', sans-serif;
--font-body: 'Cormorant Garamond', Georgia, serif;
--font-mono: 'DM Mono', monospace;

/* Font Sizes (base 10px, usando rem) */
--text-xs: 0.6rem;    /* 6px */
--text-sm: 0.8rem;    /* 8px */
--text-base: 1rem;    /* 10px */
--text-lg: 1.2rem;    /* 12px */
--text-xl: 1.4rem;    /* 14px */
--text-2xl: 1.6rem;    /* 16px */
--text-3xl: 2rem;      /* 20px */
--text-4xl: 2.4rem;    /* 24px */

/* Font Weights */
--weight-light: 300;
--weight-normal: 400;
--weight-medium: 500;
--weight-semibold: 600;

/* Letter Spacing */
--tracking-tight: -0.05em;
--tracking-normal: 0;
--tracking-wide: 0.05em;
--tracking-wider: 0.1em;
--tracking-widest: 0.2em;
```

### Espaciado

```css
/* ═══════════════════════════════════════
   Spacing Scale
   ═══════════════════════════════════════ */

--space-1: 0.1rem;    /* 1px */
--space-2: 0.2rem;    /* 2px */
--space-3: 0.3rem;    /* 3px */
--space-4: 0.4rem;    /* 4px */
--space-5: 0.5rem;    /* 5px */
--space-6: 0.6rem;    /* 6px */
--space-8: 0.8rem;    /* 8px */
--space-10: 1rem;     /* 10px */
--space-12: 1.2rem;   /* 12px */
--space-14: 1.4rem;   /* 14px */
--space-16: 1.6rem;   /* 16px */
--space-20: 2rem;     /* 20px */
--space-24: 2.4rem;   /* 24px */
--space-32: 3.2rem;   /* 32px */
--space-40: 4rem;     /* 40px */
--space-48: 4.8rem;   /* 48px */
--space-64: 6.4rem;   /* 64px */
```

### Transiciones

```css
/* ═══════════════════════════════════════
   Transitions & Animations
   ═══════════════════════════════════════ */

--ease: cubic-bezier(0.25, 0.46, 0.45, 0.94);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);

/* Durations */
--duration-fast: 150ms;
--duration-normal: 250ms;
--duration-slow: 400ms;
--duration-slower: 600ms;
```

### Breakpoints

```css
/* ═══════════════════════════════════════
   Responsive Breakpoints
   ═══════════════════════════════════════ */

/* Mobile First */
@media (min-width: 480px) { /* Mobile large */ }
@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1280px) { /* Desktop large */ }
@media (min-width: 1536px) { /* 4K */ }
```

---

## 🔧 Variables CSS

### Cómo Definir Variables

**✅ CORRECTO - Definir en `:root`**
```css
:root {
  --custom-color: #ff6b6b;
  --custom-spacing: 1.5rem;
}
```

**❌ INCORRECTO - No usar `var()` dentro de `var()`**
```css
/* ❌ MAL */
border-top: 0.1rem solid var(var(--border));

/* ✅ BIEN */
border-top: 0.1rem solid var(--border);
```

### Variables Obligatorias

Para nuevos componentes, usar SIEMPRE variables del sistema:

```css
/* Colores - usar variables */
color: var(--text-muted);
background: var(--surface);
border: var(--border);

/* Espaciado - usar variables */
padding: var(--space-4);
margin-bottom: var(--space-8);

/* Tipografía */
font-family: var(--font-display);
font-size: var(--text-lg);
```

---

## 📏 Convenciones de Código

### Nomenclatura de Archivos

| Tipo | Convención | Ejemplo |
|------|------------|---------|
| Componentes | PascalCase | `MovieCard.tsx` |
| Hooks | camelCase + `use` | `usePoster.ts` |
| Utils | camelCase | `tmdbHelpers.ts` |
| Types | PascalCase | `Movie.ts` |
| Tests | `*.test.{ts,tsx}` | `MovieCard.test.tsx` |
| Styles | kebab-case | `app-layout.css` |

### Estructura de Componentes

```typescript
/**
 * NombreComponente.tsx
 * Descripción breve del componente
 */
import { useState, useEffect } from 'react';
import type { Page } from '../App';

// Types
interface Props {
  title: string;
  onAction?: () => void;
}

// Constants (fuera del componente si no dependen de props)
const DEFAULT_VALUE = 'example';

// Component
export default function NombreComponente({ title, onAction }: Props) {
  // Hooks primero
  const [state, setState] = useState<string>(DEFAULT_VALUE);

  // Effects
  useEffect(() => {
    // cleanup
  }, []);

  // Handlers
  const handleClick = () => {
    onAction?.();
  };

  // Render
  return (
    <div className="component">
      <h2>{title}</h2>
      <button onClick={handleClick}>Action</button>
    </div>
  );
}
```

### Orden de Imports

```typescript
// 1. React
import { useState, useEffect } from 'react';

// 2. Libraries externas
import gsap from 'gsap';

// 3. Components locales
import MovieCard from '../components/MovieCard';
import Footer from '../components/Footer';

// 4. Types
import type { Movie } from '../api/moviesApi';
import type { Page } from '../App';

// 5. Utils/Helpers
import { formatCurrency } from '../utils/formatters';

// 6. Styles
import '../css/App.css';
```

### TypeScript Rules

```typescript
// ✅ CORRECTO - Tipos explícitos
const handleClick = (id: string): void => { };
const fetchMovies = async (limit: number, offset: number): Promise<Movie[]> => {};

// ❌ INCORRECTO - No any
const handleClick = (id: any) => { };

// ✅ CORRECTO - Interfaces para props
interface Props {
  movie: Movie;
  onSelect: (id: string) => void;
}

// ❌ INCORRECTO - Props inline
<Component movie={movie} onSelect={(id) => console.log(id)} />
```

---

## 🧩 Patrones de Componentes

### Componente Presentacional (Stateless)

```typescript
// Componente que solo recibe props y renderiza
interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
}

export function MovieCard({ movie, onClick }: MovieCardProps) {
  return (
    <article className="movie-card" onClick={onClick}>
      <h3 className="movie-card__title">{movie.movie_title}</h3>
      <span className={`rating rating--${movie.rating.toLowerCase()}`}>
        {movie.rating}
      </span>
    </article>
  );
}
```

### Componente con Estado Local

```typescript
// Componente con estado interno
interface Props {
  initialExpanded?: boolean;
}

export function ExpandableCard({ initialExpanded = false }: Props) {
  const [expanded, setExpanded] = useState(initialExpanded);

  const toggle = () => setExpanded(prev => !prev);

  return (
    <div className={`card ${expanded ? 'card--expanded' : ''}`}>
      <button onClick={toggle}>
        {expanded ? 'Collapse' : 'Expand'}
      </button>
      {expanded && <div className="card__content">Content</div>}
    </div>
  );
}
```

### Componente con Fetch de Datos

```typescript
// Patrón para componentes que consumen API
interface Props {
  movieId: string;
}

export function MovieDetail({ movieId }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await moviesAPI.getMovieById(movieId);
        setMovie(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  if (loading) return <Skeleton />;
  if (error) return <ErrorMessage message={error} />;
  if (!movie) return null;

  return <MovieDetails movie={movie} />;
}
```

---

## 🪝 Patrones de Hooks

### Hook con Memoria

```typescript
// hooks/usePoster.ts
import { useState, useEffect } from 'react';

const cache = new Map<string, string>();

export function usePoster(movieTitle: string): string | null {
  const [posterUrl, setPosterUrl] = useState<string | null>(null);

  useEffect(() => {
    if (cache.has(movieTitle)) {
      setPosterUrl(cache.get(movieTitle) ?? null);
      return;
    }

    // Fetch poster logic here
    const fetchPoster = async () => {
      const url = await getPosterUrl(movieTitle);
      cache.set(movieTitle, url);
      setPosterUrl(url);
    };

    fetchPoster();
  }, [movieTitle]);

  return posterUrl;
}
```

### Hook para Animaciones GSAP

```typescript
// ⚠️ IMPORTANTE: Siempre verificar refs antes de usar GSAP
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function useGsapAnimation(selector: string) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(selector);
    if (elements.length === 0) return;

    gsap.set(elements, { opacity: 0, y: 30 });

    const tl = gsap.timeline();
    tl.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
    });

    return () => {
      tl.kill();
    };
  }, [selector]);

  return containerRef;
}
```

---

## 📊 Gestión de Estado

### Estado Local vs Global

```typescript
// ✅ Estado LOCAL - useState
function MovieCard() {
  const [expanded, setExpanded] = useState(false);
  // Ideal para estado privado del componente
}

// ✅ Estado COMPARTIDO - Prop drilling (mínimo)
function CatalogPage({ onNavigate }: Props) {
  // Ideal cuando solo 1-2 niveles de profundidad
  return <MovieList onNavigate={onNavigate} />;
}

// ❌ EVITAR - Prop drilling excesivo
// Si necesitas pasar props por más de 2-3 niveles, considera Context o Zustand
```

### Patrón de Estado para Fetch

```typescript
interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useAsyncData<T>(fetchFn: () => Promise<T>): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      try {
        const result = await fetchFn();
        if (mounted) {
          setState({ data: result, loading: false, error: null });
        }
      } catch (e) {
        if (mounted) {
          setState({
            data: null,
            loading: false,
            error: e instanceof Error ? e.message : 'Unknown error'
          });
        }
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return state;
}
```

---

## ✨ Animaciones con GSAP

### Animación de Entrada (Hero)

```typescript
// ✅ CORRECTO - Verificar refs antes de animar
useEffect(() => {
  const refs = [ref1.current, ref2.current, ref3.current].filter(Boolean);
  
  if (refs.length === 0) return;

  gsap.set(refs, { opacity: 0, y: 30 });

  const tl = gsap.timeline({ delay: 0.15 });
  tl.to(refs[0], { opacity: 1, y: 0, duration: 0.7 })
    .to(refs[1], { opacity: 1, y: 0, duration: 0.5 }, '-=0.3');

  return () => tl.kill();
}, []);
```

### ❌ EVITAR - Animar sin verificar null

```typescript
// ❌ MAL - Puede causar errores
useEffect(() => {
  gsap.to(ref.current, { opacity: 1 }); // ref.current puede ser null
}, []);
```

### Transiciones de Página

```typescript
// app/App.tsx
import gsap from 'gsap';

function navigate(nextPage: Page) {
  if (nextPage === current) return;

  const overlay = overlayRef.current;
  if (!overlay) return;

  gsap.to(overlay, {
    opacity: 1,
    duration: 0.25,
    onComplete: () => {
      setCurrent(nextPage);
      window.scrollTo(0, 0);
      gsap.to(overlay, { opacity: 0, duration: 0.35, delay: 0.05 });
    },
  });
}
```

---

## 🔌 API Client

### Patrón de moviesApi

```typescript
// src/api/moviesApi.ts
const BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

interface MovieListResponse {
  count: number;
  total: number;
  limit: number;
  offset: number;
  data: Movie[];
}

export const moviesAPI = {
  async getMovies(limit: number = 10, offset: number = 0): Promise<MovieListResponse> {
    const res = await fetch(`${BASE_URL}/movies?limit=${limit}&offset=${offset}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  },

  async getStats(): Promise<StatsResponse> {
    const res = await fetch(`${BASE_URL}/movies/stats`);
    if (!res.ok) throw new Error('Failed to fetch stats');
    return res.json();
  },
};
```

### Uso en Componentes

```typescript
// ✅ CORRECTO - Manejo de estados completo
const fetchMovies = useCallback(async () => {
  setLoading(true);
  setError(null);
  try {
    const data = await moviesAPI.getMovies(100, 0);
    setMovies(data.data);
  } catch (e) {
    setError(e instanceof Error ? e.message : 'Failed to load');
  } finally {
    setLoading(false);
  }
}, []);

useEffect(() => { fetchMovies(); }, [fetchMovies]);

// ❌ INCORRECTO - No usar valores hardcodeados que excedan límites del backend
// El backend acepta max 100 para limit
moviesAPI.getMovies(200, 0); // ❌ Error 422!
moviesAPI.getMovies(100, 0); // ✅ Correcto
```

---

## 📄 Arquitectura de Páginas

### Estructura de Home

```typescript
// src/pages/Home.tsx
// 1. Imports
// 2. Constants (MARQUEE_ITEMS, formatters)
// 3. Props interface
// 4. Component
//    - Refs para GSAP
//    - State (stats data)
//    - Effects (GSAP animations, API fetch)
//    - Handlers
//    - JSX
```

### Estructura de Catalog/Archive

```typescript
// src/pages/MovieCatalog.tsx
// 1. Constants (LIMIT, GENRES, SORT_OPTIONS)
// 2. Props interface
// 3. Component
//    - State (movies, loading, error, filters)
//    - fetchMovies con useCallback
//    - filtered & sorted computed
//    - Handlers
//    - JSX
```

### Navegación SPA

```typescript
// Props interface
interface Props {
  onNavigate: (page: Page) => void;
}

// Uso
<button onClick={() => onNavigate('catalog')}>Ir al Catálogo</button>

// Si el componente NO necesita navegación, NO recibir onNavigate
// Remover del props interface y del JSX
```

---

## 🎨 CSS Guidelines

### Metodología BEM

```css
/* Block */
.movie-card { }

/* Element */
.movie-card__title { }
.movie-card__image { }
.movie-card__rating { }

/* Modifier */
.movie-card--featured { }
.movie-card--loading { }
```

### Clases de Estructura

```css
/* Wrapper - Contenedor principal */
.wrapper__catalog { }

/* Header */
.catalog__header { }
.catalog__header--content { }

/* Section */
.catalog__filters { }
.catalog__results { }

/* Grid */
.catalog__grid { }

/* Row */
.home__rowRef { }
.home__rowRefBtn { }
```

### Responsive

```css
/* Mobile first */
.component { }

/* Tablet+ */
@media (min-width: 768px) {
  .component { }
}

/* Desktop+ */
@media (min-width: 1024px) {
  .component { }
}
```

### ⚠️ Errores CSS Comunes

```css
/* ❌ INCORRECTO - var() dentro de var() */
border: 1px solid var(var(--border));

/* ✅ CORRECTO */
border: 1px solid var(--border);

/* ❌ INCORRECTO - Color con syntax errors */
color: var(--clr-base-white: #60B5FF);

/* ✅ CORRECTO */
color: var(--clr-base-white);
color: #60B5FF;

/* ❌ INCORRECTO - Espaciado sin unidad */
margin: 16;
padding: 8;

/* ✅ CORRECTO */
margin: 1.6rem;
padding: 0.8rem;
```

---

## ⚡ Performance

### Optimizaciones Recomendadas

| Técnica | Cuándo Usar | Implementación |
|---------|--------------|---------------|
| `React.memo` | Componentes que re-renderizan frecuentemente | `export default React.memo(Component)` |
| `useMemo` | Cálculos costosos | `const sorted = useMemo(() => [...].sort(...), [deps])` |
| `useCallback` | Funciones pasadas como props | `const handler = useCallback(() => {}, [deps])` |
| `React.lazy` | Páginas/comp. grandes | `const Page = lazy(() => import('./Page'))` |

### Lazy Loading de Páginas

```typescript
// src/App.tsx
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home'));
const Catalog = lazy(() => import('./pages/MovieCatalog'));
const Archive = lazy(() => import('./pages/MovieArchive'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      {current === 'home' && <Home onNavigate={navigate} />}
      {/* ... */}
    </Suspense>
  );
}
```

### Virtualización (Para Listas Largas)

```typescript
// Para MovieArchive con 579+ items
// Considerar usar react-virtual o react-window
```

---

## ♿ Accesibilidad

### Requisitos Mínimos

```typescript
// Imágenes con alt
<img src={poster} alt={`${movie.movie_title} poster`} />

// Botones con contenido legible
<button aria-label="Ir a página siguiente">
  <ArrowRight />
</button>

// Formularios con labels
<label htmlFor="search">Buscar películas</label>
<input id="search" type="text" />

// Contraste mínimo 4.5:1 para texto normal
// Usar herramientas como axe o Lighthouse
```

### ARIA Attributes

```typescript
// Estados expandidos
<button aria-expanded={isExpanded}>Toggle</button>

// Contenido dinámico
<div aria-live="polite">{message}</div>

// Skip links para navegación por teclado
<a href="#main-content" className="skip-link">Saltar al contenido</a>
```

---

## 🧪 Testing

### Estructura

```
src/
├── __tests__/
│   ├── setup.ts           # Config global
│   └── unit/
│       ├── moviesApi.test.ts
│       └── formatters.test.ts
└── components/
    ├── MovieCard.tsx
    └── MovieCard.test.tsx
```

### Ejemplo de Test

```typescript
import { render, screen } from '@testing-library/react';
import { MovieCard } from './MovieCard';

describe('MovieCard', () => {
  const mockMovie: Movie = {
    movie_title: 'Test Movie',
    release_date: '01/01/2020',
    genre: 'Action',
    rating: 'PG',
    total_gross: 1000000,
    adjusted_gross: 1500000,
  };

  it('renders movie title', () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
  });

  it('displays formatted gross', () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('$1.0M')).toBeInTheDocument();
  });
});
```

### Ejecutar Tests

```bash
pnpm test              # Watch mode
pnpm test:run          # Single run
pnpm test:coverage     # With coverage
```

---

## 🐳 Docker & Deployment

### Dockerfile Multi-Stage

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
ARG VITE_API_URL=/api/v1
ARG VITE_ENVIRONMENT=production
RUN pnpm build

# Stage 2: Production
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx-spa.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### nginx-spa.conf

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://backend:5000/api/;
        proxy_set_header Host $host;
    }
}
```

### Comandos Docker

```bash
# Build
docker compose build frontend

# Run
docker compose up -d frontend

# Logs
docker compose logs -f frontend

# Rebuild after changes
docker compose up -d --build frontend
```

---

## ⚠️ Errores Comunes a Evitar

### 1. GSAP Null References

```typescript
// ❌ MAL
useEffect(() => {
  gsap.to(ref.current, { opacity: 1 }); // Puede fallar
});

// ✅ BIEN
useEffect(() => {
  if (!ref.current) return;
  gsap.to(ref.current, { opacity: 1 });
});
```

### 2. Límites de API

```typescript
// ❌ MAL - Backend rechaza > 100
await moviesAPI.getMovies(200, 0);

// ✅ BIEN
await moviesAPI.getMovies(100, 0);
```

### 3. CSS Variables Mal Formadas

```css
/* ❌ MAL */
var(--color: #fff)      /* No usar : dentro de var() */
var(var(--border))      /* No anidar var() */

/* ✅ BIEN */
var(--color)
var(--border)
```

### 4. Props No Usados

```typescript
// ❌ MAL - Props recibe onNavigate pero no lo usa
function Catalog({ onNavigate }: Props) {
  return <div>Catalogo</div>;
}

// ✅ BIEN - Si no se usa, no recibirlo
function Catalog() {
  return <div>Catalogo</div>;
}
```

### 5. ScrollTrigger Importado Pero No Usado

```typescript
// ❌ MAL - Importar plugin no usado
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// ✅ BIEN - Si no se usa, no importar
import gsap from 'gsap';
```

---

## 📁 Estructura de Archivos Sugerida

```
frontend/
├── src/
│   ├── api/
│   │   └── moviesApi.ts           # ✅ Existe
│   ├── components/
│   │   ├── Footer.tsx             # ✅ Existe
│   │   ├── MovieCard.tsx          # ✅ Existe
│   │   ├── Nav.tsx                # ✅ Existe
│   │   ├── Pagination.tsx         # ✅ Existe
│   │   └── Top5Grid.tsx          # ✅ Existe
│   ├── hooks/
│   │   └── usePoster.ts           # ✅ Existe
│   ├── pages/
│   │   ├── Home.tsx               # ✅ Existe
│   │   ├── MovieArchive.tsx       # ✅ Existe
│   │   └── MovieCatalog.tsx       # ✅ Existe
│   ├── css/
│   │   ├── app.css                # ✅ Existe
│   │   └── tokens.css             # 🔲 Crear: variables separadas
│   ├── types/
│   │   └── movie.ts               # 🔲 Crear: tipos centralizados
│   └── utils/
│       └── formatters.ts          # 🔲 Crear: formateadores reutilizables
│
├── .opencode/
│   └── skills/
│       └── frontend-design/       # ✅ Este skill
│
└── Dockerfile                     # ✅ Existe
```

---

## 🔄 Checklist de Calidad

Antes de cada commit:

- [ ] `pnpm lint` pasa sin errores
- [ ] `pnpm build` compila sin errores
- [ ] `pnpm test:run` pasa todos los tests
- [ ] No hay `console.log` en producción
- [ ] No hay `any` en TypeScript
- [ ] CSS usa variables del sistema
- [ ] GSAP refs verificados antes de usar
- [ ] API calls con manejo de errores
- [ ] Loading y error states implementados

---

## 📚 Recursos

- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [GSAP Docs](https://gsap.com/docs/)
- [CSS Tricks - BEM](https://css-tricks.com/bem-101/)
- [Vitest Guide](https://vitest.dev/guide/)
- [axe DevTools](https://www.deque.com/axe/)

---

<div align="center">

**Disney Movies Archive - Frontend Design Skill**

Versión 1.0.0 | Para uso con OpenCode

</div>
