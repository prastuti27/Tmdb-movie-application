import Typography from "./Typography";

interface CardProps {
  title: string;
  image: string;

  releaseDate: string;
}

const Card = ({ title, image }: CardProps) => {
  // const year = releaseDate ? new Date(releaseDate).getFullYear() : "N/A";

  return (
    <div className="rounded-3xl shadow-md overflow-hidden transform transition-transform duration-200 hover:scale-105  text-white">
      <img
        className="w-full h-60 object-cover rounded-3xl"
        src={image}
        alt={title}
      />
      <div className="p-3">
        <Typography
          content={title}
          variant="p"
          className="text-md font-semibold mb-1"
        />

        {/* <div className="mt-2 flex justify-between items-center">
           <span className="text-xs bg-gray-800 border border-primary px-2 py-1 rounded-xl">
            {year}
          </span>
          <button className="text-xs bg-primary px-2 py-1 rounded hover:bg-teal-600 transition-colors">
            Watch Later
          </button> 
        </div> */}
      </div>
    </div>
  );
};

export default Card;
