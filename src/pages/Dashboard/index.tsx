import Trending from "../../components/Trending";
import Navbar from "../../components/Navbar";
import Popular from "../../components/Popular";
import Watchlist from "../../components/Watchlist";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <Trending />
      <Popular />
      <Watchlist />
    </div>
  );
};

export default Dashboard;
