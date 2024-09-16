import React, { useState } from "react";
import useApiCall from "../Hooks/useApiCall";

interface Genre {
  id: number;
  name: string;
}

interface GenreSelectorProps {
  onGenreSelect: (genreId: number, genreName: string) => void;
}

const GenreSelector = ({ onGenreSelect }: GenreSelectorProps) => {
  const { data, error, loading } = useApiCall<{ genres: Genre[] }>(
    "/genre/movie/list"
  );
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const genreId = Number(e.target.value);
    const genreName =
      data?.genres.find((genre) => genre.id === genreId)?.name || "";
    setSelectedGenre(genreId);
    onGenreSelect(genreId, genreName);
  };

  if (loading)
    return <p className="text-center text-gray-400">Loading genres...</p>;
  if (error)
    return <p className="text-center text-red-400">Error loading genres.</p>;

  return (
    <div className="w-full max-w-sm mx-auto  my-4">
      <select
        id="genre-select"
        className="w-full px-4 py-2 bg-gray-800 text-gray-300 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        value={selectedGenre ?? ""}
        onChange={handleGenreChange}
      >
        <option value="" disabled className="text-gray-500">
          Choose a genre
        </option>
        {data?.genres.map((genre) => (
          <option key={genre.id} value={genre.id} className="text-gray-300">
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreSelector;
