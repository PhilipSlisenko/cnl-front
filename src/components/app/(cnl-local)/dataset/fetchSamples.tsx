import { DatasetSample } from "@/types/datasetsSamples";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import { mockSamples } from "./mockSamples";

export const fetchSamples = async ({
  queryKey,
}: QueryFunctionContext<[string, { datasetId: string }]>): Promise<
  DatasetSample[]
> => {
  const [_key, { datasetId }] = queryKey;
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_CNL_LOCAL_URL}/samples`,
    {
      params: {
        dataset_id: datasetId,
      },
    }
  );
  // sort by last_activity, latest first
  data.sort((a: DatasetSample, b: DatasetSample) =>
    b.last_activity.localeCompare(a.last_activity)
  );
  return data;
};

export const mockFetchSamples = async ({
  queryKey,
}: QueryFunctionContext<[string, { datasetId: string }]>): Promise<
  DatasetSample[]
> => {
  return new Promise((res) =>
    setTimeout(() => {
      res(mockSamples);
    }, 1000)
  );
};
