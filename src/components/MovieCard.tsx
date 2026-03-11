import { useState } from 'react';
import { Movie, Genre } from '../App';
import MovieModal from './MovieModal';

interface MovieCardProps {
  movie: Movie;
  genres: Genre[];
}

export default function MovieCard({ movie, genres }: MovieCardProps) {
  const [showModal, setShowModal] = useState(false);
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
  
  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750/1a1a1a/666666?text=No+Poster';

  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  
  const movieGenres = movie.genre_ids
    .map(id => genres.find(g => g.id === id)?.name)
    .filter(Boolean)
    .slice(0, 2);

  return (
    <>
      <div
        className="group relative bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-gold/40 transition-all duration-300 cursor-pointer transform hover:scale-105 border-2 border-gold/20 hover:border-gold"
        onClick={() => setShowModal(true)}
      >
        {/* Poster Image */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <button className="w-full bg-gradient-to-r from-gold to-yellow-600 hover:shadow-gold-glow text-black py-2 rounded-lg font-bold flex items-center justify-center gap-2 transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                View Details
              </button>
            </div>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-white text-sm font-semibold">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Movie Info */}
        <div className="p-3">
          <h3 className="text-white font-semibold text-sm line-clamp-2 mb-1">
            {movie.title}
          </h3>
          <p className="text-gold text-xs mb-2 font-semibold">{year}</p>
          {movieGenres.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {movieGenres.map((genre, index) => (
                <span
                  key={index}
                  className="text-xs bg-gold/20 text-gold border border-gold/40 px-2 py-0.5 rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <MovieModal
          movie={movie}
          genres={genres}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
