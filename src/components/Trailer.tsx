import { useState } from "react";
import Button from "./Button";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { PlayIcon } from "./PlayIcon";

interface TrailerProps {
  trailerUrl: string;
  title: string;
  overview: string;
  icon: React.ReactNode;
}

const Trailer = ({ trailerUrl, title }: TrailerProps) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  if (!trailerUrl) return null;

  return (
    <div>
      <Button
        onClick={toggleModal}
        className="flex items-center text-primary text-xl font-extrabold"
        text="Trailer"
        icon={
          <>
            <div className="flex justify-center items-center gap-2">
              <PlayIcon />
              <MdKeyboardDoubleArrowRight />
            </div>
          </>
        }
      />
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
