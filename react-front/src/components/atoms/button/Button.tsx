import React, { KeyboardEvent } from "react";
import "./Button.css";

interface ButtonProps {
  buttonText: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ buttonText, onClick }) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <input
      type="button"
      className="button-body"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      value={buttonText}
      aria-label={buttonText}
    />
  );
};
