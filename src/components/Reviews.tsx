import { useState } from "react";
import Typography from "./Typography";
import { Review } from "../types";

interface ReviewsProps {
  reviews: Review[];
}

const Reviews = ({ reviews }: ReviewsProps) => {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Typography content="Reviews" className="text-primary" variant="h3" />
      {reviews.length ? (
        <>
          <ul className="space-y-6">
            {showAll
              ? reviews.map((review) => (
                  <li
                    key={review.id}
                    className="border-b border-gray-200 pb-4 flex items-start"
                  >
                    {review.author_details.avatar_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${review.author_details.avatar_path}`}
                        alt={review.author}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full mr-4 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No Avatar</span>
                      </div>
                    )}
                    <div>
                      <Typography
                        content={review.author}
                        variant="h3"
                        className="font-semibold text-primary"
                      />
                      <Typography
                        content={review.content}
                        variant="p"
                        className="text-gray-600 mt-2"
                      />
                      <Typography
                        content={new Date(
                          review.created_at
                        ).toLocaleDateString()}
                        variant="p"
                        className="text-gray-400 mt-1"
                      />
                    </div>
                  </li>
                ))
              : reviews[0] && (
                  <li
                    key={reviews[0].id}
                    className="border-b border-gray-200 pb-4 flex items-start"
                  >
                    {reviews[0].author_details.avatar_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${reviews[0].author_details.avatar_path}`}
                        alt={reviews[0].author}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full mr-4 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No Avatar</span>
                      </div>
                    )}
                    <div>
                      <Typography
                        content={reviews[0].author}
                        variant="h3"
                        className="font-semibold text-primary"
                      />
                      <Typography
                        content={reviews[0].content}
                        variant="p"
                        className="text-gray-600 mt-2"
                      />
                      <Typography
                        content={new Date(
                          reviews[0].created_at
                        ).toLocaleDateString()}
                        variant="p"
                        className="text-gray-400 mt-1"
                      />
                    </div>
                  </li>
                )}
          </ul>
          {reviews.length > 1 && (
            <button onClick={toggleShowAll} className="text-blue-500 mt-4">
              {showAll ? "Show less" : "Read all"}
            </button>
          )}
        </>
      ) : (
        <Typography content="No Reviews Available" variant="p" />
      )}
    </div>
  );
};

export default Reviews;
