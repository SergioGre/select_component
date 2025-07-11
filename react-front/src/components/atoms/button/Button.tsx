import React, { KeyboardEvent } from "react";
import "./Button.css";

interface ButtonProps {
  buttonText: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ buttonText, onClick }) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      className="button-body"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={buttonText}
    >
      <span className="button-text">{buttonText}</span>
    </div>
  );
};
