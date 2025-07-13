import React, { useEffect, useState } from "react";
import { SelectOption } from "../../types/types";
import { SelectForm } from "components/molecules/InputForm/SelectForm";
import { MessageBox } from "components/molecules/MessageBox/MessageBox";
import { fetchOptions } from "src/api/optionsApi";
import { useDispatch } from "react-redux";

export const MainPage: React.FC = () => {
  const [data, setData] = useState<SelectOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    fetchOptions(dispatch)
      .then((options) => {
        if (options) {
          setData(options);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>Загрузка данных</div>
      ) : (
        <>
          <SelectForm options={data} />
          <MessageBox />
        </>
      )}
    </div>
  );
};
