/**
 * src/components/Hero/HeroSlide.tsx
 * Hero slide con backdrop, overlay y contenido estilo streaming
 */
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { Movie } from '../../api/moviesApi';
import './Hero.css';

interface HeroSlideProps {
  movie: Movie;
  isActive: boolean;
  onSelect: () => void;
}

const getYear = (dateStr: string): string => {
  const parts = dateStr.split('/');
  return parts[2] || '';
};

const GENRE_COLORS: Record<string, { from: string; to: string }> = {
  Adventure: { from: '#1a237e', to: '#4a148c' },
  Comedy: { from: '#e65100', to: '#ff6f00' },
  Musical: { from: '#880e4f', to: '#c2185b' },
  Drama: { from: '#0d47a1', to: '#1565c0' },
  Action: { from: '#b71c1c', to: '#d32f2f' },
  Western: { from: '#795548', to: '#a1887f' },
  Horror: { from: '#212121', to: '#424242' },
  Romance: { from: '#880e4f', to: '#f06292' },
  Documentary: { from: '#263238', to: '#455a64' },
  Animation: { from: '#1565c0', to: '#42a5f5' },
};

const getGenreGradient = (genre: string): { from: string; to: string } => {
  return GENRE_COLORS[genre] || { from: '#1a237e', to: '#0d47a1' };
};

const BACKDROP_IMAGES = [
  'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&q=80',
  'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&q=80',
  'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1920&q=80',
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&q=80',
  'https://images.unsplash.com/photo-1594909122845-11baa439b4bf?w=1920&q=80',
];

export function HeroSlide({ movie, isActive, onSelect }: HeroSlideProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gradientColors = getGenreGradient(movie.genre);
  const backdropImage = BACKDROP_IMAGES[Math.abs(movie.movie_title.charCodeAt(0)) % BACKDROP_IMAGES.length];

  useEffect(() => {
    if (!contentRef.current || !backdropRef.current) return;

    if (isActive) {
      gsap.set(contentRef.current, { opacity: 0, x: -60 });
      gsap.set(backdropRef.current, { scale: 1.1, opacity: 0.5 });

      const tl = gsap.timeline();
      tl.to(backdropRef.current, {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out'
      })
      .to(contentRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.6');
    } else {
      gsap.killTweensOf([contentRef.current, backdropRef.current]);
      gsap.set(contentRef.current, { opacity: 0 });
      gsap.set(backdropRef.current, { scale: 1.05 });
    }
  }, [isActive]);

  return (
    <div 
      ref={containerRef}
      className={`hero-slide ${isActive ? 'hero-slide--active' : ''}`}
    >
      <div 
        ref={backdropRef}
        className="hero-slide__backdrop"
        style={{
          backgroundImage: `url(${backdropImage})`,
        }}
      >
        <div 
          className="hero-slide__gradient-overlay"
          style={{
            background: `linear-gradient(135deg, ${gradientColors.from} 0%, ${gradientColors.to} 100%)`,
            opacity: 0.7,
          }}
        />
      </div>

      <div className="hero-slide__overlay" />

      <div ref={contentRef} className="hero-slide__content">
        <div className="hero-slide__info">
          <p className="hero-slide__collection">
            <span className="hero-slide__collection-dot" />
            Disney Cinema Archive
          </p>

          <h1 className="hero-slide__title">{movie.movie_title}</h1>

          <div className="hero-slide__meta">
            <span className="hero-slide__rating">{movie.rating}</span>
            <span className="hero-slide__year">{getYear(movie.release_date)}</span>
            <span className="hero-slide__genre">{movie.genre}</span>
          </div>

          <p className="hero-slide__description">
            Eight decades of cinematic magic. From timeless classics to modern masterpieces.
          </p>

          <div className="hero-slide__stats">
            <div className="hero-slide__stat">
              <span className="hero-slide__stat-value">${(movie.total_gross / 1e6).toFixed(0)}M</span>
              <span className="hero-slide__stat-label">Box Office</span>
            </div>
            <div className="hero-slide__stat">
              <span className="hero-slide__stat-value">${(movie.adjusted_gross / 1e9).toFixed(1)}B</span>
              <span className="hero-slide__stat-label">Adjusted</span>
            </div>
          </div>

          <div className="hero-slide__actions">
            <button className="hero-btn hero-btn--play" onClick={onSelect}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="hero-btn__icon">
                <path d="M8 5v14l11-7z"/>
              </svg>
              Play
            </button>
            <button className="hero-btn hero-btn--list">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="hero-btn__icon">
                <path d="M12 4v16m8-8H4"/>
              </svg>
              My List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSlide;
