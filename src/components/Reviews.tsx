import Typography from "./Typography";

interface Review {
  author: string;
  content: string;
  id: string;
}

interface ReviewsProps {
  reviews: Review[];
}

const Reviews = ({ reviews }: ReviewsProps) => (
  <div className="max-w-4xl mx-auto px-4 py-8">
    <h3 className="text-2xl font-bold mb-4">Reviews</h3>
    {reviews.length > 0 ? (
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <Typography content={review.author} variant="h3" />
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    ) : (
      <p>No reviews available.</p>
    )}
  </div>
);

export default Reviews;
