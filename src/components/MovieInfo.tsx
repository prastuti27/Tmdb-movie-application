const MovieInfo = ({ movieDetails }: MovieInfoProps) => (
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
            {movieDetails.genre_ids + ", "}
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default MovieInfo;
