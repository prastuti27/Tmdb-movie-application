import { useState } from "react";
import { useParams } from "react-router-dom";
import { CiStar } from "react-icons/ci";
import Trailer from "../../components/Trailer";
import MovieInfo from "../../components/MovieInfo";
import RatingModal from "../../components/RatingModal";
import Reviews from "../../components/Reviews";
import WatchlistButton from "../../components/WatchlistButton";
import { Movie, Review, Video } from "../../types";
import useApiCall from "../../Hooks/useApiCall";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/Error";
import { API_KEY } from "../../constants";

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [submittedRating, setSubmittedRating] = useState<number | null>(null);

  const movieDetailsEndpoint = `/movie/${id}?api_key=${API_KEY}`;
  const videoEndpoint = `/movie/${id}/videos?api_key=${API_KEY}`;
  const reviewsEndpoint = `/movie/${id}/reviews?api_key=${API_KEY}`;
  const ratingEndpoint = `/movie/${id}/rating?api_key=${API_KEY}`;

  const {
    data: movieDetails,
    error: movieError,
    loading: movieLoading,
  } = useApiCall<Movie>(movieDetailsEndpoint);
  const {
    data: videoData,
    error: videoError,
    loading: videoLoading,
  } = useApiCall<{ results: Video[] }>(videoEndpoint);
  const {
    data: reviews,
    error: reviewsError,
    loading: reviewsLoading,
  } = useApiCall<{ results: Review[] }>(reviewsEndpoint);
  const { postData: postRating, deleteData: deleteRating } = useApiCall<{
    value: number;
  }>(ratingEndpoint, "POST");

  const trailer = videoData?.results.find(
    (video: Video) => video.type === "Trailer" && video.site === "YouTube"
  )?.key;

  const trailerUrl = trailer
    ? `https://www.youtube.com/embed/${trailer}`
    : null;

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleRateSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await postRating?.({ value: rating });
      setSubmittedRating(rating);
      toggleModal();
    } catch (error) {
      console.error("Failed to submit rating:", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (deleteRating) {
        await deleteRating();
        setSubmittedRating(null);
        setRating(0);
        toggleModal();
      }
    } catch (error) {
      console.error("Failed to delete rating:", error);
    }
  };

  if (movieError || videoError || reviewsError) {
    return (
      <ErrorMessage message="Failed to load movies. Please try again later." />
    );
  }

  if (movieLoading || videoLoading || reviewsLoading || !movieDetails) {
    return <Loader />;
  }

  return (
    <div>
      <div className="flex flex-row justify-end gap-3">
        <div>
          <WatchlistButton movieId={id} />
        </div>

        <div className="cursor-pointer" onClick={toggleModal}>
          <p>
            <strong>Rate</strong>
          </p>
          <CiStar size={50} color="gold" />
        </div>
        {submittedRating !== null && (
          <div>
            <p>
              <strong>Your Rating</strong>
            </p>
            <p className="text-4xl">{submittedRating}/10</p>
          </div>
        )}
      </div>

      {trailerUrl && (
        <Trailer
          trailerUrl={trailerUrl}
          title={movieDetails.title}
          overview={movieDetails.overview}
        />
      )}
      <MovieInfo movieDetails={movieDetails} />
      <RatingModal
        showModal={showModal}
        closeModal={toggleModal}
        title={movieDetails.title}
        overview={movieDetails.overview}
        rating={rating}
        handleRatingChange={handleRatingChange}
        handleRateSubmit={handleRateSubmit}
        handleDelete={handleDelete}
      />
      <Reviews reviews={reviews?.results ?? []} />
    </div>
  );
};

export default MovieDetails;
