import React, { useState } from "react";
import axios from "axios";

interface WatchlistButtonProps {
  movieId: number;
}

const WatchlistButton: React.FC<WatchlistButtonProps> = ({ movieId }) => {
  const [error, setError] = useState<string | null>(null);

  const addToWatchlist = async () => {
    const accountId = "{your_account_id}";
    const url = `https://api.themoviedb.org/3/account/${accountId}/watchlist`;
    const options = {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjI3MTRkMTkwMzUwYzY0MTE1YTk0NTFiZTc3Y2FjMCIsIm5iZiI6MTcyMDQwNTY2Mi4xMTg1NzgsInN1YiI6IjY2ODRlMDY4YTk1MjMzM2ZkMmQxYmE3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vuHABc-MJbUjhn3TKCLT5nXywNbi6m9-Qte-hEkJoqw",
        "Content-Type": "application/json;charset=utf-8",
      },
    };

    const body = {
      media_type: "movie",
      media_id: movieId,
      watchlist: true,
    };

    try {
      const response = await axios.post(url, body, options);
      console.log("Added to watchlist:", response.data);
    } catch (error) {
      setError("Failed to add to watchlist. Please try again later.");
    }
  };

  return <button onClick={addToWatchlist}>Add to Watchlist</button>;
};

export default WatchlistButton;
