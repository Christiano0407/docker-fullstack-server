/**
 * frontend/src/components/MovieCard.test.tsx
 * TDD — Unit tests para MovieCard
 *
 * Verifica que el componente renderiza correctamente
 */
import { describe, it, expect, beforeEach } from "vitest";
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

describe("MovieCard", () => {

  beforeEach(() => {
    render( <MovieCard movie={MOCK_MOVIE} />); 
  }); 

  it("Show the Movie Title", () => {
    expect(screen.getByText("The Lion King")).toBeTruthy(); 
  }); 

  it("Show the release date to the movie", () => {
    expect(screen.getByText("15/06/1994")).toBeTruthy(); 
  }); 

  it("Show the genre tot the movie", () => {
    expect(screen.getByText("Adventure")).toBeTruthy(); 
  }); 
  
  it("Shot the Genre to the movie", () => {
    expect(screen.getByText("G")).toBeTruthy(); 
  }); 

  it("Formatea el adjusted gross correctamente", () => {
  // 761640898 → $761.6M
  expect(screen.getByText("$761.6M")).toBeTruthy();
  });

}); 

describe("MovieCard - gross formatting", () => {
  it("Show in billions when surpasses 1B", () => {
    const movie: Movie = {
      ...MOCK_MOVIE,
      adjusted_gross: 5228953251,  // Snow White | 5.2B
    }; 
    render(<MovieCard movie={movie}/>); 
    expect(screen.getByText(/\$5\.2B/)).toBeTruthy();
  }); 

  it("Show the Rating with the Rating Color", () => {
    const { container } = render(<MovieCard movie={MOCK_MOVIE} />); 
    const badge = container.querySelector(".rating-tag"); 
    expect(badge).toBeTruthy();
    expect((badge as HTMLElement).getAttribute("style")).toContain("rgb(99, 197, 135)"); 
  }); 

}); 

