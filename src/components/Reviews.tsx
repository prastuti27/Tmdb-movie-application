import React from "react";
import Typography from "./Typography";

interface Review {
  author: string;
  content: string;
  id: string;
}

interface ReviewsProps {
  reviews: Review[];
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => (
  <div className="max-w-4xl mx-auto px-4 py-8">
    <Typography content="Reviews" variant="h3" />
    {/* eslint-disable-next-line no-extra-boolean-cast */}
    {!!reviews.length ? (
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <Typography content={review.author} variant="h3" />
            <Typography content={review.content} variant="p" />
          </li>
        ))}
      </ul>
    ) : (
      <Typography content="No Reviews Available" variant="p" />
    )}
  </div>
);

export default Reviews;
