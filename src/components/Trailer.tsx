interface TrailerProps {
  trailerUrl: string;
  title: string;
  overview: string;
}

const Trailer = ({ trailerUrl, title, overview }: TrailerProps) => (
  <div>
    <h3 className="text-2xl font-bold mb-4">Trailer</h3>
    <div className="flex flex-col items-center">
      <iframe
        src={trailerUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-[480px] w-[854px]"
      ></iframe>
      <div className="text-center">
        <h2 className="text-4xl font-bold">{title}</h2>
        <p className="text-lg mt-2">{overview}</p>
      </div>
    </div>
  </div>
);

export default Trailer;
