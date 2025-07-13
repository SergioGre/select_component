import React from "react";
import "./SelectForm.css";
import { SelectOption } from "src/types/types";
import { Select, Button } from "components/atoms";
import { useSelectedValue } from "src/hooks/useSelectedValue";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store";
import { setOption } from "src/api/optionsApi";
import { addMessage } from "src/store/slices/messageSlice";
interface InputFormProps {
  options: SelectOption[];
}

export const SelectForm: React.FC<InputFormProps> = ({ options }) => {
  const value = useSelector((state: RootState) => state.selectedValue);
  const saveValue = useSelectedValue();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (value) {
      if (options.find((option) => option.value === value)) {
        await setOption(value, dispatch);
      } else {
        dispatch(addMessage("Недопустимое значение"));
      }
    } else {
      dispatch(addMessage("Отсутствует значение"));
    }
  };

  return (
    <div className="select-form">
      <Select options={options} onSelect={saveValue} />
      <Button buttonText="Отправить" onClick={handleSubmit} />
    </div>
  );
};
