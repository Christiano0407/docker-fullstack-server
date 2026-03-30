# 🎬 Disney Movies - Frontend

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF?logo=vite&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-4.1.2-6E9F18?logo=vitest&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)

Aplicación frontend para la **Disney Movies API**. Presenta un catálogo interactivo de películas de Disney con búsqueda, paginación y diseño responsivo.

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Tecnologías](#-tecnologías)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Requisitos](#-requisitos)
- [Instalación](#-instalación)
- [Variables de Entorno](#-variables-de-entorno)
- [Scripts Disponibles](#-scripts-disponibles)
- [Desarrollo Local](#-desarrollo-local)
- [Docker](#-docker)
- [Tests](#-tests)
- [API Endpoints](#-api-endpoints)
- [Arquitectura](#-arquitectura)
- [Contribución](#-contribución)

---

## 📖 Descripción

Disney Movies Frontend es una aplicación React que permite visualizar y explorar el catálogo de películas de Disney desde 1937 hasta 2016. Ofrece:

- Lista paginada de películas con información financiera (gross/box office)
- Filtrado por género y clasificación MPAA
- Diseño responsivo optimizado para desktop y mobile
- Estados de carga, error y vacío
- Tests unitarios con Vitest

---

## 🛠 Tecnologías

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | 19.2.0 | Framework UI |
| TypeScript | 5.9.3 | Tipado estático |
| Vite | 7.3.1 | Bundling y dev server |
| Vitest | 4.1.2 | Testing framework |
| Testing Library | 10.x | Utilidades de testing |
| Nginx | Alpine | Servidor de producción |
| Docker | Latest | Contenedores |

---

## 📁 Estructura del Proyecto

```
frontend/
├── public/                      # Assets públicos
├── src/
│   ├── api/
│   │   └── moviesApi.ts        # Cliente HTTP tipado
│   ├── components/
│   │   ├── MovieCard.tsx      # Tarjeta individual de película
│   │   ├── MovieCard.test.tsx
│   │   ├── MovieList.tsx      # Lista con fetch y estados
│   │   ├── MovieList.test.tsx
│   │   ├── Pagination.tsx      # Controles de paginación
│   │   └── Pagination.test.tsx
│   ├── test/
│   │   └── setup.ts           # Configuración global de tests
│   ├── App.tsx                # Componente principal
│   ├── App.css                # Estilos de App
│   ├── main.tsx               # Punto de entrada
│   └── index.css              # Estilos globales
├── .env                       # Variables de entorno locales
├── .env.example               # Plantilla de variables
├── Dockerfile                 # Multi-stage build
├── nginx-spa.conf             # Configuración Nginx para SPA
├── vite.config.ts             # Configuración de Vite
├── vitest.config.ts           # Configuración de Vitest
├── package.json
└── tsconfig.json
```

---

## 📦 Requisitos

- **Node.js** 18+ (recomendado: 20 LTS)
- **pnpm** 8+ (o npm/yarn)
- **Docker** 24+ (para producción)
- **Git**

---

## 🚀 Instalación

### 1. Clonar el repositorio

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

Edita `.env` según tu entorno:

```env
VITE_API_URL=http://localhost:5000/api/v1
VITE_ENVIRONMENT=development
```

---

## 🔧 Variables de Entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `VITE_API_URL` | URL base del backend | `http://localhost:5000/api/v1` |
| `VITE_ENVIRONMENT` | Entorno (`development`/`production`) | `development` |
| `VITE_TMDB_TOKEN` | Token de TMDB para posters (opcional) | - |

> **Nota:** Las variables deben empezar con `VITE_` para ser accesibles en el navegador.

---

## 📜 Scripts Disponibles

```bash
# Desarrollo
pnpm dev              # Iniciar dev server con HMR
pnpm dev --port 3000 # Puerto personalizado

# Build
pnpm build            # Build de producción
pnpm preview          # Preview del build

# Calidad de código
pnpm lint             # ESLint
pnpm lint:fix         # ESLint con autofix

# Tests
pnpm test             # Tests en modo watch
pnpm test:run         # Tests una ejecución
pnpm test:coverage    # Tests con cobertura
```

---

## 💻 Desarrollo Local

El servidor de desarrollo de Vite configura automáticamente un proxy para `/api` hacia `localhost:5000`, evitando problemas de CORS.

```bash
# 1. Asegúrate de que el backend esté corriendo en puerto 5000
# cd ../backend && pnpm dev

# 2. Iniciar frontend
cd frontend
pnpm dev

# 3. Abrir http://localhost:5173
```

### Proxy配置 (vite.config.ts)

```typescript
server: {
  port: 5173,
  proxy: {
    "/api": {
      target: "http://localhost:5000",
      changeOrigin: true,
    },
  },
}
```

---

## 🐳 Docker

### Build de imagen

```bash
cd docker-fullstack-server
docker compose build frontend
```

### Levantar contenedor

```bash
docker compose up -d frontend
```

El contenedor servirá en `http://localhost:80`.

### Dockerfile Multi-Stage

1. **Stage 1 (builder)**: Compila React con Vite
2. **Stage 2 (runtime)**: Sirve con Nginx

```dockerfile
# Build args disponibles
ARG VITE_API_URL=/api/v1
ARG VITE_ENVIRONMENT=production
```

---

## 🧪 Tests

### Estructura

Los archivos de test van en la misma carpeta que los componentes:

```
src/
├── components/
│   ├── MovieList.tsx
│   ├── MovieList.test.tsx  ← Tests junto al componente
│   ├── MovieCard.tsx
│   ├── MovieCard.test.tsx
│   ├── Pagination.tsx
│   └── Pagination.test.tsx
└── test/
    └── setup.ts            ← Config global
```

### Configuración (vitest.config.ts)

```typescript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
```

### Ejecutar tests

```bash
# Modo interactivo (watch)
pnpm test

# Una ejecución
pnpm test:run

# Con cobertura
pnpm test:coverage
```

### Tests incluidos

| Componente | Tests |
|------------|-------|
| `MovieCard` | Renderizado de datos, formateo de moneda, colores de rating |
| `MovieList` | Estados loading/error, renderizado de cards, paginación |
| `Pagination` | Cálculo de páginas, botones habilitados/deshabilitados, callbacks |
| `moviesApi` | Mock de fetch, manejo de errores, estructura de respuesta |

---

## 🔌 API Endpoints

El frontend consume los siguientes endpoints del backend:

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/v1/movies` | Lista paginada de películas |
| `GET` | `/api/v1/movies?limit=10&offset=0` | Con paginación |
| `GET` | `/api/v1/movies/search?genre=Adventure` | Filtrar por género |
| `GET` | `/api/v1/movies/search?rating=PG` | Filtrar por rating |
| `GET` | `/api/v1/movies/stats` | Estadísticas del dataset |

### Respuesta esperada

```typescript
interface MovieListResponse {
  count: number;    // Items en esta página
  total: number;    // Total de items
  limit: number;    // Límite por página
  offset: number;   // Offset actual
  data: Movie[];    // Array de películas
}

interface Movie {
  movie_title: string;
  release_date: string;
  genre: string;
  rating: 'G' | 'PG' | 'PG-13' | 'R' | 'Not Rated';
  total_gross: number;
  adjusted_gross: number;
}
```

---

## 🏗 Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                      Browser (React App)                      │
│                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │  MovieList   │───▶│  moviesApi   │───▶│    Nginx     │  │
│  │  (State)     │    │  (Fetch)     │    │  (Proxy)    │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│         │                                        │           │
│         ▼                                        ▼           │
│  ┌──────────────┐                      ┌──────────────────┐  │
│  │  MovieCard   │                      │  Load Balancer    │  │
│  │  (Display)   │                      │  (Round Robin)    │  │
│  └──────────────┘                      └──────────────────┘  │
│         │                                        │           │
│         │                              ┌─────────┴─────────┐ │
│         │                              ▼                   ▼ │
│         │                      ┌────────────┐   ┌────────────┐│
│         │                      │  backend_1 │   │  backend_2 ││
│         │                      │  (FastAPI) │   │  (FastAPI) ││
│         │                      └────────────┘   └────────────┘│
└─────────┼────────────────────────────────────────────────────┘
          │
          ▼
    ┌───────────┐
    │  Pagination│
    │  (Nav)    │
    └───────────┘
```

---

## 📊 Flujo de Datos

```
User Action
     │
     ▼
MovieList (useEffect)
     │
     ▼
moviesAPI.getMovies(limit, offset)
     │
     ▼
fetch(BASE_URL + /movies)
     │
     ├── Success ──▶ setData ──▶ Render cards
     │
     └── Error ────▶ setError ──▶ Show error UI
```

---

## 🎨 Convenciones de Código

### Nomenclatura

- **Componentes**: PascalCase (`MovieList.tsx`)
- **Hooks**: camelCase con prefijo `use` (`useMovies.ts`)
- **Tests**: `*.test.{ts,tsx}`
- **Mocks**: `*.mock.{ts,tsx}`

### Imports

```typescript
// Relative paths para componentes locales
import MovieCard from './MovieCard';

// Alias para API
import { moviesAPI } from '../api/moviesApi';
```

---

## 🤝 Contribución

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/nueva-funcion`)
3. Commit tus cambios (`git commit -m 'feat: agregar nueva función'`)
4. Push a la rama (`git push origin feature/nueva-funcion`)
5. Abre un Pull Request

### Normas

- Ejecuta `pnpm test:run` antes de commitear
- Ejecuta `pnpm lint` para verificar estilo
- Agrega tests para nuevas funcionalidades
- Actualiza este README si agregas cambios significativos

---

## 📄 Licencia

MIT License - Ver archivo `LICENSE` en el repositorio raíz.

---

## 🔗 Enlaces

- [Disney Movies API - Backend](https://github.com/Christiano0407/docker-fullstack-server)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Vitest Documentation](https://vitest.dev)
- [Testing Library](https://testing-library.com)
