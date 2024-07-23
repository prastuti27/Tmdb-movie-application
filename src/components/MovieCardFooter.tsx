import { TbDeviceDesktopPlus } from "react-icons/tb";

interface MovieCardFooterProps {
  releaseDate: string;
}

const MovieCardFooter: React.FC<MovieCardFooterProps> = ({ releaseDate }) => {
  const year = releaseDate ? new Date(releaseDate).getFullYear() : "N/A";

  return (
    <div className="mt-2 flex justify-between items-center">
      <span className="text-xs bg-gray-800 border border-primary px-2 py-1 rounded-xl">
        {year}
      </span>
      <button className="flex items-center text-xs bg-primary px-2 py-1 text-black rounded hover:bg-teal-600 transition-colors">
        <TbDeviceDesktopPlus className="mr-1" /> Watch Later
      </button>
    </div>
  );
};

export default MovieCardFooter;
