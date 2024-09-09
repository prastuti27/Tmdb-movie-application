// src/pages/MovieDetails.tsx

import { useState } from "react";
import { useParams } from "react-router-dom";

import MovieInfo from "../../components/MovieInfo";
import RatingModal from "../../components/RatingModal";
import Reviews from "../../components/Reviews";
import RatingProgressBar from "../../components/CircleBar";

import { Movie, Review, Video } from "../../types";
import useApiCall from "../../Hooks/useApiCall";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/Error";
import { API_KEY } from "../../constants";

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [showRatingModal, setShowRatingModal] = useState(false);
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

  const toggleRatingModal = () => {
    setShowRatingModal(!showRatingModal);
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleRateSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await postRating?.({ value: rating });
      setSubmittedRating(rating);
      toggleRatingModal();
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
        toggleRatingModal();
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
    <div className="p-6">
      <MovieInfo
        movieDetails={movieDetails}
        trailerUrl={trailerUrl}
        showRatingModal={showRatingModal}
        toggleRatingModal={toggleRatingModal}
        submittedRating={submittedRating}
        rating={rating}
        handleRatingChange={handleRatingChange}
        handleRateSubmit={handleRateSubmit}
        handleDelete={handleDelete}
      />
      <RatingModal
        showModal={showRatingModal}
        closeModal={toggleRatingModal}
        title={movieDetails.title}
        overview={movieDetails.overview}
        rating={rating}
        handleRatingChange={handleRatingChange}
        handleRateSubmit={handleRateSubmit}
        handleDelete={handleDelete}
      />
      <Reviews reviews={reviews?.results ?? []} />
      <div className="mt-6">
        <RatingProgressBar voteAverage={movieDetails.vote_average} />
      </div>
    </div>
  );
};

export default MovieDetails;
