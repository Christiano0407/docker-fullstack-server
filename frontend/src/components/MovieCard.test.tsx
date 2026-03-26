/**
 * frontend/tests/unit/MovieCard.test.tsx
 * TDD — Unit tests para MovieCard
 *
 * Verifica que el componente renderiza correctamente
 * con los datos de tu API. No llama a TMDB (mockeado).
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import MovieCard from "../../src/components/MovieCard";
import type { Movie } from "../../src/api/moviesApi";

// ── Mock de usePoster — no llamamos a TMDB en tests ──


// ── Datos de prueba | Mocks  ───────────────────────────────────
const MOCK_MOVIE: Movie = {
  movie_title:    "The Lion King",
  release_date:   "15/06/1994",
  genre:          "Adventure",
  rating:         "G",
  total_gross:    422780140,
  adjusted_gross: 761640898,
}

// === Tests =============================================