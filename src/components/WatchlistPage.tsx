import Typography from "./Typography";
import Card from "./Card";
import Loader from "./Loader";
import ErrorMessage from "./Error";
import useApiCall from "../Hooks/useApiCall";
import MovieCardFooter from "./MovieCardFooter";

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
}

const WatchlistPage = () => {
  const accountId = "{your_account_id}";
  const {
    data: watchlist,
    error,
    loading,
  } = useApiCall<{ results: Movie[] }>(
    `/account/${accountId}/watchlist/movies`
  );

  if (loading) return <Loader />;
  if (error)
    return (
      <ErrorMessage message="Failed to load movies. Please try again later." />
    );

  return (
    <div>
      <Typography variant="h2" content="My Watchlist" />
      {error && <p>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {watchlist?.results.map((movie) => (
            <div key={movie.id} className="flex flex-col">
              <Card
                title={movie.title}
                image={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                releaseDate={movie.release_date}
              />
              <MovieCardFooter releaseDate={movie.release_date} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchlistPage;
