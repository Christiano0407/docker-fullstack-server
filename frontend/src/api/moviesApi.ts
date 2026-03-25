/**
 * src/api/moviesApi.ts
 * Cliente HTTP — Disney Movies API
 */

const BASE_URL = import.meta.env.VITE_API_URL ?? "";

export interface Movie {
  movie_title: string; 
  release_date: string; 
  genre: string; 
  rating: string; 
  total_gross: number; 
  adjusted_gross: number; 
}

export interface MovieListResponse {
  count: number; 
  total: number; 
  limit: number; 
  offset: number; 
  data: Movie[]
}

export const moviesAPI = {
  getMovies: async (limit = 10, offset = 0): Promise<MovieListResponse> => {
    const response = await fetch(`${BASE_URL}/movies?limit=${limit}&offset=${offset}`); 
    if(!response.ok) throw new Error(`Error: ${response.status}`); 
    return response.json(); 
  }
}