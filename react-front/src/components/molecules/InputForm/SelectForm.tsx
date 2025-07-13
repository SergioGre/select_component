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
    if (!value) {
      dispatch(addMessage("Отсутствует значение"));
      return;
    }

    if (!options.find((option) => option.value === value)) {
      dispatch(addMessage("Недопустимое значение"));
      return;
    }

    try {
      const result = await setOption(value);
      dispatch(addMessage(result.message));
    } catch (error) {
      dispatch(
        addMessage(
          error instanceof Error
            ? error.message
            : "Произошла ошибка при сохранении"
        )
      );
    }
  };

  return (
    <div className="select-form">
      <Select options={options} onSelect={saveValue} />
      <Button buttonText="Отправить" onClick={handleSubmit} />
    </div>
  );
};
