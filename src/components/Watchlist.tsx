// import React from "react";
// import Typography from "./Typography";
// import Card from "./Card";

// interface WatchlistProps {
//   watchlist: Movie[];
// }

// const Watchlist: React.FC<WatchlistProps> = ({ watchlist }) => {
//   return (
//     <div>
//       <Typography variant="h2" content="Watchlist" />
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {watchlist.map((movie) => (
//           <div key={movie.id}>
//             <Card
//               key={movie.id}
//               title={movie.title}
//               image={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
//               description={movie.overview}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Watchlist;
// Watchlist.js
import React from "react";
import Typography from "./Typography";
import Card from "./Card";
import { useWatchlist } from "./WatchlistContext"; // Import the WatchlistContext

const Watchlist: React.FC = () => {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  return (
    <div>
      <Typography variant="h2" content="Your Watchlist" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {watchlist.map((movie) => (
          <div key={movie.id}>
            <Card
              key={movie.id}
              title={movie.title}
              image={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              description={movie.overview}
            />
            <button onClick={() => removeFromWatchlist(movie.id)}>
              Remove from Watchlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
