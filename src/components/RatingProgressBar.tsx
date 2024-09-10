import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface RatingProgressBarProps {
  voteAverage?: number;
  className?: string;
}

const RatingProgressBar = ({
  voteAverage = 0,
  className = "",
}: RatingProgressBarProps) => {
  const value = voteAverage * 10;

  const containerClasses = `w-10 h-10 rounded-full bg-gray-800  ${className}`;

  return (
    <div className={containerClasses}>
      <CircularProgressbar
        value={value}
        text={`${voteAverage.toFixed(1)}`}
        styles={buildStyles({
          textSize: "32px",
          pathColor: "#4db8ff",
          textColor: "#4db8ff",
          trailColor: "#d6d6d6",
        })}
      />
    </div>
  );
};

export default RatingProgressBar;
