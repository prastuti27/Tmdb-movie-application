import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
  icon?: React.ReactNode;
}

const Button = ({ text, onClick, className, icon }: ButtonProps) => {
  return (
    <button onClick={onClick} className={className}>
      {icon && <span className="mr-1 font-semibold">{icon}</span>}
      {text}
    </button>
  );
};

export default Button;
