import React, { useState, useEffect } from "react";
import axios from "axios";
import Typography from "./Typography";
import Card from "./Card";

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
}

const Watchlist: React.FC = () => {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWatchlist = async () => {
      const accountId = "{your_account_id}";
      const url = `https://api.themoviedb.org/3/account/${accountId}/watchlist/movies`;
      const options = {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjI3MTRkMTkwMzUwYzY0MTE1YTk0NTFiZTc3Y2FjMCIsIm5iZiI6MTcyMDQwNTY2Mi4xMTg1NzgsInN1YiI6IjY2ODRlMDY4YTk1MjMzM2ZkMmQxYmE3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vuHABc-MJbUjhn3TKCLT5nXywNbi6m9-Qte-hEkJoqw",
        },
      };

      try {
        const response = await axios.get(url, options);
        setWatchlist(response.data.results);
      } catch (error) {
        setError("Error fetching watchlist. Please try again later.");
      }
    };

    fetchWatchlist();
  }, []);

  return (
    <div>
      <Typography variant="h2" content="My Watchlist" />
      {error && <p>{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {watchlist.map((movie) => (
          <div key={movie.id}>
            <Card
              title={movie.title}
              image={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              description={movie.overview}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
