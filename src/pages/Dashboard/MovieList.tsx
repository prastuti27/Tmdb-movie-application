import Typography from "../../components/Typography";
import Card from "../../components/Card";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/Error";
import useApiCall from "../../Hooks/useApiCall";
import MovieCardFooter from "../../components/MovieCardFooter";
import { useNavigate } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

interface MovieListProps {
  apiEndpoint: string;
  title: string;
}

const MovieList = ({ apiEndpoint, title }: MovieListProps) => {
  const {
    data: movies,
    error,
    loading,
  } = useApiCall<{ results: Movie[] }>(apiEndpoint);

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
      <Typography variant="h2" content={title} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {movies?.results.map((movie) => (
          <div key={movie.id} className="flex flex-col">
            <div onClick={() => handleCardClick(movie.id.toString())}>
              <Card
                title={movie.title}
                image={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                releaseDate={movie.release_date}
                vote_average={movie.vote_average}
              />
            </div>
            <MovieCardFooter
              releaseDate={movie.release_date}
              movieId={movie.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
