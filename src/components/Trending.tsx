import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Typography from "./Typography";
import Card from "./Card";
import WatchlistButton from "./Button";

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
}

const MovieTrendingList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      const url = "https://api.themoviedb.org/3/movie/popular?page=1";

      const options = {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjI3MTRkMTkwMzUwYzY0MTE1YTk0NTFiZTc3Y2FjMCIsIm5iZiI6MTcyMDQwNTY2Mi4xMTg1NzgsInN1YiI6IjY2ODRlMDY4YTk1MjMzM2ZkMmQxYmE3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vuHABc-MJbUjhn3TKCLT5nXywNbi6m9-Qte-hEkJoqw",
        },
      };

      try {
        const response = await axios.get(url, options);
        setMovies(response.data.results);
      } catch (error) {
        setError("Failed to fetch movies. Please try again later.");
      }
    };

    fetchMovies();
  }, []);

  const handleCardClick = (id: string) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div>
      <Typography variant="h2" content="Trending Movies" />
      {error && <p>{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => handleCardClick(movie.id.toString())}
          >
            <Card
              title={movie.title}
              image={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              description={movie.overview}
            />
            <WatchlistButton movieId={movie.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieTrendingList;
