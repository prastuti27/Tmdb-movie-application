import { TbDeviceDesktopPlus } from "react-icons/tb";
import Button from "./Button";
import useApiCall from "../Hooks/useApiCall";

interface MovieCardFooterProps {
  releaseDate: string;
  movieId: number;
}

const MovieCardFooter = ({ releaseDate, movieId }: MovieCardFooterProps) => {
  const year = releaseDate ? new Date(releaseDate).getFullYear() : "N/A";
  const accountId = "{your_account_id}";
  const endpoint = `account/${accountId}/watchlist`;

  const { postData, error } = useApiCall<{ success: boolean }>(
    endpoint,
    "POST"
  );

  const handleAddToWatchlist = async () => {
    if (!postData) {
      console.error("postData function is not defined.");
      return;
    }

    try {
      const response = await postData({
        media_type: "movie",
        media_id: movieId,
        watchlist: true,
      });

      if (response.success) {
        console.log("Successfully added to watchlist");
      } else {
        console.error("Failed to add to watchlist");
      }
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  };

  return (
    <div className="mt-2 mx-2 flex justify-between items-center">
      <span className="text-xs bg-gray-800 border border-primary font-semibold px-2 py-1 rounded-xl">
        {year}
      </span>
      <div className="w-full flex justify-end">
        <Button
          text="Watchlist"
          onClick={handleAddToWatchlist}
          className="flex items-center bg-primary px-2 py-1 rounded-xl  text-black hover:bg-teal-600 transition-colors"
          icon={<TbDeviceDesktopPlus className="mr-1" />}
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default MovieCardFooter;
