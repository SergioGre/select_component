import React, { useEffect, useState } from "react";
import { SelectOption } from "../../types/types";
import { SelectForm } from "components/molecules/InputForm/SelectForm";
import { MessageBox } from "components/molecules/MessageBox/MessageBox";
import { fetchOptions, setOption } from "src/api/optionsApi";
import { useDispatch } from "react-redux";
import { addMessage } from "src/store/slices/messageSlice";

const UNKNOWN_ERROR_MESSAGE = "Unknown error occurred";
const INVALID_FORMAT_MESSAGE = "Invalid server response format";

export const MainPage: React.FC = () => {
  const [data, setData] = useState<SelectOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    fetchOptions()
      .then(async (response) => {
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const options = await response.json();
        if (!Array.isArray(options)) throw new Error(INVALID_FORMAT_MESSAGE);
        setData(options);
      })
      .catch((error) => {
        dispatch(addMessage(error.message || UNKNOWN_ERROR_MESSAGE));
      })
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  return (
    <div>
      {isLoading ? (
        <div>Loading data...</div>
      ) : (
        <>
          <SelectForm options={data} />
          <MessageBox />
        </>
      )}
    </div>
  );
};
