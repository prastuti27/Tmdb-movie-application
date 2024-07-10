import logoSvg from "../assets/svgs/logo.svg";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3 text-white ">
      <div>
        <img src={logoSvg} alt="Logo" className="h-8" />
      </div>
      <input
        type="text"
        placeholder="Search"
        className="px-3 py-1 w-1/2 bg-white rounded-md text-gray-800 placeholder-gray-500 focus:outline-none"
      />
    </div>
  );
};

export default Navbar;
