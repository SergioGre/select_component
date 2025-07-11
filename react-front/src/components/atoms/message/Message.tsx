import React from "react";
import "./Message.css";

interface Props {
  text: string;
}

export const Message: React.FC<Props> = ({ text }) => {
  return <div className="text-box">{text}</div>;
};
