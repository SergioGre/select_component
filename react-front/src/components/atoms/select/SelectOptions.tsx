import { FC, useRef, useEffect } from "react";
import { FixedSizeList } from "react-window";
import { SelectState } from "./types/selectState";
import { SelectOption } from "src/types/types";
import "./Select.css";

interface Props {
  state: SelectState;
  filteredOptions: SelectOption[];
  handleSelect(option: SelectOption): void;
}

export const SelectOptions: FC<Props> = ({
  state,
  filteredOptions,
  handleSelect,
}) => {
  const { selectedOption, focusedIndex, position } = state;

  const listRef = useRef<FixedSizeList>(null);

  useEffect(() => {
    if (state.focusedIndex >= 0 && listRef.current) {
      listRef.current.scrollToItem(state.focusedIndex, "smart");
    }
  }, [state.focusedIndex]);

  const OptionRow = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const option = filteredOptions[index];
    console.log("index", index);
    return (
      <div
        style={style}
        className={`option ${
          selectedOption?.value === option.value ? "selected" : ""
        } ${index === focusedIndex ? "focused" : ""}`}
        onClick={() => handleSelect(option)}
      >
        {option.name}
      </div>
    );
  };

  return (
    <div className={`select-options ${position}`}>
      <FixedSizeList
        ref={listRef}
        height={Math.min(250, filteredOptions.length * 36)}
        itemCount={filteredOptions.length}
        itemSize={36}
        width="100%"
      >
        {OptionRow}
      </FixedSizeList>
    </div>
  );
};
