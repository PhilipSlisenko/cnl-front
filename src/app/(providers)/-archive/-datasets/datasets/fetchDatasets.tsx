import { mockDatasets } from "./mockDatasets";
import { Dataset } from "./types";

export const mockFetchDatasets = (): Promise<Dataset[]> => {
  return new Promise((res) =>
    setTimeout(() => {
      res(mockDatasets);
    }, 1000)
  );
};
