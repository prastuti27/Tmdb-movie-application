import Typography from "./Typography";
import Card from "./Card";
import Loader from "./Loader";
import ErrorMessage from "./Error";
import useApiCall from "../Hooks/useApiCall";
import MovieCardFooter from "./MovieCardFooter";
import { useNavigate } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
}

const MovieTrendingList = () => {
  const {
    data: movies,
    error,
    loading,
  } = useApiCall<{ results: Movie[] }>("/movie/popular?page=1");

  const navigate = useNavigate();

  const handleCardClick = (id: string) => {
    navigate(`/movie/${id}`);
  };

  if (loading) return <Loader />;
  if (error) {
    return (
      <ErrorMessage message="Failed to load movies. Please try again later." />
    );
  }

  return (
    <div>
      <Typography variant="h2" content="Popular Movies" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {movies?.results.map((movie) => (
          <div key={movie.id} className="flex flex-col">
            <div onClick={() => handleCardClick(movie.id.toString())}>
              <Card
                title={movie.title}
                image={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                releaseDate={movie.release_date}
              />
            </div>
            <MovieCardFooter releaseDate={movie.release_date} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieTrendingList;
