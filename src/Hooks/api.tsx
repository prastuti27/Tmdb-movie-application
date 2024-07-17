import axios from "axios";
import { AUTH_TOKEN } from "../constants";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
});

export default api;
