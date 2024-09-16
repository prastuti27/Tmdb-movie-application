import React from "react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa"; // For the filled star icon
import Typography from "./Typography";
import { IoCloseCircle } from "react-icons/io5";
import Button from "./Button";

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
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-gray-800 text-gray-200 rounded-lg shadow-lg p-6 max-w-lg w-full relative">
        <Typography
          content={`What did you think of ${title}?`}
          variant="h2"
          className="text-2xl font-semibold mb-4"
        />
        <Typography
          content={overview}
          variant="p"
          className="text-gray-400 mb-6"
        />

        <form onSubmit={handleRateSubmit} className="text-center">
          <Typography
            content="Rate This"
            variant="h3"
            className="text-xl font-medium mb-4"
          />
          <div className="flex justify-center mb-4">
            {[...Array(10)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <div key={`rating-${ratingValue}`} className="cursor-pointer">
                  <input
                    type="radio"
                    id={`rating-${ratingValue}`}
                    name="rating"
                    value={ratingValue}
                    checked={rating === ratingValue}
                    onChange={() => handleRatingChange(ratingValue)}
                    className="hidden"
                  />
                  <label
                    htmlFor={`rating-${ratingValue}`}
                    className="block cursor-pointer"
                  >
                    {rating >= ratingValue ? (
                      <FaStar size={30} color="gold" />
                    ) : (
                      <CiStar size={30} color="gray" />
                    )}
                  </label>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center space-x-4">
            <Button
              text="Rate"
              onClick={handleRateSubmit as any}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition duration-200"
            />
            <Button
              text="Delete"
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition duration-200"
            />
          </div>
        </form>
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition duration-200"
        >
          <IoCloseCircle size={24} />
        </button>
      </div>
    </div>
  );
};

export default RatingModal;
