import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=1b2714d190350c64115a9451be77cac0`;
      const options = {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjI3MTRkMTkwMzUwYzY0MTE1YTk0NTFiZTc3Y2FjMCIsIm5iZiI6MTcyMDQwNTY2Mi4xMTg1NzgsInN1YiI6IjY2ODRlMDY4YTk1MjMzM2ZkMmQxYmE3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vuHABc-MJbUjhn3TKCLT5nXywNbi6m9-Qte-hEkJoqw",
        },
      };

      try {
        const response = await axios.get(url, options);
        setMovieDetails(response.data);
      } catch (error) {
        setError("Failed to fetch movies. Please try again later.");
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{movieDetails.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`}
        alt={movieDetails.title}
      />
      <p>{movieDetails.overview}</p>
      <ul>
        <li>
          <strong>Original Title:</strong> {movieDetails.original_title}
        </li>
        <li>
          <strong>Language:</strong> {movieDetails.original_language}
        </li>
        <li>
          <strong>Release Date:</strong> {movieDetails.release_date}
        </li>
        <li>
          <strong>Popularity:</strong> {movieDetails.popularity}
        </li>
        <li>
          <strong>Vote Average:</strong> {movieDetails.vote_average}
        </li>
        <li>
          <strong>Vote Count:</strong> {movieDetails.vote_count}
        </li>
        <li>
          <strong>Genres:</strong> {movieDetails.genre_ids + ", "}
        </li>
      </ul>
      <img
        src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
        alt={movieDetails.title}
      />
    </div>
  );
};

export default MovieDetails;
