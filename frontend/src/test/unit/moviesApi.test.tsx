/**
 * frontend/tests/unit/moviesApi.test.ts
 * TDD — Unit tests para el cliente HTTP
 *
 * Mockea fetch — no llama al backend real.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { moviesAPI } from "../../../src/api/moviesApi";


// === Mocks Data Test ====================================
const MOCK_RESPONSE = {
  count:  2,
  total:  579,
  limit:  10,
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
  ],
};


// === Tests ====================================

describe(`moviesAPI.getMovies`, () => {

  let mockFetch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockFetch = vi.fn();
    vi.stubGlobal("fetch", mockFetch);
  })

  afterEach(() => {
    vi.unstubAllGlobals(); 
  })

  it("llama al endpoint correcto con params por defecto", async() => {
    mockFetch.mockResolvedValueOnce({
      ok: true, 
      json: async () => MOCK_RESPONSE,
    } as Response); 

    await moviesAPI.getMovies();
    
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/movies?limit=10&offset=0") 
    ); 
  }); 

  it("retorna la estructura correcta", async () => {
    mockFetch.mockResolvedValueOnce({
      ok:true,
      json: async () => MOCK_RESPONSE,
    } as Response); 

    const result = await moviesAPI.getMovies(); 

    expect(result.count).toBe(2); 
    expect(result.total).toBe(579); 
    expect(result.data).toHaveLength(2); 
    expect(result.data[0].movie_title).toBe("The Lion King"); 
  }); 

  it("respeta limit y offset personalizados", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true, 
      json: async () => MOCK_RESPONSE 
    } as Response);
    
    await moviesAPI.getMovies(5, 10); 

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("limit=5&offset=10")
    )
  }); 

  it("lanza error cuando la respuesta no es ok", async() => {
    mockFetch.mockResolvedValueOnce({
      ok:     false,
      status: 500,
    } as Response);

    await expect(moviesAPI.getMovies()).rejects.toThrow("Error: 500"); 
  }); 

  it("lanza error cuando fetch falla (red caída)", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));
 
    await expect(moviesAPI.getMovies()).rejects.toThrow("Network error");
  });
});