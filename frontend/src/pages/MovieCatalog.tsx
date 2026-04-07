/**
 * src/pages/MovieCatalog.tsx
 * Full movie catalog with filters, search, and sorting
 */
import { useState, useEffect, useCallback } from "react";
import { moviesAPI, type Movie } from "../api/moviesApi";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";

const LIMIT = 12;
const ALL_GENRES = [
  "All", "Adventure", "Comedy", "Musical", "Drama", "Action",
  "Western", "Horror", "Romance", "Documentary", "Animation",
] as const;

const SORT_OPTIONS = [
  { value: "title-asc", label: "Title A-Z" },
  { value: "title-desc", label: "Title Z-A" },
  { value: "date-asc", label: "Oldest First" },
  { value: "date-desc", label: "Newest First" },
  { value: "gross-desc", label: "Highest Gross" },
  { value: "gross-asc", label: "Lowest Gross" },
];

const yr = (d: string) => d?.split("/")?.pop() ?? "";

export default function MovieCatalog() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [sortBy, setSortBy] = useState("date-desc");

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await moviesAPI.getMovies(100, 0);
      setMovies(data.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load movies");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const filtered = movies
    .filter((m) => {
      const matchSearch = m.movie_title.toLowerCase().includes(search.toLowerCase());
      const matchGenre = genre === "All" || m.genre === genre;
      return matchSearch && matchGenre;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "title-asc": return a.movie_title.localeCompare(b.movie_title);
        case "title-desc": return b.movie_title.localeCompare(a.movie_title);
        case "date-asc": return yr(a.release_date).localeCompare(yr(b.release_date));
        case "date-desc": return yr(b.release_date).localeCompare(yr(a.release_date));
        case "gross-desc": return b.adjusted_gross - a.adjusted_gross;
        case "gross-asc": return a.adjusted_gross - b.adjusted_gross;
        default: return 0;
      }
    });

  const paginated = filtered.slice(offset, offset + LIMIT);
  const displayCount = filtered.length;

  return (
    <div className="wrapper__catalog">
      <section className="catalog__header">
        <div className="catalog__header--content">
          <p className="eyebrow">Collection</p>
          <h1 className="catalog__title">Movie Catalog</h1>
          <p className="catalog__subtitle">
            Browse the complete archive of Disney theatrical releases
          </p>
        </div>
        <div className="catalog__header--decoration" />
      </section>

      <section className="catalog__filters">
        <div className="filter__search">
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setOffset(0); }}
            className="search-input"
          />
        </div>
        
        <div className="filter__row">
          <div className="filter__genres">
            {ALL_GENRES.map((g) => (
              <button
                key={g}
                className={`genre-btn ${genre === g ? "active" : ""}`}
                onClick={() => { setGenre(g); setOffset(0); }}
              >
                {g}
              </button>
            ))}
          </div>
          
          <div className="filter__sort">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="catalog__results">
        <div className="results__header">
          <span className="results__count">
            {displayCount} {displayCount === 1 ? "movie" : "movies"}
            {search && ` matching "${search}"`}
            {genre !== "All" && ` in ${genre}`}
          </span>
        </div>

        {loading ? (
          <div className="catalog__loading">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="skeleton-card">
                <div className="skeleton-poster" />
                <div className="skeleton-line" />
                <div className="skeleton-line short" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="catalog__error">
            <p>⚠ {error}</p>
            <button className="retry-btn" onClick={fetchMovies}>Retry</button>
          </div>
        ) : paginated.length === 0 ? (
          <div className="catalog__empty">
            <p>No movies found matching your criteria</p>
            <button className="btn btn--outline" onClick={() => { setSearch(""); setGenre("All"); }}>
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="catalog__grid">
              {paginated.map((movie) => (
                <MovieCard key={`${movie.movie_title}-${movie.release_date}`} movie={movie} />
              ))}
            </div>
            
            <Pagination
              offset={offset}
              limit={LIMIT}
              total={displayCount}
              onPrev={() => setOffset((o) => Math.max(0, o - LIMIT))}
              onNext={() => setOffset((o) => o + LIMIT)}
            />
          </>
        )}
      </section>

      <Footer />
    </div>
  );
}
