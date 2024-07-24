import Typography from "./Typography";

interface CardProps {
  title: string;
  image: string;
  releaseDate: string;
}

const Card = ({ title, image }: CardProps) => {
  return (
    <div className="rounded-3xl shadow-md overflow-hidden transform transition-transform duration-200 hover:scale-105 text-white">
      <img
        className="w-full h-60 object-cover rounded-3xl"
        src={image}
        alt={title}
      />
      <div className="p-3">
        <Typography
          content={title}
          variant="p"
          className="text-md font-semibold mb-1 truncate whitespace-nowrap overflow-hidden"
        />
      </div>
    </div>
  );
};

export default Card;
