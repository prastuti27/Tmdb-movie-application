import Typography from "./Typography";
import { CiStar } from "react-icons/ci";
import Trailer from "./Trailer";

interface Genre {
  id: number;
  name: string;
}

interface MovieInfoProps {
  movieDetails: {
    title: string;
    poster_path: string;
    original_title: string;
    original_language: string;
    release_date: string;
    popularity: number;
    vote_average: number;
    vote_count: number;
    genres: Genre[];
    overview: string;
  };
  trailerUrl: string | null;
  showRatingModal: boolean;
  toggleRatingModal: () => void;
  submittedRating: number | null;
  rating: number;
  handleRatingChange: (newRating: number) => void;
  handleRateSubmit: (event: React.FormEvent) => void;
  handleDelete: () => void;
}

const MovieInfo = ({
  movieDetails,
  trailerUrl,

  toggleRatingModal,
  submittedRating,
}: MovieInfoProps) => {
  const {
    title,
    poster_path,
    original_title,
    original_language,
    release_date,
    popularity,
    vote_average,
    vote_count,
    genres = [],
    overview, // Ensure this is included for Trailer component
  } = movieDetails;

  const genreNames = genres.map((genre) => genre.name).join(", ");

  const details = [
    { label: "Original Title", value: original_title },
    { label: "Language", value: original_language },
    { label: "Release Date", value: release_date },
    { label: "Popularity", value: popularity },
    { label: "Vote Average", value: vote_average },
    { label: "Vote Count", value: vote_count },
    { label: "Genres", value: genreNames },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        {poster_path && (
          <img
            className="w-full md:w-1/3 rounded-lg mb-4 md:mb-0 md:mr-8"
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
          />
        )}
        <div className="md:w-2/3">
          <Typography content={title} variant="h2" />
          <ul className="mb-4">
            {details.map((detail) => (
              <li key={detail.label}>
                <strong className="font-semibold">{detail.label}:</strong>{" "}
                {detail.value}
              </li>
            ))}
          </ul>
          {trailerUrl && (
            <Trailer
              trailerUrl={trailerUrl}
              title={movieDetails.title}
              overview={overview}
            />
          )}
          <div className="flex flex-row items-center gap-3 my-4">
            <div className="cursor-pointer" onClick={toggleRatingModal}>
              <p>
                <strong>Rate</strong>
              </p>
              <CiStar size={50} color="gold" />
            </div>
            {submittedRating !== null && (
              <div>
                <p>
                  <strong>Your Rating</strong>
                </p>
                <p className="text-4xl">{submittedRating}/10</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
