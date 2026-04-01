/**
 * src/components/Top5Grid.tsx
 * 5 top-grossing films strip for the Home page
 */

import { useState, useEffect } from "react";
import { moviesAPI, type Movie } from "../api/moviesApi";
import { usePoster } from "../hooks/usePoster";
import type { Page } from "../App"; 

interface Props {
  onNavigate: (p: Page) => void;
}

// = Billions & Millions =
const fmt = (n: number) =>
  n >= 1e9 ? `$${(n / 1e9).toFixed(1)}B`
  : n >= 1e6 ? `$${(n / 1e6).toFixed(1)}M`
  : `$${n.toLocaleString()}`;

const yr = (d: string) => d?.split("/")?.pop() ?? "";

const Top5Card = ({ movie, rank, onNavigate }: {
  movie: Movie; rank: number; onNavigate: (p: Page) => void;
}) =>  {
  const poster = usePoster(movie.movie_title, movie.release_date);
  const [hovered, setHovered] = useState(false);
 
  return (
    <div
      onClick={() => onNavigate("catalog")}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "var(--surface-2)" : "var(--surface)",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        transition: "background 0.25s",
      }}
    >
      <span style={{
        position: "absolute", top: "0.8rem", left: "0.8rem",
        fontFamily: "var(--font-display)", fontSize: "1.4rem",
        color: "rgba(58, 152, 196, 0.4)", zIndex: 2, lineHeight: 1,
      }}>
        {String(rank).padStart(2, "0")}
      </span>
 
      <div style={{ overflow: "hidden" }}>
        {poster ? (
          <img
            src={poster}
            alt={movie.movie_title}
            loading="lazy"
            style={{
              width: "100%", aspectRatio: "2/3", objectFit: "cover",
              opacity: hovered ? 1 : 0.75,
              transform: hovered ? "scale(1.04)" : "scale(1)",
              transition: "opacity 0.3s, transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
              display: "block",
            }}
          />
        ) : (
          <div style={{
            width: "100%", aspectRatio: "2/3",
            background: "linear-gradient(160deg, var(--surface-2), var(--bg-mid))",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-display)", fontSize: "2.5rem",
            color: "var(--text-dim)",
          }}>✦</div>
        )}
      </div>
 
      <div className="topCardPlus" style={{ padding: "1rem" }}>
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: "0.58rem",
          letterSpacing: "0.18em", textTransform: "uppercase",
          color: "var(--gold-dim)", marginBottom: "0.3rem",
        }}>{movie.genre}</p>
        <h3 style={{
          fontFamily: "var(--font-body)", fontSize: "0.92rem",
          fontWeight: 600, color: "var(--cream)", lineHeight: 1.2,
        }}>{movie.movie_title}</h3>
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: "0.6rem",
          color: "var(--text-muted)", marginTop: "0.25rem",
        }}>{yr(movie.release_date)}</p>
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: "0.62rem",
          color: "var(--gold-dim)", marginTop: "0.5rem",
          paddingTop: "0.5rem", borderTop: "1px solid var(--border)",
        }}>{fmt(movie.adjusted_gross)} adj.</p>
      </div>
    </div>
  );
}

export default Top5Grid = ({onNavigate}: Props ) => {}