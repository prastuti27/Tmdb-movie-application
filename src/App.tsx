import Provider from "./providers";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <div className="bg-black text-white px-10">
      <Provider>
        <AppRoutes />
      </Provider>
    </div>
  );
};

export default App;
