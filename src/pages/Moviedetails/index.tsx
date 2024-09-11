import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MovieInfo from "../../components/MovieInfo";
import RatingModal from "../../components/RatingModal";
import Reviews from "../../components/Reviews";
import Card from "../../components/Card"; // Import Card component for recommendations

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
  const recommendationsEndpoint = `/movie/${id}/recommendations?api_key=${API_KEY}`;
  const navigate = useNavigate();
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
  const {
    data: recommendationsData,
    error: recommendationsError,
    loading: recommendationsLoading,
  } = useApiCall<{ results: Movie[] }>(recommendationsEndpoint);

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
  const handleCardClick = (id: number) => {
    navigate(`/movie/${id}`);
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

  if (movieError || videoError || reviewsError || recommendationsError) {
    return (
      <ErrorMessage message="Failed to load movie details. Please try again later." />
    );
  }

  if (
    movieLoading ||
    videoLoading ||
    reviewsLoading ||
    recommendationsLoading ||
    !movieDetails
  ) {
    return <Loader />;
  }

  return (
    <div className="">
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

      {/* Recommendations Section */}
      <div className="recommendations-section">
        <h2>Recommended Movies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {recommendationsData?.results.map((recommendation) => (
            <div
              key={recommendation.id}
              className="cursor-pointer"
              onClick={() => handleCardClick(Number(recommendation.id))}
            >
              <Card
                title={recommendation.title}
                image={`https://image.tmdb.org/t/p/w500${recommendation.backdrop_path}`}
                releaseDate={recommendation.release_date}
                vote_average={recommendation.vote_average}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
