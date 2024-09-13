import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MovieInfo from "./MovieInfo";
import RatingModal from "../../components/RatingModal";
import Reviews from "./Reviews";
import Card from "../../components/Card";
import Typography from "../../components/Typography";
import { Movie, Review, Video, Cast } from "../../types"; // Include Cast type
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
  const castEndpoint = `/movie/${id}/credits?api_key=${API_KEY}`; // Endpoint for fetching cast data
  const recommendationsEndpoint = `/movie/${id}/recommendations?api_key=${API_KEY}`;
  const navigate = useNavigate();

  // Fetch movie details, video, reviews, and cast
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
    data: castData,
    error: castError,
    loading: castLoading,
  } = useApiCall<{ cast: Cast[] }>(castEndpoint); // Fetch cast data
  const {
    data: recommendationsData,
    error: recommendationsError,
    loading: recommendationsLoading,
  } = useApiCall<{ results: Movie[] }>(recommendationsEndpoint);

  const { postData: postRating, deleteData: deleteRating } = useApiCall<{
    value: number;
  }>(`/movie/${id}/rating`, "POST");

  const trailer = videoData?.results.find(
    (video: Video) => video.type === "Trailer" && video.site === "YouTube"
  )?.key;
  const trailerUrl = trailer
    ? `https://www.youtube.com/embed/${trailer}`
    : null;

  const toggleRatingModal = () => setShowRatingModal(!showRatingModal);
  const handleRatingChange = (newRating: number) => setRating(newRating);
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
  const handleCardClick = (id: number) => navigate(`/movie/${id}`);

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

  if (
    movieError ||
    videoError ||
    reviewsError ||
    castError ||
    recommendationsError
  ) {
    return (
      <ErrorMessage message="Failed to load movie details. Please try again later." />
    );
  }

  if (
    movieLoading ||
    videoLoading ||
    reviewsLoading ||
    castLoading ||
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
      <div className="cast-section mx-5 px-5">
        <Typography variant="h2" content="Top Cast" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mx-5">
          {castData?.cast.slice(0, 6).map((castMember) => (
            <div key={castMember.id} className="cast-card text-center">
              <img
                src={`https://image.tmdb.org/t/p/w500${castMember.profile_path}`}
                alt={castMember.name}
                className="w-32 h-32 rounded-full mx-auto object-cover"
              />
              <Typography variant="h3" content={castMember.name} />
              <Typography variant="h3" content={`as ${castMember.character}`} />
            </div>
          ))}
        </div>
      </div>
      <Reviews reviews={reviews?.results ?? []} />

      <div className="recommendations-section mx-5 px-5">
        <Typography variant="h2" content="Recommended Movies" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mx-5">
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
