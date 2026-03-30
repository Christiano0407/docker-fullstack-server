/**
 * frontend/tests/unit/MovieList.test.tsx
 * TDD — Unit tests para MovieList
 *
 * Cubre:
 *  - Estado loading al montar
 *  - Renderiza tarjetas cuando la API responde
 *  - Muestra error cuando la API falla
 *  - Botón Retry reinicia el offset
 *  - Paginación — onNext y onPrev actualizan offset
 *  - Muestra total de películas en el header
 *  - No renderiza nada si data es null
 */
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import MovieList from "../../src/components/MovieList";

// ── Datos de prueba | Mocks  ───────────────────────────────────

vi.mock("../../src/api/moviesApi.ts", () => ({
  MoviesAPI: {
    getMovies: vi.fn(),
  },
})); 

import { moviesAPI } from "../../src/api/moviesApi";

function makeMockResponse(overrides = {}) {
  return {
    count:  3,
    total:  579,
    limit:  12,
    offset: 0,
    data: [
      {
        movie_title:    "The Lion King",
        release_date:   "15/06/1994",
        genre:          "Adventure",
        rating:         "G",
        total_gross:    422780140,
        adjusted_gross: 761640898,
      },
      {
        movie_title:    "Aladdin",
        release_date:   "11/11/1992",
        genre:          "Comedy",
        rating:         "G",
        total_gross:    217350219,
        adjusted_gross: 441969178,
      },
      {
        movie_title:    "Beauty and the Beast",
        release_date:   "13/11/1991",
        genre:          "Musical",
        rating:         "G",
        total_gross:    218951625,
        adjusted_gross: 363017667,
      },
    ],
    ...overrides,
  };
}

// ═══════════════════════════════════════
// SUITE 1 — Estado loading
// ═══════════════════════════════════════
describe("MovieList - State Loading Movies", () => {
  
  it("Open State Loading - Spinner", () => {
    vi.mocked(moviesAPI.getMovies).mockReturnValue(new Promise(() => {})); 
    const { container } = render(<MovieList />); 
    expect(container.querySelector(".spinner")).toBeTruthy();
  }); 

  it("Show Text when Loading...Data of Movies", () => {
    vi.mocked(moviesAPI.getMovies).mockReturnValue(new Promise (() => {})); 
    render(<MovieList />); 
    expect(screen.getByText(/Loading movies/i)).toBeTruthy(); 
  }); 
  
  
}); 


// ═══════════════════════════════════════
// SUITE 2 — Datos cargados correctamente
// ═══════════════════════════════════════

 
// ═══════════════════════════════════════
// SUITE 3 — Estado de error
// ═══════════════════════════════════════

// ═══════════════════════════════════════
// SUITE 4 — Paginación
// ═══════════════════════════════════════
 

// ── [TEST] Datos de prueba | Mocks  ───────────────────────────────────
describe("MovieList", () => {}); 
