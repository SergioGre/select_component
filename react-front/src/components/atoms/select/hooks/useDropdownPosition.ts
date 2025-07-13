import { useLayoutEffect } from "react";
import { SelectState } from "../types/selectState";

export const useDropdownPosition = (
  ref: React.RefObject<HTMLDivElement>,
  isOpen: boolean,
  updateState: (updates: Partial<SelectState>) => void
) => {
  useLayoutEffect(() => {
    if (isOpen && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      updateState({ position: spaceBelow < 250 ? "top" : "bottom" });
    }
  }, [isOpen, ref, updateState]);
};

// Использую тут LayoutEffect чтобы избы избежать дерганной анимации открытия списка вверх.
// Т.к позиция по умолчанию - вверх, без LayoutEffect, список будет открываться сначала вверх, а потом вниз.
