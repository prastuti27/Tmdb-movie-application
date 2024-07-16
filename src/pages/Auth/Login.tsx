import { useState, FormEvent } from "react";
import axios from "axios";
import { API_KEY } from "../../constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const tokenResponse = await axios.get(
        `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`
      );
      const requestToken = tokenResponse.data.request_token;

      await axios.post(
        `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${API_KEY}`,
        {
          username,
          password,
          request_token: requestToken,
        }
      );

      const sessionResponse = await axios.post(
        `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}`,
        {
          request_token: requestToken,
        }
      );

      const sessionId = sessionResponse.data.session_id;
      localStorage.setItem("tmdb_session_id", sessionId);

      console.log("Logged in successfully");

      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
      setError("Login failed. Please check your credentials and try again.");
    }

    setUsername("");
    setPassword("");
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded shadow-md max-w-sm w-full">
        <h1 className="text-2xl font-bold text-white mb-4">LOGIN</h1>
        <p className="text-white mb-6">Please enter your login and password!</p>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            className="w-full border-2 border-blue-950 rounded-3xl px-3 py-2 outline-none focus:border-blue-500 bg-black text-white placeholder-gray-500"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="w-full border-2 border-blue-950 rounded-3xl px-3 py-2 outline-none focus:border-blue-500 bg-black text-white placeholder-gray-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="text-blue-500 block text-center mb-4">
            No account?{" "}
            <a
              href="https://www.themoviedb.org/signup"
              target="_blank"
              rel="noopener noreferrer"
            >
              Click Here
            </a>
          </span>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-1/2 border-2 border-green-500 rounded-3xl text-white py-2 px-4 hover:bg-green-600 transition duration-300"
            >
              Login
            </button>
          </div>
        </form>
        <div className="flex justify-center mt-4 space-x-4">
          <a href="#" className="text-white">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-white">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-white">
            <i className="fab fa-google"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
