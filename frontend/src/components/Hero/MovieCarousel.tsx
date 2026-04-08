/**
 * src/components/Hero/MovieCarousel.tsx
 * Horizontal scroll carousel de películas tipo Netflix
 */
import { useRef, useState } from 'react';
import type { Movie } from '../../api/moviesApi';
import './Hero.css';

interface MovieCarouselProps {
  movies: Movie[];
  currentIndex: number;
  onSelectMovie: (movie: Movie) => void;
}

export function MovieCarousel({ movies, currentIndex, onSelectMovie }: MovieCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    carouselRef.current.style.cursor = 'grabbing';
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="movie-carousel">
      <div className="movie-carousel__header">
        <h3 className="movie-carousel__title">Featured Films</h3>
        <button className="movie-carousel__link" onClick={() => onSelectMovie(movies[0])}>
          View All
          <svg viewBox="0 0 24 24" fill="currentColor" className="movie-carousel__arrow">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
        </button>
      </div>

      <div
        ref={carouselRef}
        className="movie-carousel__track"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {movies.map((movie, index) => {
          const isActive = index === currentIndex;
          const posterColors = [
            'linear-gradient(135deg, #1a237e 0%, #4a148c 100%)',
            'linear-gradient(135deg, #b71c1c 0%, #880e4f 100%)',
            'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)',
            'linear-gradient(135deg, #e65100 0%, #ff6f00 100%)',
            'linear-gradient(135deg, #0d47a1 0%, #1565c0 100%)',
            'linear-gradient(135deg, #4a148c 0%, #7b1fa2 100%)',
            'linear-gradient(135deg: #006064 0%, #00838f 100%)',
            'linear-gradient(135deg: #d84315 0%, #ff5722 100%)',
          ];
          const gradient = posterColors[index % posterColors.length];

          return (
            <div
              key={movie.movie_title}
              className={`movie-carousel__card ${isActive ? 'movie-carousel__card--active' : ''}`}
              onClick={() => onSelectMovie(movie)}
            >
              <div 
                className="movie-carousel__poster"
                style={{ background: gradient }}
              >
                <span className="movie-carousel__poster-title">
                  {movie.movie_title.length > 20 
                    ? movie.movie_title.substring(0, 20) + '...' 
                    : movie.movie_title}
                </span>
                <span className="movie-carousel__poster-year">
                  {movie.release_date.split('/').pop()}
                </span>
              </div>
              <div className="movie-carousel__info">
                <span className="movie-carousel__info-title">{movie.movie_title}</span>
                <span className="movie-carousel__info-meta">{movie.genre} · {movie.rating}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MovieCarousel;
