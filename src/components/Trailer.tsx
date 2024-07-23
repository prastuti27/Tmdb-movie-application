// import Typography from "./Typography";

// interface TrailerProps {
//   trailerUrl: string;
//   title: string;
//   overview: string;
// }

// const Trailer = ({ trailerUrl, title, overview }: TrailerProps) => (
//   <div>
//     <h3 className="text-2xl font-bold mb-4">Trailer</h3>
//     <div className="flex flex-col items-center">
//       <iframe
//         src={trailerUrl}
//         title="YouTube video player"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//         allowFullScreen
//         className="h-[480px] w-[854px]"
//       ></iframe>
//       <div className="text-center">
//         <Typography content={title} variant="h2" />
//         <Typography content={overview} variant="p" />
//       </div>
//     </div>
//   </div>
// );

// export default Trailer;

import React, { useState } from "react";
import Typography from "./Typography";

interface TrailerProps {
  trailerUrl: string;
  title: string;
  overview: string;
}

const Trailer: React.FC<TrailerProps> = ({ trailerUrl, title, overview }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  if (!trailerUrl) return null;

  return (
    <div>
      <button onClick={toggleModal} className="btn">
        Watch Trailer
      </button>

      {showModal && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={toggleModal}
          ></div>
          <div className="fixed inset-0 flex flex-col items-center justify-center z-50">
            <div className="absolute top-14 bg-black flex justify-between items-center w-[854px]  p-4 z-50">
              <h3 className="text-white">Play trailer</h3>
              <button
                className="bg-gray-700 text-white p-2"
                onClick={toggleModal}
              >
                X
              </button>
            </div>
            <iframe
              src={trailerUrl}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-[480px] w-[854px] mt-16"
            ></iframe>
          </div>

          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={toggleModal}
          />
        </>
      )}
    </div>
  );
};

export default Trailer;
