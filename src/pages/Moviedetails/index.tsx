import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CiStar } from "react-icons/ci";
import Trailer from "../../components/Trailer";
import MovieInfo from "../../components/MovieInfo";
import RatingModal from "../../components/RatingModal";
import Reviews from "../../components/Reviews";
import { AUTH_TOKEN, API_KEY } from "../../constants";
import WatchlistButton from "../../components/WatchlistButton";

type Movie = {
  id: string;
  title: string;
  poster_path: string;
  original_title: string;
  original_language: string;
  release_date: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  overview: string;
};

type Review = {
  author: string;
  content: string;
  id: string;
};

type Video = {
  type: string;
  site: string;
  key: string;
};

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);
  const [trailer, setTrailer] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [submittedRating, setSubmittedRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const movieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
      const videoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`;
      const reviewsUrl = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}`;
      const options = {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      };

      try {
        const [movieResponse, videoResponse, reviewsResponse] =
          await Promise.all([
            axios.get(movieUrl, options),
            axios.get(videoUrl, options),
            axios.get(reviewsUrl, options),
          ]);

        setMovieDetails(movieResponse.data);

        const trailerVideo = videoResponse.data.results.find(
          (video: Video) => video.type === "Trailer" && video.site === "YouTube"
        );

        if (trailerVideo) {
          setTrailer(`https://www.youtube.com/embed/${trailerVideo.key}`);
        }

        setReviews(reviewsResponse.data.results);
      } catch (error) {
        setError("Failed to fetch movie details. Please try again later.");
      }
    };

    fetchMovieDetails();
  }, [id]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleRateSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const ratingUrl = `https://api.themoviedb.org/3/movie/${id}/rating?api_key=${API_KEY}`;
    const payload = {
      value: rating,
    };
    const options = {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    };

    try {
      await axios.post(ratingUrl, payload, options);
      setSubmittedRating(rating);
      closeModal();
    } catch (error) {
      console.error("Failed to submit rating:", error);
    }
  };

  const handleDelete = async () => {
    const deleteUrl = `https://api.themoviedb.org/3/movie/${id}/rating?api_key=${API_KEY}`;
    const options = {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    };

    try {
      await axios.delete(deleteUrl, options);
      setSubmittedRating(null);
      setRating(0);
      closeModal();
    } catch (error) {
      console.error("Failed to delete rating:", error);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <WatchlistButton movieId={id} />
      <div className="cursor-pointer fixed top-4 right-10" onClick={openModal}>
        <p>
          <strong>Rate</strong>
        </p>
        <CiStar size={50} color="gold" />
      </div>

      {submittedRating !== null && (
        <div className="fixed top-4 right-40">
          <p>
            <strong>Your Rating</strong>
          </p>
          <p className="text-4xl"> {submittedRating}/10</p>
        </div>
      )}
      {trailer && (
        <Trailer
          trailerUrl={trailer}
          title={movieDetails.title}
          overview={movieDetails.overview}
        />
      )}
      <MovieInfo movieDetails={movieDetails} />
      <RatingModal
        showModal={showModal}
        closeModal={closeModal}
        title={movieDetails.title}
        overview={movieDetails.overview}
        rating={rating}
        handleRatingChange={handleRatingChange}
        handleRateSubmit={handleRateSubmit}
        handleDelete={handleDelete}
      />
      <Reviews reviews={reviews} />
    </div>
  );
};

export default MovieDetails;
