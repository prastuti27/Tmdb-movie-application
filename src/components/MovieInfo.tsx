import Typography from "./Typography";
import { CiStar } from "react-icons/ci";
import Trailer from "./Trailer";
import { PlayIcon } from "./PlayIcon";
import RatingProgressBar from "./RatingProgressBar";

interface Genre {
  id: number;
  name: string;
}

interface MovieInfoProps {
  movieDetails: {
    title: string;
    poster_path: string;
    backdrop_path: string;
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
    backdrop_path,
    original_title,
    original_language,
    release_date,

    genres = [],
    overview,
  } = movieDetails;

  const genreNames = genres.map((genre) => genre.name).join(", ");

  const details = [
    { label: "Original Title", value: original_title },
    { label: "Language", value: original_language },
    { label: "Release Date", value: release_date },
    { label: "Genres", value: genreNames },
  ];

  return (
    <div
      className="relative w-full min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: backdrop_path
          ? `url(https://image.tmdb.org/t/p/original${backdrop_path})`
          : "none",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8 flex flex-col md:flex-row bg-opacity-90 rounded-lg shadow-lg">
        {poster_path && (
          <img
            className="w-full md:w-1/3 h-auto rounded-lg mb-4 md:mb-0 md:mr-8 shadow-md"
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
          />
        )}
        <div className="flex-grow text-white">
          <Typography
            content={title}
            variant="h2"
            className="text-4xl md:text-5xl font-bold mb-4"
          />
          <div className="flex items-center gap-4">
            <div
              className="cursor-pointer flex items-center"
              onClick={toggleRatingModal}
            >
              <CiStar size={50} color="gold" />
              <span className="ml-2 text-lg font-semibold">Rate</span>
            </div>
            {submittedRating !== null && (
              <div className="flex items-center">
                <span className="text-lg font-semibold mr-2">Your Rating:</span>
                <p className="text-3xl font-bold">{submittedRating}/10</p>
              </div>
            )}
          </div>
          <ul className="mb-4 space-y-2">
            {details.map((detail) => (
              <li key={detail.label} className="flex">
                <span className="font-semibold w-36">{detail.label}:</span>{" "}
                <span>{detail.value}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <div className="">
              <RatingProgressBar
                voteAverage={movieDetails.vote_average}
                className="w-[65px] h-[65px]"
              />
            </div>
            <div className="flex items-center ">
              {trailerUrl && (
                <Trailer
                  trailerUrl={trailerUrl}
                  title={title}
                  icon={<PlayIcon />}
                  overview={overview}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
