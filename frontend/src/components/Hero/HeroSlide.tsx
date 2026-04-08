/**
 * src/components/Hero/HeroSlide.tsx
 * Hero slide con backdrop, overlay y contenido estilo streaming
 */
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import type { Movie } from '../../api/moviesApi';
import './Hero.css';

interface HeroSlideProps {
  movie: Movie;
  isActive: boolean;
  onSelect: () => void;
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

const getYear = (dateStr: string): string => {
  const parts = dateStr.split('/');
  return parts[2] || '';
};

export function HeroSlide({ movie, isActive, onSelect }: HeroSlideProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!contentRef.current || !imageRef.current) return;

    if (isActive) {
      setImageLoaded(false);
      gsap.set(contentRef.current, { opacity: 0, x: -60 });
      gsap.set(imageRef.current, { scale: 1.15 });

      const tl = gsap.timeline();
      tl.to(imageRef.current, {
        scale: 1,
        duration: 1.5,
        ease: 'power2.out'
      })
      .to(contentRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power3.out'
      }, '-=0.8');
    } else {
      gsap.killTweensOf([contentRef.current, imageRef.current]);
      gsap.set(contentRef.current, { opacity: 0 });
      gsap.set(imageRef.current, { scale: 1.05 });
    }
  }, [isActive]);

  const backdropUrl = `${IMAGE_BASE_URL}/k3j9J9mAH8NOGzN9z4YUxS8qT8.jpg`;

  return (
    <div className={`hero-slide ${isActive ? 'hero-slide--active' : ''}`}>
      <div 
        ref={imageRef}
        className="hero-slide__backdrop"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        {!imageLoaded && <div className="hero-slide__skeleton" />}
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
