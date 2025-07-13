import { SelectOption } from "src/types/types";
import { Dispatch } from "@reduxjs/toolkit";
import { addMessage } from "../store/slices/messageSlice";

const API_BASE_URL = "http://localhost:8080";
const UNKNOWN_ERROR_MESSAGE = "Unknown error occurred";

export async function fetchOptions(
  dispatch: Dispatch
): Promise<SelectOption[] | void> {
  try {
    const response = await fetch(`${API_BASE_URL}/option/for/select`);

    if (!response.ok) {
      throw new Error(
        response.status === 404 ? "Not found" : "Something went wrong"
      );
    }

    const options = await response.json();
    if (options && Array.isArray(options)) {
      return options;
    }
    throw new Error("Invalid options format");
  } catch (error) {
    dispatch(
      addMessage(error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE)
    );
  }
}

export async function setOption(
  value: string,
  dispatch: Dispatch
): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/selected/option`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value }),
    });

    if (!response.ok) {
      throw new Error("Failed to post selection");
    }

    const result = await response.json();
    dispatch(addMessage(result.message));
  } catch (error) {
    dispatch(
      addMessage(error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE)
    );
  }
}
