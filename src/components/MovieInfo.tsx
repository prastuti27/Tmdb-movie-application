interface MovieInfoProps {
  movieDetails: {
    title: string;
    poster_path: string;
    original_title: string;
    original_language: string;
    release_date: string;
    popularity: number;
    vote_average: number;
    vote_count: number;
    genre_ids: number[];
  };
}

const MovieInfo = ({ movieDetails }: MovieInfoProps) => {
  const {
    title,
    poster_path,
    original_title,
    original_language,
    release_date,
    popularity,
    vote_average,
    vote_count,
    genre_ids,
  } = movieDetails;

  const details = [
    { label: "Original Title", value: original_title },
    { label: "Language", value: original_language },
    { label: "Release Date", value: release_date },
    { label: "Popularity", value: popularity },
    { label: "Vote Average", value: vote_average },
    { label: "Vote Count", value: vote_count },
    { label: "Genres", value: genre_ids + "," },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        {poster_path && (
          <img
            className="w-full md:w-1/3 rounded-lg mb-4 md:mb-0 md:mr-8"
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
          />
        )}
        <div className="md:w-2/3">
          <h3 className="text-2xl font-bold mb-4">{title}</h3>
          <ul className="mb-4">
            {details.map((detail) => (
              <li key={detail.label}>
                <strong className="font-semibold">{detail.label}:</strong>{" "}
                {detail.value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
