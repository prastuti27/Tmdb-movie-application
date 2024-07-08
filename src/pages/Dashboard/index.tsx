import React, { useState, useEffect } from "react";
import axios from "axios";

const MovieTrendingList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const url =
        "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
      const options = {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjI3MTRkMTkwMzUwYzY0MTE1YTk0NTFiZTc3Y2FjMCIsIm5iZiI6MTcyMDQwNTY2Mi4xMTg1NzgsInN1YiI6IjY2ODRlMDY4YTk1MjMzM2ZkMmQxYmE3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vuHABc-MJbUjhn3TKCLT5nXywNbi6m9-Qte-hEkJoqw",
        },
      };

      try {
        const response = await axios.get(url, options);
        console.log(response.data);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h2>Trending Movies Today</h2>
    </div>
  );
};

export default MovieTrendingList;
