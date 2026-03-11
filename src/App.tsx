import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './components/MovieCard';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import Logo from './components/Logo';

// TMDB API Configuration
const API_KEY = 'b4b5e8e8179ff65a73963c15f32fd07c';
const BASE_URL = 'https://api.themoviedb.org/3';

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}

export interface Genre {
  id: number;
  name: string;
}

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Fetch genres on mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
          params: { api_key: API_KEY }
        });
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
    fetchGenres();
  }, []);

  // Fetch movies
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let response;
        if (searchQuery) {
          response = await axios.get(`${BASE_URL}/search/movie`, {
            params: {
              api_key: API_KEY,
              query: searchQuery,
              page: currentPage,
              year: selectedYear || undefined,
            }
          });
        } else {
          response = await axios.get(`${BASE_URL}/discover/movie`, {
            params: {
              api_key: API_KEY,
              page: currentPage,
              with_genres: selectedGenre || undefined,
              primary_release_year: selectedYear || undefined,
              sort_by: sortBy,
            }
          });
        }
        setMovies(response.data.results);
        setTotalPages(Math.min(response.data.total_pages, 500)); // TMDB API limits to 500 pages
        setTotalResults(response.data.total_results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery, selectedGenre, selectedYear, sortBy, currentPage]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleGenreChange = (genreId: number | null) => {
    setSelectedGenre(genreId);
    setCurrentPage(1);
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPaginationRange = () => {
    const range: (number | string)[] = [];
    const delta = 2;

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      range.unshift('...');
    }
    if (currentPage + delta < totalPages - 1) {
      range.push('...');
    }

    range.unshift(1);
    if (totalPages > 1) range.push(totalPages);

    return range;
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="relative bg-gradient-to-r from-black via-gray-900 to-black border-b-4 border-gold sticky top-0 z-50 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 via-purple-500 to-pink-500 opacity-10 animate-rainbow-flow"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iZ29sZCIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="container mx-auto px-4 py-4 relative z-10">
          <div className="flex items-center justify-between mb-4">
            <Logo />
            <div className="text-right">
              <p className="text-gold text-sm font-semibold">Total Movies Available</p>
              <p className="text-white text-xl font-bold neon-glow">{totalResults.toLocaleString()}+</p>
            </div>
          </div>
          <SearchBar onSearch={handleSearch} />
        </div>
      </header>

      {/* Filters */}
      <FilterBar
        genres={genres}
        selectedGenre={selectedGenre}
        selectedYear={selectedYear}
        sortBy={sortBy}
        onGenreChange={handleGenreChange}
        onYearChange={handleYearChange}
        onSortChange={handleSortChange}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gold shadow-gold-glow"></div>
              <p className="text-gold mt-4 text-lg font-semibold">Loading movies...</p>
            </div>
          </div>
        ) : movies.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} genres={genres} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gradient-to-r from-gold to-yellow-600 text-black font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-gold-glow transition"
              >
                Previous
              </button>
              
              {getPaginationRange().map((page, index) => (
                typeof page === 'number' ? (
                  <button
                    key={index}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-lg transition ${
                      currentPage === page
                        ? 'bg-gradient-to-r from-gold to-yellow-600 text-black font-bold shadow-gold-glow'
                        : 'bg-gray-900 text-gold border border-gold/30 hover:bg-gray-800 hover:border-gold'
                    }`}
                  >
                    {page}
                  </button>
                ) : (
                  <span key={index} className="px-2 text-gold">
                    {page}
                  </span>
                )
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gradient-to-r from-gold to-yellow-600 text-black font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-gold-glow transition"
              >
                Next
              </button>
            </div>

            <p className="text-center text-gold mt-4 font-semibold">
              Page {currentPage} of {totalPages}
            </p>
          </>
        ) : (
          <div className="text-center text-white py-20">
            <p className="text-2xl">No movies found</p>
            <p className="text-gold mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-black via-gray-900 to-black border-t-4 border-gold mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-gold">
          <p className="text-lg font-bold text-white mb-2 neon-rainbow-text">EZIHE PREMIUM MOVIE CENTER</p>
          <p className="text-sm">Access to over 200,000+ movies from all years</p>
          <p className="text-xs mt-2 opacity-70">Data provided by The Movie Database (TMDB)</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
