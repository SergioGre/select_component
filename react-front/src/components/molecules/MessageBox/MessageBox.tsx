import { Message } from "components/atoms";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import "./MessageBox.css";

export const MessageBox: React.FC = () => {
  const message: string = useSelector((state: RootState) => state.messageSlice);

  return (
    <div className="message-box">
      <Message text={message} />
    </div>
  );
};
