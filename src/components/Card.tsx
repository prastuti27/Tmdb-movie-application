import Typography from "./Typography";
import RatingProgressBar from "./RatingProgressBar";

interface CardProps {
  title: string;
  image: string;
  releaseDate: string;
  vote_average: number;
}

const Card = ({ title, image, releaseDate, vote_average }: CardProps) => {
  return (
    <div className="rounded-3xl shadow-md overflow-hidden transform transition-transform duration-200 hover:scale-105 text-white">
      <div className="relative">
        <img
          className="w-full h-60 object-cover rounded-3xl"
          src={image}
          alt={title}
        />
        <div className="absolute -bottom-9 left-2 p-3">
          <RatingProgressBar voteAverage={vote_average} />
        </div>
      </div>
      <div className="p-3 mt-4">
        <Typography
          content={title}
          variant="p"
          className="text-md font-semibold mb-1 truncate whitespace-nowrap overflow-hidden"
        />
        <Typography
          content={releaseDate}
          variant="p"
          className="text-sm text-gray-400 mt-1"
        />
      </div>
    </div>
  );
};

export default Card;
