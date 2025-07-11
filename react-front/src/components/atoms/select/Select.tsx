import React, { useRef } from "react";
import { useDropdownPosition } from "./hooks/useDropdownPosition";
import { useClickOutside } from "./hooks/useClickOutside";
import { useSelectController } from "./hooks/useSelectController";
import { SelectInput } from "./SelectInput";
import { SelectOptions } from "./SelectOptions";
import "./Select.css";

interface SelectOption {
  name: string;
  value: string;
}

interface SelectProps {
  options: SelectOption[];
  onSelect?: (value: string) => void;
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  onSelect,
  placeholder = "Выберите опцию",
}) => {
  const { state, filteredOptions, updateState, handleKeyDown, handleSelect } =
    useSelectController(options, onSelect);

  const selectRef = useRef<HTMLDivElement>(null);

  useDropdownPosition(
    selectRef as React.RefObject<HTMLDivElement>,
    state.isOpen,
    updateState
  );

  useClickOutside(selectRef as React.RefObject<HTMLDivElement>, () =>
    updateState({ isOpen: false })
  );

  return (
    <div
      className="select-container"
      ref={selectRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <SelectInput
        state={state}
        updateState={updateState}
        placeholder={placeholder}
      />
      {state.isOpen && (
        <SelectOptions
          state={state}
          filteredOptions={filteredOptions}
          handleSelect={handleSelect}
        />
      )}
    </div>
  );
};
