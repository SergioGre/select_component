import express, { Request, Response } from "express";
import cors from "cors";
import {
  SelectOption,
  SelectedOptionRequest,
  ServerResponse,
} from "./types/types";
import { generateOptions } from "./generateData";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get(`/option/for/select`, (req: Request, res: Response<SelectOption[]>) => {
  const options = generateOptions();
  res.json(options);
});
app.post(
  `/selected/option`,
  (
    req: Request<{}, {}, SelectedOptionRequest>,
    res: Response<ServerResponse>
  ) => {
    const selectedValue = req.body.value;
    res.json({
      message: `Выбранная опция ${selectedValue} успешно принята.`,
    });
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
