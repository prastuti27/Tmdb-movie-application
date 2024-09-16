import React, { useState } from "react";
import MovieList from "./MovieList";
import WatchlistPage from "../../components/WatchlistPage";
import GenreSelector from "../../components/GenreSelector";

const Dashboard = () => {
  const [selectedGenre, setSelectedGenre] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const handleGenreSelect = (genreId: number, genreName: string) => {
    setSelectedGenre({ id: genreId, name: genreName });
  };

  return (
    <>
      <div className="px-10">
        <GenreSelector onGenreSelect={handleGenreSelect} />

        {selectedGenre ? (
          <MovieList
            apiEndpoint={`/discover/movie?with_genres=${selectedGenre.id}`}
            title={`${selectedGenre.name}`}
          />
        ) : (
          <>
            <MovieList
              apiEndpoint="/movie/popular?page=1"
              title="Popular Movies"
            />
            <MovieList
              apiEndpoint="/trending/movie/week"
              title="Trending Movies"
            />
            <MovieList
              apiEndpoint="/movie/upcoming?page=1"
              title="Upcoming Movies"
            />
            <MovieList
              apiEndpoint="/movie/top_rated?page=1"
              title="Toprated Movies"
            />
          </>
        )}

        <WatchlistPage />
      </div>
    </>
  );
};

export default Dashboard;
