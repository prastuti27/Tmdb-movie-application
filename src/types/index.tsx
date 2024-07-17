// types.ts
export type Movie = {
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

export type Review = {
  author: string;
  content: string;
  id: string;
};

export type Video = {
  type: string;
  site: string;
  key: string;
};

export interface MovieInfoProps {
  movieDetails: Movie;
}