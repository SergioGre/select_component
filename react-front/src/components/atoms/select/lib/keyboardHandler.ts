import { SelectOption } from "src/types/types";
import { SelectState } from "../types/selectState";

interface KeyboardHandlerArgs {
  isOpen: boolean;
  focusedIndex: number;
  filteredOptions: SelectOption[];
  updateState: (updates: Partial<SelectState>) => void;
  handleSelect: (option: SelectOption) => void;
}

export const keyboardHandler =
  ({
    isOpen,
    focusedIndex,
    filteredOptions,
    updateState,
    handleSelect,
  }: KeyboardHandlerArgs) =>
  (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === " ") {
        updateState({ isOpen: true });
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        updateState({
          focusedIndex: Math.min(focusedIndex + 1, filteredOptions.length - 1),
        });
        e.preventDefault();
        break;
      case "ArrowUp":
        updateState({
          focusedIndex: Math.max(focusedIndex - 1, 0),
        });
        e.preventDefault();
        break;
      case "Enter":
        if (focusedIndex >= 0) {
          handleSelect(filteredOptions[focusedIndex]);
        }
        e.preventDefault();
        break;
      case "Escape":
        updateState({ isOpen: false });
        e.preventDefault();
        break;
    }
  };
