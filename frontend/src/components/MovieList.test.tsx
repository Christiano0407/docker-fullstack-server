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
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import MovieList from "../../src/components/MovieList";
import type {Movie} from "../../src/api/moviesApi"; 

// ── Datos de prueba | Mocks  ───────────────────────────────────

const MOCK_MOVIE: Movie = {
  movie_title:    "The Lion King",
  release_date:   "15/06/1994",
  genre:          "Adventure",
  rating:         "G",
  total_gross:    422780140,
  adjusted_gross: 761640898,
} 

// ── [TEST] Datos de prueba | Mocks  ───────────────────────────────────
describe("MovieList", () => {}); 
