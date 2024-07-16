import React, { useState, KeyboardEvent, ChangeEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logoSvg from "../assets/svgs/logo.svg";
import { API_KEY } from "../constants";

interface MovieResult {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

const Navbar = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<MovieResult[]>([]);
  const navigate = useNavigate();

  const handleSearch = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;

      try {
        const response = await axios.get<{ results: MovieResult[] }>(url);
        setResults(response.data.results);
        navigate("/search-results", { state: response.data.results });
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("tmdb_session_id");

    axios.delete(
      `https://api.themoviedb.org/3/authentication/session?api_key=${API_KEY}`,
      {
        data: {
          session_id: localStorage.getItem("tmdb_session_id"),
        },
      }
    );

    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 text-white">
      <div>
        <img src={logoSvg} alt="Logo" className="h-8" />
      </div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleSearch}
        placeholder="Search"
        className="px-3 py-1 w-1/2 bg-white rounded-md text-gray-800 placeholder-gray-500 focus:outline-none"
      />
      <button onClick={handleLogout} className="text-white hover:text-gray-300">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
