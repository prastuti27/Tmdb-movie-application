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
