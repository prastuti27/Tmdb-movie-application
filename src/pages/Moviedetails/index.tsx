import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

interface Video {
  key: string;
  site: string;
  type: string;
}

interface Review {
  author: string;
  content: string;
  id: string;
}

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);
  const [trailer, setTrailer] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const authToken = import.meta.env.VITE_AUTH_TOKEN;
      const apiKey = import.meta.env.VITE_API_KEY;

      const movieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
      const videoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`;
      const reviewsUrl = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${apiKey}`;
      const options = {
        headers: {
          Authorization: `Bearer ${authToken}`,
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

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {trailer && (
        <div className="">
          <h3 className="text-2xl font-bold mb-4">Trailer</h3>
          <div className=" flex flex-col items-center">
            <iframe
              src={trailer}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-[480px] w-[854px]"
            ></iframe>
            <div className="text-center">
              <h2 className="text-4xl font-bold">{movieDetails.title}</h2>
              <p className="text-lg mt-2">{movieDetails.overview}</p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          {movieDetails.poster_path && (
            <img
              className="w-full md:w-1/3 rounded-lg mb-4 md:mb-0 md:mr-8"
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt={movieDetails.title}
            />
          )}

          <div className="md:w-2/3">
            <h3 className="text-2xl font-bold mb-4">{movieDetails.title}</h3>
            <ul className="mb-4">
              <li>
                <strong className="font-semibold">Original Title:</strong>
                {movieDetails.original_title}
              </li>
              <li>
                <strong className="font-semibold">Language:</strong>
                {movieDetails.original_language}
              </li>
              <li>
                <strong className="font-semibold">Release Date:</strong>
                {movieDetails.release_date}
              </li>
              <li>
                <strong className="font-semibold">Popularity:</strong>
                {movieDetails.popularity}
              </li>
              <li>
                <strong className="font-semibold">Vote Average:</strong>
                {movieDetails.vote_average}
              </li>
              <li>
                <strong className="font-semibold">Vote Count:</strong>
                {movieDetails.vote_count}
              </li>
              <li>
                <strong className="font-semibold">Genres:</strong>
                {movieDetails.genre_ids + ","}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h3 className="text-2xl font-bold mb-4">Reviews</h3>
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>
                <h4 className="font-semibold">{review.author}</h4>
                <p>{review.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
