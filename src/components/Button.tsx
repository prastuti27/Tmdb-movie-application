type ButtonProps = {
  text: string;
  handleWatchlist: (movieId: number) => void;
  movieId: number;
};

const Button: React.FC<ButtonProps> = ({ text }) => {
  return (
    <button className="bg-sky-700 p-2 mt-5 rounded-md font-semibold    ">
      {text}
    </button>
  );
};

export default Button;
