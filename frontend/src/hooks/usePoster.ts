/**
 * src/hooks/usePoster.ts
 * Hook que obtiene el poster de TMDB con caché en memoria.
 *
 * - Primera vez: llama a TMDB y guarda el resultado
 * - Segunda vez: devuelve el resultado cacheado sin llamar de nuevo
 * - Methods + Regular Expressions -
 */

import { useEffect, useState } from "react";
import { searchPoster } from "../api/tmdb/tmdbAPI";

// ---- Caché simple en memoria — dura mientras la app está abierta ----
// ---- key: "título-año" → value: url | null ----

const cache = new Map<string, string | null>();

export function usePoster(title:string, releaseDate:string): string | null {
  const year = releaseDate?.split("/")?.[2] ?? "";
  const cacheKey = `${title} - ${year}`;  

  const [poster, setPoster] = useState<string | null>(() => {
    const cached = cache.get(cacheKey);
    return cached ?? null;
  });

  useEffect(() => {
    if (cache.has(cacheKey)) return;

    let cancelled = false;
    
    searchPoster(title, year).then((url) => {
      if(cancelled) return; 
      cache.set(cacheKey, url); 
      setPoster(url); 
    }); 

    return () => { cancelled = true;  }; 
    
   }, [cacheKey, title, year]); 

   return poster; 

}; 