import axios from "axios";
import { AUTH_TOKEN, API_KEY } from "../constants";

const options = {
  headers: {
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
};

export const getMovieDetails = async (id: string) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
  return axios.get(url, options);
};

export const getMovieVideos = async (id: string) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`;
  return axios.get(url, options);
};

export const getMovieReviews = async (id: string) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}`;
  return axios.get(url, options);
};

export const submitMovieRating = async (id: string, rating: number) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/rating?api_key=${API_KEY}`;
  const payload = { value: rating };
  return axios.post(url, payload, options);
};

export const deleteMovieRating = async (id: string) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/rating?api_key=${API_KEY}`;
  return axios.delete(url, options);
};
