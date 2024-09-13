// types.ts
interface Genre {
  id: number;
  name: string;
}
export type Movie = {
  id: string;
  title: string;
  poster_path: string;
  backdrop_path: string;
  original_title: string;
  original_language: string;
  release_date: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  genres: Genre[];
  overview: string;
};
// types.ts
export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Review {
  author: string;
  content: string;
  id: string;
  author_details: {
    avatar_path: string | null;
  };
  created_at: string;
}

export type Video = {
  type: string;
  site: string;
  key: string;
};

export interface MovieInfoProps {
  movieDetails: Movie;
}
