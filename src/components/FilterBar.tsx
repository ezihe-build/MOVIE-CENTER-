import { Genre } from '../App';

interface FilterBarProps {
  genres: Genre[];
  selectedGenre: number | null;
  selectedYear: string;
  sortBy: string;
  onGenreChange: (genreId: number | null) => void;
  onYearChange: (year: string) => void;
  onSortChange: (sort: string) => void;
}

export default function FilterBar({
  genres,
  selectedGenre,
  selectedYear,
  sortBy,
  onGenreChange,
  onYearChange,
  onSortChange,
}: FilterBarProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i);

  return (
    <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b-2 border-gold/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap gap-4">
          {/* Genre Filter */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-gold text-sm mb-2 font-semibold">Genre</label>
            <select
              value={selectedGenre || ''}
              onChange={(e) => onGenreChange(e.target.value ? Number(e.target.value) : null)}
              className="w-full px-3 py-2 bg-black border-2 border-gold/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
            >
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div className="flex-1 min-w-[150px]">
            <label className="block text-gold text-sm mb-2 font-semibold">Year</label>
            <select
              value={selectedYear}
              onChange={(e) => onYearChange(e.target.value)}
              className="w-full px-3 py-2 bg-black border-2 border-gold/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
            >
              <option value="">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-gold text-sm mb-2 font-semibold">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full px-3 py-2 bg-black border-2 border-gold/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
            >
              <option value="popularity.desc">Popularity (High to Low)</option>
              <option value="popularity.asc">Popularity (Low to High)</option>
              <option value="release_date.desc">Release Date (Newest)</option>
              <option value="release_date.asc">Release Date (Oldest)</option>
              <option value="vote_average.desc">Rating (High to Low)</option>
              <option value="vote_average.asc">Rating (Low to High)</option>
              <option value="title.asc">Title (A-Z)</option>
              <option value="title.desc">Title (Z-A)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
