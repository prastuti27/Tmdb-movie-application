import { useLocation, useNavigate } from "react-router-dom";
import Card from "../../components/Card";

interface MovieResult {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
}

const SearchList = () => {
  const location = useLocation();
  const results =
    (location.state as { results: MovieResult[] } | undefined)?.results || [];
  const navigate = useNavigate();

  const handleCardClick = (id: string) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {results.map((movie) => (
        <div
          key={movie.id}
          onClick={() => handleCardClick(movie.id.toString())}
          className="cursor-pointer"
        >
          <Card
            title={movie.title}
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            releaseDate={movie.release_date}
            vote_average={movie.vote_average}
          />
        </div>
      ))}
    </div>
  );
};

export default SearchList;
