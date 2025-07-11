import { SelectOption } from "./types/types";

export const generateOptions = (count: number = 100000): SelectOption[] => {
    return Array.from({ length: count }, (_, i) => ({
        name: `${i + 1}`,
        value: `${i + 1}`,
    }));
};