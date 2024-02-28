import { Dataset } from "@/types/datasetsSamples";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import { mockDatasets } from "../app/(cnl-local)/datasets/mockDatasets";

export const mockFetchDatasets = (): Promise<Dataset[]> => {
  return new Promise((res) =>
    setTimeout(() => {
      res(mockDatasets);
    }, 1000)
  );
};

export const fetchDatasets = async ({
  queryKey,
}: QueryFunctionContext<[string]>): Promise<Dataset[]> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/datasets`
  );
  // sort by last_activity, latest first
  data.sort((a: Dataset, b: Dataset) =>
    b.last_activity.localeCompare(a.last_activity)
  );
  return data;
};
