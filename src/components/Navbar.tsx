import React, { useState, KeyboardEvent } from "react";
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

const Navbar: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<MovieResult[]>([]);
  const navigate = useNavigate();

  const handleSearch = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;

      try {
        const response = await axios.get(url);
        setResults(response.data.results);
        navigate("/search-results", { state: response.data.results });
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 text-white">
      <div>
        <img src={logoSvg} alt="Logo" className="h-8" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleSearch}
        placeholder="Search"
        className="px-3 py-1 w-1/2 bg-white rounded-md text-gray-800 placeholder-gray-500 focus:outline-none"
      />
    </div>
  );
};

export default Navbar;
