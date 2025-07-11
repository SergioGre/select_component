import { useDispatch } from "react-redux";
import { setSelectedValue } from "src/store/slices/selectedValueSlice";

export const useSelectedValue = () => {
  const dispatch = useDispatch();

  return (value: string | null) => {
    dispatch(setSelectedValue(value));
  };
};
