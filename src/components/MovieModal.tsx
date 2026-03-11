import { useEffect, useState } from 'react';
import axios from 'axios';
import { Movie, Genre } from '../App';

interface MovieModalProps {
  movie: Movie;
  genres: Genre[];
  onClose: () => void;
}

interface MovieDetails {
  runtime: number;
  budget: number;
  revenue: number;
  status: string;
  homepage: string;
  production_companies: { name: string }[];
}

interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

const API_KEY = 'b4b5e8e8179ff65a73963c15f32fd07c';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export default function MovieModal({ movie, genres, onClose }: MovieModalProps) {
  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [showTrailer, setShowTrailer] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [detailsResponse, videosResponse] = await Promise.all([
          axios.get(`${BASE_URL}/movie/${movie.id}`, {
            params: { api_key: API_KEY }
          }),
          axios.get(`${BASE_URL}/movie/${movie.id}/videos`, {
            params: { api_key: API_KEY }
          })
        ]);
        setDetails(detailsResponse.data);
        setVideos(videosResponse.data.results || []);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [movie.id]);

  const backdropUrl = movie.backdrop_path
    ? `${IMAGE_BASE_URL}/w1280${movie.backdrop_path}`
    : `${IMAGE_BASE_URL}/w1280${movie.poster_path}`;

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750/1a1a1a/666666?text=No+Poster';

  const movieGenres = movie.genre_ids
    .map(id => genres.find(g => g.id === id)?.name)
    .filter(Boolean);

  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  const trailer = videos.find(v => v.type === 'Trailer' && v.site === 'YouTube') || 
                  videos.find(v => v.site === 'YouTube');

  const handleDownload = () => {
    alert(`Download initiated for "${movie.title}"!\n\nNote: This is a demo. In a production environment, this would connect to legitimate download sources or streaming services.`);
  };

  const handleWatchTrailer = () => {
    if (trailer) {
      setShowTrailer(true);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (showTrailer && trailer) {
    return (
      <div
        className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 overflow-y-auto"
        onClick={() => setShowTrailer(false)}
      >
        <div className="min-h-screen px-4 py-8 flex items-center justify-center">
          <div className="w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={() => setShowTrailer(false)}
              className="mb-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* YouTube Player */}
            <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden shadow-2xl">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                title={trailer.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="mt-4 text-center">
              <h3 className="text-white text-2xl font-bold">{movie.title}</h3>
              <p className="text-gray-400">{trailer.name}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="min-h-screen px-4 py-8 flex items-center justify-center">
        <div className="bg-gray-900 rounded-xl max-w-4xl w-full overflow-hidden shadow-2xl relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Backdrop Image */}
          <div className="relative h-64 md:h-96 overflow-hidden">
            <img
              src={backdropUrl}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="relative px-6 pb-6 -mt-32">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Poster */}
              <div className="flex-shrink-0">
                <img
                  src={posterUrl}
                  alt={movie.title}
                  className="w-48 rounded-lg shadow-2xl"
                />
              </div>

              {/* Details */}
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {movie.title}
                </h2>
                
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-white font-semibold">{movie.vote_average.toFixed(1)}</span>
                    <span className="text-gray-400 text-sm">({movie.vote_count.toLocaleString()} votes)</span>
                  </div>
                  <span className="text-purple-300">{year}</span>
                  {!loading && details?.runtime && (
                    <span className="text-gray-400">{details.runtime} min</span>
                  )}
                </div>

                {/* Genres */}
                {movieGenres.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {movieGenres.map((genre, index) => (
                      <span
                        key={index}
                        className="bg-purple-900/50 text-purple-300 px-3 py-1 rounded-full text-sm"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                )}

                {/* Overview */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Overview</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {movie.overview || 'No overview available.'}
                  </p>
                </div>

                {/* Additional Info */}
                {!loading && details && (
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {details.status && (
                      <div>
                        <p className="text-gray-400 text-sm">Status</p>
                        <p className="text-white">{details.status}</p>
                      </div>
                    )}
                    {details.production_companies && details.production_companies.length > 0 && (
                      <div>
                        <p className="text-gray-400 text-sm">Production</p>
                        <p className="text-white">{details.production_companies[0].name}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {trailer && (
                    <button
                      onClick={handleWatchTrailer}
                      className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-3 transition shadow-lg shadow-red-500/50 hover:shadow-red-500/70"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                      Watch Trailer
                    </button>
                  )}
                  <button
                    onClick={handleDownload}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-3 transition shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Movie
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
