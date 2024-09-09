export const PlayIcon = () => {
  return (
    <div className="playbtn flex items-center gap-5 cursor-pointer hover:animate-trailorPlay">
      <svg
        className="w-16 md:w-20 triangle transition-all ease-in-out duration-700"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 213.7 213.7"
      >
        <polygon
          className="stroke-current text-white stroke-[7] triangle"
          fill="none"
          points="73.5,62.5 148.5,105.8 73.5,149.1"
        ></polygon>
        <circle
          className="stroke-current text-white stroke-[7] circle transition-all ease-in-out duration-500 hover:animate-circleAnimation"
          fill="none"
          cx="106.8"
          cy="106.8"
          r="103.3"
        ></circle>
      </svg>
      <span className="text-white text-xl transition-all duration-700 ease-in-out hover:text-pink-500">
        Play Trailer
      </span>
    </div>
  );
};
