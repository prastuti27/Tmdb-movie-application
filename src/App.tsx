import Provider from "./providers";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <div className="bg-slate-950 text-white font-lexend px-10">
      <Provider>
        <AppRoutes />
      </Provider>
    </div>
  );
};

export default App;
