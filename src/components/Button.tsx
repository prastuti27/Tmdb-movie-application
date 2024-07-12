import React, { useState } from "react";
import axios from "axios";
import { AUTH_TOKEN } from "../constants";

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
        Authorization: `Bearer ${AUTH_TOKEN}`,
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
