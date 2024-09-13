import MovieList from "./MovieList";
import WatchlistPage from "../../components/WatchlistPage";

const Dashboard = () => {
  return (
    <>
      <div className="px-10">
        <MovieList apiEndpoint="/movie/popular?page=1" title="Popular Movies" />
        <MovieList apiEndpoint="/trending/movie/week" title="Trending Movies" />
        <MovieList
          apiEndpoint="/movie/upcoming?page=1"
          title="Upcoming Movies"
        />

        <MovieList
          apiEndpoint="/movie/top_rated?page=1"
          title="Toprated Movies"
        />
        <WatchlistPage />
      </div>
    </>
  );
};

export default Dashboard;
