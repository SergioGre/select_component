import { useCallback, useMemo, useState } from "react";
import { SelectState } from "../types/selectState";
import { INITIAL_SELECT_STATE } from "../constants/initialSelectState";
import { SelectOption } from "src/types/types";
import { keyboardHandler } from "../lib/keyboardHandler";

export const useSelectController = (
  options: SelectOption[],
  onSelect?: (value: string) => void
) => {
  const [state, setState] = useState(INITIAL_SELECT_STATE);

  const updateState = useCallback(
    (updates: Partial<SelectState>) =>
      setState((prev) => ({ ...prev, ...updates })),
    []
  );

  const filteredOptions = useMemo(() => {
    return options.filter((option) =>
      option.name.toLowerCase().startsWith(state.filterText.toLowerCase())
    );
  }, [options, state.filterText]);

  const handleSelect = useCallback(
    (option: SelectOption) => {
      updateState({
        isOpen: false,
        filterText: option.name,
        focusedIndex: -1,
        selectedOption: option,
      });
      onSelect?.(option.value);
    },
    [onSelect, updateState]
  );

  const handleKeyDown = keyboardHandler({
    isOpen: state.isOpen,
    focusedIndex: state.focusedIndex,
    filteredOptions,
    updateState,
    handleSelect,
  });

  return {
    state,
    filteredOptions,
    updateState,
    handleSelect,
    handleKeyDown,
  };
};
