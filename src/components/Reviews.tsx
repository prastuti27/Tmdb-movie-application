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
    <Typography content="Reviews" className="text-primary" variant="h3" />
    {/* eslint-disable-next-line no-extra-boolean-cast */}
    {!!reviews.length ? (
      <ul className="space-y-6">
        {reviews.map((review) => (
          <li key={review.id} className="border-b border-gray-200 pb-4">
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
          </li>
        ))}
      </ul>
    ) : (
      <Typography content="No Reviews Available" variant="p" />
    )}
  </div>
);

export default Reviews;
