import Typography from "./Typography";
import Card from "./Card";
import Loader from "./Loader";
import ErrorMessage from "./Error";
import useApiCall from "../Hooks/useApiCall";

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {watchlist?.results.map((movie) => (
            <div key={movie.id}>
              <Card
                title={movie.title}
                image={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                description={movie.overview}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchlistPage;
