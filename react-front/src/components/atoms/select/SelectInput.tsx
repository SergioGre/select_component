import { FC } from "react";
import { SelectState } from "./types/selectState";
import { useSelectInput } from "./hooks/useSelectInput";
import "./Select.css";

interface Props {
  state: SelectState;
  updateState(state: Partial<SelectState>): void;
  placeholder: string;
}

export const SelectInput: FC<Props> = ({ state, updateState, placeholder }) => {
  const { isOpen, filterText, selectedOption } = state;
  const { inputRef, handleInputClick, handleInputChange, handleClear } =
    useSelectInput(state, updateState);

  return (
    <div
      className={`select-input ${isOpen ? "open" : ""}`}
      onClick={handleInputClick}
    >
      <input
        ref={inputRef}
        type="text"
        className="select-input-field"
        value={filterText}
        onChange={handleInputChange}
        placeholder={selectedOption ? "" : placeholder}
      />
      {filterText && (
        <button className="clear-button" onClick={handleClear}>
          ×
        </button>
      )}
      <div className="dropdown-icon">▼</div>
    </div>
  );
};
