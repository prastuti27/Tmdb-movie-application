import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      className="bg-gray-300 p-3 mr-5 mt-5 font-semibold rounded-2xl"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
