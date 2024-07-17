import React, { useState } from "react";
import axios from "axios";
import { AUTH_TOKEN } from "../constants";

interface WatchlistButtonProps {
  movieId?: string;
}

const WatchlistButton = ({ movieId }: WatchlistButtonProps) => {
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

  return (
    <div className="w-full flex justify-end">
      <button
        className="bg-gray-700 p-3 mr-5 mt-5 font-semibold rounded-2xl"
        onClick={addToWatchlist}
      >
        + Add to Watchlist
      </button>
    </div>
  );
};

export default WatchlistButton;
