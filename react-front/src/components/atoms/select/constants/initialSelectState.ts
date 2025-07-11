import { SelectState } from "../types/selectState";

export const INITIAL_SELECT_STATE: SelectState = {
  isOpen: false,
  filterText: "",
  focusedIndex: -1,
  position: "bottom",
  selectedOption: null,
};
