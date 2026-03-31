/**
 * src/api/tmdbApi.ts
 *  --url 'https://api.themoviedb.org/3/movie/11' \
 * Cliente TMDB — solo imágenes/posters
 * https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg
*/

import { posterUrl } from "../../utils/tmdbHelpers";

const TMDB_BASE  = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
//const TMDB_IMG   = "https://image.tmdb.org/t/p";

//  - Tamaños disponibles de poster - 
// - w185 → miniatura | w342 → card | w500 → detalle | original - 
export type PosterSize = "w185" | "w342" | "w500" | "original";

// = Tipado de Ts - Interfaces = 
export interface TMDBMovie {
  id:           number; 
  title:        string;
  poster_path:  string | null;
  release_date:  string; 
  overview:     string;  
}

// # ------------------ Search By Tittle Movie ------------------------ #
export async function searchPoster(title: string, year?:string): Promise<string | null> {
  if (!TMDB_TOKEN) return null; 

  try {

    const params = new URLSearchParams({query: title}); 
    if (year) params.append("year", year); 

    const response = await fetch(`${TMDB_BASE}/search/movie?${params}`, {
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
        "Content-type": "application/json",
      },
    }); 

    if(!response.ok) return null; 

    const data = await response.json(); 
    const movie: TMDBMovie | undefined = data.results?.[0]; 

    return posterUrl(movie?.poster_path ?? null); 

  } catch(err) {
    return `Error: ${err} | ${null}`; 
  }
}; 