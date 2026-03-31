/**
 * Cliente TMDB — solo imágenes/posters
 * https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg
*/

//const TMDB_BASE  = "https://api.themoviedb.org/3";
const TMDB_IMG   = "https://image.tmdb.org/t/p";

// Tamaños disponibles de poster
// w185 → miniatura | w342 → card | w500 → detalle | original
export type PosterSize = "w185" | "w342" | "w500" | "original";


export function posterUrl ( 
  path: string | null,
  size: PosterSize = "w342",
): string | null {
  if (!path) return null; 
  return `${TMDB_IMG}/${size}${path}`; 
}