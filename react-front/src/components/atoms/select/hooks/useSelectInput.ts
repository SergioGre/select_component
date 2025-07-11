import { useCallback, useRef } from "react";
import { SelectState } from "../types/selectState";
import { useSelectedValue } from "src/hooks/useSelectedValue";

export const useSelectInput = (
  state: SelectState,
  updateState: (state: Partial<SelectState>) => void
) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const saveValue = useSelectedValue();

  const handleInputClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      updateState({ isOpen: !state.isOpen });
    },
    [state.isOpen, updateState]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateState({
        filterText: e.target.value,
        isOpen: true,
        focusedIndex: -1,
      });
      saveValue(e.target.value);
    },
    [updateState]
  );

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      updateState({ filterText: "", selectedOption: null });
      saveValue(null);
      inputRef.current?.focus();
    },
    [updateState]
  );

  return {
    inputRef,
    handleInputClick,
    handleInputChange,
    handleClear,
  };
};
