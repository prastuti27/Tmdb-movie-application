import Typography from "./Typography";
import Card from "./Card";
import useApiCall from "../Hooks/useApiCall";
import Loader from "./Loader";
import ErrorMessage from "./Error";
import { useNavigate } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
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
  if (error)
    return (
      <ErrorMessage message="Failed to load movies. Please try again later." />
    );

  return (
    <div>
      <Typography variant="h2" content="Popular Movies" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies?.results.map((movie) => (
          <div
            key={movie.id}
            onClick={() => handleCardClick(movie.id.toString())}
          >
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

export default MovieTrendingList;
