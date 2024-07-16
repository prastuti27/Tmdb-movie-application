import React from "react";
import { CiStar } from "react-icons/ci";
import Typography from "./Typography";
import { IoCloseCircle } from "react-icons/io5";
interface RatingModalProps {
  showModal: boolean;
  closeModal: () => void;
  title: string;
  overview: string;
  rating: number;
  handleRatingChange: (newRating: number) => void;
  handleRateSubmit: (event: React.FormEvent) => void;
  handleDelete: () => void;
}

const RatingModal = ({
  showModal,
  closeModal,
  title,
  overview,
  rating,
  handleRatingChange,
  handleRateSubmit,
  handleDelete,
}: RatingModalProps) => {
  if (!showModal) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white bg-opacity-80 rounded-lg p-8 max-w-md w-full relative">
        <Typography content={title} variant="h2" />
        <Typography content={overview} variant="p" />

        <form onSubmit={handleRateSubmit} className="text-center">
          <Typography content="Rate This" variant="h3" />
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
            className="bg-gray-700 text-white px-4 py-2 rounded mr-2"
          >
            Rate
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </form>
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-red-600 hover:text-red-900"
        >
          <IoCloseCircle size={24} />
        </button>
      </div>
    </div>
  );
};

export default RatingModal;
