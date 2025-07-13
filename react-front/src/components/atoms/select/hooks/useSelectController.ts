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
  const [isTyping, setIsTyping] = useState(false);

  const updateState = useCallback((updates: Partial<SelectState>) => {
    if ("filterText" in updates) {
      setIsTyping(updates.filterText !== "");
    }
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const filteredOptions = useMemo(() => {
    return isTyping
      ? options.filter((option) =>
          option.name.toLowerCase().startsWith(state.filterText.toLowerCase())
        )
      : options;
  }, [options, state.filterText, isTyping]);

  const handleSelect = useCallback(
    (option: SelectOption) => {
      updateState({
        isOpen: false,
        filterText: option.name,
        focusedIndex: -1,
        selectedOption: option,
      });
      setIsTyping(false);
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
