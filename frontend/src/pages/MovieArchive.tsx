/**
 * src/pages/MovieArchive.tsx
 * Historical archive view - tabular data with export
 */
import { useState, useEffect, useCallback } from "react";
import { moviesAPI, type Movie } from "../api/moviesApi";
import Footer from "../components/Footer";
import type { Page } from "../App";

interface Props {
  onNavigate: (p: Page) => void;
}

const fmt = (n: number) =>
  n >= 1e9 ? `$${(n / 1e9).toFixed(1)}B`
  : n >= 1e6 ? `$${(n / 1e6).toFixed(1)}M`
  : `$${n.toLocaleString()}`;

const yr = (d: string) => d?.split("/")?.pop() ?? "";



export default function MovieArchive({ onNavigate: _onNavigate }: Props) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<keyof Movie>("release_date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    try {
      const data = await moviesAPI.getMovies(200, 0);
      setMovies(data.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load archive");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMovies(); }, [fetchMovies]);

  const sorted = [...movies].sort((a, b) => {
    let cmp = 0;
    if (sortField === "movie_title") cmp = a.movie_title.localeCompare(b.movie_title);
    else if (sortField === "release_date") cmp = yr(a.release_date).localeCompare(yr(b.release_date));
    else if (sortField === "genre") cmp = a.genre.localeCompare(b.genre);
    else if (sortField === "total_gross") cmp = a.total_gross - b.total_gross;
    else if (sortField === "adjusted_gross") cmp = a.adjusted_gross - b.adjusted_gross;
    return sortDir === "asc" ? cmp : -cmp;
  });

  const handleSort = (field: keyof Movie) => {
    if (sortField === field) setSortDir((d) => d === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("desc"); }
  };

  const exportCSV = () => {
    const headers = ["Title", "Release Date", "Genre", "Rating", "Total Gross", "Adjusted Gross"];
    const rows = sorted.map((m) => [
      m.movie_title, m.release_date, m.genre, m.rating,
      m.total_gross, m.adjusted_gross,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "disney-archive.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const SortIcon = ({ field }: { field: keyof Movie }) => (
    <span style={{ opacity: sortField === field ? 1 : 0.3, marginLeft: "0.3rem" }}>
      {sortField === field ? (sortDir === "asc" ? "▲" : "▼") : "◇"}
    </span>
  );

  return (
    <div className="wrapper__archive">
      <section className="archive__header">
        <div className="archive__header--content">
          <p className="eyebrow">Historical Records</p>
          <h1 className="archive__title">Movie Archive</h1>
          <p className="archive__subtitle">
            Complete dataset of Disney theatrical releases · {movies.length} films
          </p>
        </div>
        <div className="archive__header--actions">
          <button className="btn btn--outline" onClick={exportCSV}>
            Export CSV
          </button>
        </div>
      </section>

      <section className="archive__table-section">
        {loading ? (
          <div className="archive__loading">
            <div className="table-skeleton">
              {Array(10).fill(0).map((_, i) => (
                <div key={i} className="skeleton-row" />
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="archive__error">
            <p>⚠ {error}</p>
            <button className="retry-btn" onClick={fetchMovies}>Retry</button>
          </div>
        ) : (
          <div className="archive__table-wrapper">
            <table className="archive__table">
              <thead>
                <tr>
                  <th onClick={() => handleSort("movie_title")}>
                    Title <SortIcon field="movie_title" />
                  </th>
                  <th onClick={() => handleSort("release_date")} style={{ width: "10rem" }}>
                    Year <SortIcon field="release_date" />
                  </th>
                  <th onClick={() => handleSort("genre")}>
                    Genre <SortIcon field="genre" />
                  </th>
                  <th onClick={() => handleSort("total_gross")} style={{ textAlign: "right" }}>
                    Gross <SortIcon field="total_gross" />
                  </th>
                  <th onClick={() => handleSort("adjusted_gross")} style={{ textAlign: "right" }}>
                    Adj. Gross <SortIcon field="adjusted_gross" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((movie, idx) => (
                  <tr
                    key={`${movie.movie_title}-${movie.release_date}`}
                    className={`archive__row ${expanded === movie.movie_title ? "expanded" : ""}`}
                    onClick={() => setExpanded(expanded === movie.movie_title ? null : movie.movie_title)}
                  >
                    <td className="cell__title">
                      <span className="row-num">{String(idx + 1).padStart(3, "0")}</span>
                      {movie.movie_title}
                    </td>
                    <td className="cell__year">{yr(movie.release_date)}</td>
                    <td className="cell__genre">{movie.genre}</td>
                    <td className="cell__gross" style={{ textAlign: "right" }}>
                      {fmt(movie.total_gross)}
                    </td>
                    <td className="cell__gross cell__gross--adj" style={{ textAlign: "right" }}>
                      {fmt(movie.adjusted_gross)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
