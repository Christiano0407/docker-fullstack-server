/**
 * = src/components/MovieList.tsx = 
 * - Cargar la lista de Movies - 
 */

import { useEffect, useState } from "react";
import { moviesAPI, type MovieListResponse } from "../api/moviesApi";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";

const LIMIT = 10; 

export default function MovieList() {
  const [data, setData] = useState<MovieListResponse | null >(null);
  const [offset, setOffset] = useState(0); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null >(null);   

  useEffect(() => {
    setLoading(true); 
    setError(null); 

    moviesAPI
      .getMovies(LIMIT, offset)
      .then(setData)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false)); 
  },[offset])

  if(loading) return (
    <div className="state-container">
      <div className="spinner"><span>Loading movies...</span></div>
    </div>
  )

  if(error) return (
    <div className="state-container error">
       <p className="error-icon">⚠</p>
      <p>{error}</p>
      <button className="retry-btn" onClick={() => setOffset(0)}>
        Retry
      </button>
    </div>
  )

  if (!data) return null; 

  return (
    <section className="movie__list--section">
      <div className="list-header">
        <h2 className="list-title">All Movies <span className="list-count">{data.total}</span></h2>
      </div>

      <div className="list-movieGrid">
        {data.data.map((movie) => (
          <MovieCard key={`${movie.movie_title} - ${movie.release_date}`} movie={movie}/>
        ))}
      </div>

      <Pagination
        offset={offset}
        limit={LIMIT}
        total={data.total}
        onPrev={ () => setOffset((m) => Math.max(0, m - LIMIT))}
        onNext={() => setOffset((m) => m + LIMIT)}
      />
    
    </section>
  )

}