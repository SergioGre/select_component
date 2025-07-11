import { SelectOption } from "src/types/types";

export interface SelectState {
  isOpen: boolean;
  filterText: string;
  focusedIndex: number;
  position: "bottom" | "top";
  selectedOption: SelectOption | null;
}