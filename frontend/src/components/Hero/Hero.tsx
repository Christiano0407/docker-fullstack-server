/**
 * src/components/Hero/Hero.tsx
 * Hero section principal con slideshow automático
 */
import { useState, useEffect, useCallback } from 'react';
import { HeroSlide } from './HeroSlide';
import { MovieCarousel } from './MovieCarousel';
import type { Movie } from '../../api/moviesApi';
import './Hero.css';

interface HeroProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
}

const SLIDE_INTERVAL = 7000;

export function Hero({ movies, onSelectMovie }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  }, [movies.length]);

  useEffect(() => {
    if (movies.length === 0 || isPaused) return;

    const timer = setInterval(nextSlide, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [movies.length, isPaused, nextSlide]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), SLIDE_INTERVAL);
  };

  if (movies.length === 0) {
    return (
      <section className="hero">
        <div className="hero__loading">
          <div className="hero__loading-spinner" />
        </div>
      </section>
    );
  }

  const featuredMovies = movies.slice(0, 10);

  return (
    <section 
      className="hero" 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="hero__slides">
        {movies.slice(0, 5).map((movie, index) => (
          <HeroSlide
            key={movie.movie_title}
            movie={movie}
            isActive={index === currentIndex}
            onSelect={() => onSelectMovie(movie)}
          />
        ))}
      </div>

      <div className="hero__indicators">
        {movies.slice(0, 5).map((_, index) => (
          <button
            key={index}
            className={`hero__indicator ${index === currentIndex ? 'hero__indicator--active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="hero__nav">
        <button 
          className="hero__nav-btn"
          onClick={() => goToSlide((currentIndex - 1 + 5) % 5)}
          aria-label="Previous slide"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
        <button 
          className="hero__nav-btn"
          onClick={() => goToSlide((currentIndex + 1) % 5)}
          aria-label="Next slide"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
        </button>
      </div>

      <MovieCarousel
        movies={featuredMovies}
        currentIndex={currentIndex}
        onSelectMovie={(movie: Movie) => {
          const index = movies.findIndex(m => m.movie_title === movie.movie_title);
          if (index !== -1 && index < 5) goToSlide(index);
        }}
      />
    </section>
  );
}

export default Hero;
