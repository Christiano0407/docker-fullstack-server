/**
 * = src/components/MovieCard.tsx =
 */
import type { Movie } from "../api/moviesApi"; 

/**
 * = Heredamos Tipado de Movies / Props = 
 */
interface Props {
  movie: Movie; 
}

const RATING_COLOR: Record<string, string> = {
  G:    "#63c587",
  PG:    "#6093e4",
  "PG-13":    "#eabd70",
  R:    "#e65353",
  "Not Rated":    "#6e7990",
}

function formatConvertMoney(num: number): string {
  if (num >= 1_000_000_000) return `$${(num / 1_000_000_000).toFixed(1)}B`;
  if (num >= 1_000_000)     return `$${(num / 1_000_000).toFixed(1)}M`;
  return `$${num.toLocaleString()}`;
}

export default function MovieCard({ movie }: Props) {
  const ratingColor = RATING_COLOR[movie.rating] ?? `#6b7280`

  return (
    <article className="movie-card">
      <div className="card-header">
          <span className="genre-tag">{movie.genre}</span>
          <span className="rating-tag" style={{ background: ratingColor }} >{movie.rating}</span>
      </div>

      <h2 className="movie-title">{movie.movie_title}</h2>
      <p className="release-date">{movie.release_date}</p>

      <div className="gross-row">
        <div className="gross-item">
          <span className="gross-label">Total Gross</span>
          <span className="gross-value">{formatConvertMoney(movie.total_gross)}</span>
        </div>
        <div className="gross-divider" />
        <div className="gross-item">
          <span className="gross-label">Adjusted</span>
          <span className="gross-value adjusted">{formatConvertMoney(movie.adjusted_gross)}</span>
        </div>
      </div>
    </article>
  )
}