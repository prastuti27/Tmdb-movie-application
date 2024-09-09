// src/components/RatingProgressBar.tsx

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface RatingProgressBarProps {
  voteAverage?: number;
}

const RatingProgressBar = ({ voteAverage = 0 }: RatingProgressBarProps) => {
  const value = voteAverage * 10;

  return (
    <div className="w-10 h-10 rounded-3xl bg-gray-800 mx-auto">
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
