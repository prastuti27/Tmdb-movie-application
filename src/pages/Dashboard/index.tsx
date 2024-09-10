import Trending from "../../components/Trending";

import Popular from "../../components/Popular";

import WatchlistPage from "../../components/WatchlistPage";

const Dashboard = () => {
  return (
    <>
      <div className="px-10">
        <Trending />
        <Popular />
        <WatchlistPage />
      </div>
    </>
  );
};

export default Dashboard;
