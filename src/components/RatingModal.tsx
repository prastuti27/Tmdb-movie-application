import React from "react";
import { CiStar } from "react-icons/ci";

interface RatingModalProps {
  showModal: boolean;
  closeModal: () => void;
  title: string;
  overview: string;
  rating: number;
  handleRatingChange: (newRating: number) => void;
  handleRateSubmit: (event: React.FormEvent) => void;
}

const RatingModal: React.FC<RatingModalProps> = ({
  showModal,
  closeModal,
  title,
  overview,
  rating,
  handleRatingChange,
  handleRateSubmit,
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
        <h2 className="text-black text-center mb-4">{title}</h2>
        <p className="text-black text-center mb-4">{overview}</p>
        <form onSubmit={handleRateSubmit} className="text-center">
          <h3 className="text-black mb-4">Rate This</h3>
          <div className="flex justify-center mb-4">
            {[...Array(10)].map((_, index) => (
              <label key={index} className="cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  value={index + 1}
                  checked={rating === index + 1}
                  onChange={() => handleRatingChange(index + 1)}
                  className="hidden"
                />
                <CiStar
                  size={30}
                  color={rating >= index + 1 ? "gold" : "gray"}
                />
              </label>
            ))}
          </div>
          <button
            type="submit"
            className="bg-gray-700 text-white px-4 py-2 rounded"
          >
            Rate
          </button>
        </form>
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default RatingModal;
