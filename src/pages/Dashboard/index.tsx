import Trending from "../../components/Trending";
import Navbar from "../../components/Navbar";
import Popular from "../../components/Popular";
const Dashboard = () => {
  return (
    <div className="bg-black text-white px-10">
      <Navbar />
      <Trending />;
      <Popular />
    </div>
  );
};

export default Dashboard;
