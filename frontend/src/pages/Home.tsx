/**
 * src/pages/Home.tsx
 * Landing page con Hero estilo streaming
 */
import { useState, useEffect } from 'react';
import { Hero } from '../components/Hero';
import Top5Grid from '../components/Top5Grid';
import Footer from '../components/Footer';
import type { Page } from '../App';
import type { Movie } from '../api/moviesApi';
import { moviesAPI } from '../api/moviesApi';
import '../css/App.css';

interface Props {
  onNavigate: (p: Page) => void;
}

const fmt = (n: number) =>
  n >= 1e9 ? `$${(n / 1e9).toFixed(1)}B` : n >= 1e6 ? `$${(n / 1e6).toFixed(1)}M` : `$${n.toLocaleString()}`;

const MARQUEE_ITEMS = [
  'Adventure', 'Comedy', 'Musical', 'Drama', 'Action',
  'Western', 'Horror', 'Romance', 'Documentary', 'Animation',
];

export function Home({ onNavigate }: Props) {
  const [heroMovies, setHeroMovies] = useState<Movie[]>([]);
  const [statsData, setStatsData] = useState<{
    total: number;
    genres: number;
    topGross: string;
    topTitle: string;
  } | null>(null);

  useEffect(() => {
    const fetchHeroMovies = async () => {
      try {
        const data = await moviesAPI.getMovies(100, 0);
        const topMovies = data.data
          .sort((a, b) => b.adjusted_gross - a.adjusted_gross)
          .slice(0, 10);
        setHeroMovies(topMovies);
      } catch (e) {
        console.error('Failed to load hero movies:', e);
      }
    };

    fetchHeroMovies();
  }, []);

  useEffect(() => {
    fetch('/api/v1/movies/stats')
      .then(r => r.json())
      .then(s => setStatsData({
        total: s.total_movies ?? 579,
        genres: s.genres?.length ?? 20,
        topGross: fmt(s.top_grossing?.adjusted_gross ?? 0),
        topTitle: s.top_grossing?.movie_title ?? '',
      }))
      .catch(() => {});
  }, []);

  const aboutStats = statsData ? [
    [statsData.total, 'Total Films', '1937 – 2016'],
    [statsData.genres, 'Genres', 'Classified'],
    [statsData.topGross, 'Top Gross', statsData.topTitle],
    [79, 'Years', 'of Production'],
  ] : [];

  const handleSelectMovie = (movie: Movie) => {
    console.log('Selected movie:', movie.movie_title);
  };

  return (
    <div className="wrapper__home">
      <Hero
        movies={heroMovies}
        onSelectMovie={handleSelectMovie}
      />

      <div className="home__items">
        <div className="home__items--slider">
          {
            [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((g, i) => (
              <span key={i} className="marquee-item">
                {g}
                <span className="marquee-dot">◆</span>
              </span>
            ))
          }
        </div>
      </div>

      <section className="home__moviesTop">
        <div className="home__moviesTop--container">
          <div className="moviesTop--text">
            <p className="eyebrow">Featured</p>
            <h2 className="section-title">Top Grossing</h2>
          </div>
          <button className="btn moviesTop--btn" onClick={() => onNavigate('catalog')}>
            Full Catalog
          </button>
        </div>
        <Top5Grid onNavigate={onNavigate} />
      </section>

      <div className="home__about">
        <div className="home__about--text">
          <p className="eyebrow">The Collection</p>
          <h2 className="about-title">
            About<br />The Archive
          </h2>
          <p className="about-paragraph">
            A comprehensive dataset spanning eight decades of Disney's cinematic output.
            From Snow White in 1937 to Rogue One in 2016 — every title documented with
            financial performance, genre classification, and MPAA ratings.
          </p>
        </div>

        <div className="home__about__stats">
          {
            aboutStats.map(([num, label, note], i) => (
              <div key={i}
                className="about-stat"
              >
                <div className="about-stat__value">{num}</div>
                <div className="about-stat__label">{label}</div>
                <div className="about-stat__note">{note}</div>
              </div>
            ))
          }
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
