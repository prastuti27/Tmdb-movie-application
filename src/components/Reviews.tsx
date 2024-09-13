import { useState } from "react";
import Typography from "./Typography";
import { Review } from "../types";
import { FaUser } from "react-icons/fa";

interface ReviewsProps {
  reviews: Review[];
}

const Reviews = ({ reviews }: ReviewsProps) => {
  const [showAll, setShowAll] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const toggleExpandReview = (reviewId: string) => {
    setExpandedReviews((prevState) => ({
      ...prevState,
      [reviewId]: !prevState[reviewId],
    }));
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
                      <div className="w-12 h-12 rounded-full mr-4 p-3 bg-gray-200 flex items-center justify-center">
                        <FaUser className="text-gray-400 w-6 h-6" />
                      </div>
                    )}
                    <div>
                      <Typography
                        content={review.author}
                        variant="h3"
                        className="font-semibold text-primary"
                      />
                      <div
                        className={`text-gray-600 mt-2 ${
                          expandedReviews[review.id]
                            ? ""
                            : "line-clamp-3 overflow-hidden"
                        }`}
                      >
                        <Typography content={review.content} variant="p" />
                      </div>
                      <Typography
                        content={new Date(
                          review.created_at
                        ).toLocaleDateString()}
                        variant="p"
                        className="text-gray-400 mt-1"
                      />
                      {review.content.length > 150 && (
                        <button
                          onClick={() => toggleExpandReview(review.id)}
                          className="text-blue-500 mt-2"
                        >
                          {expandedReviews[review.id] ? "See less" : "See more"}
                        </button>
                      )}
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
                      <div className="w-12 h-12 rounded-full p-3 mr-4 bg-gray-200 flex items-center justify-center">
                        <FaUser className="text-gray-400 w-6 h-6" />
                      </div>
                    )}
                    <div>
                      <Typography
                        content={reviews[0].author}
                        variant="h3"
                        className="font-semibold text-primary"
                      />
                      <div
                        className={`text-gray-600 mt-2 ${
                          expandedReviews[reviews[0].id]
                            ? ""
                            : "line-clamp-3 overflow-hidden"
                        }`}
                      >
                        <Typography content={reviews[0].content} variant="p" />
                      </div>
                      <Typography
                        content={new Date(
                          reviews[0].created_at
                        ).toLocaleDateString()}
                        variant="p"
                        className="text-gray-400 mt-1"
                      />
                      {reviews[0].content.length > 150 && (
                        <button
                          onClick={() => toggleExpandReview(reviews[0].id)}
                          className="text-blue-500 mt-2"
                        >
                          {expandedReviews[reviews[0].id]
                            ? "See less"
                            : "See more"}
                        </button>
                      )}
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
