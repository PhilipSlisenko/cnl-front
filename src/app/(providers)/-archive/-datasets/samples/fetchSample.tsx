import { DatasetSample } from "@/components/datasetsSamples/types";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import { mockSamples } from "./mockSamples";

export const fetchSample = async ({
  queryKey,
}: QueryFunctionContext<
  [string, { datasetId: string; sampleId: string }]
>): Promise<DatasetSample> => {
  const [_key, { datasetId, sampleId }] = queryKey;
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_CNL_LOCAL_URL}/sample`,
    {
      params: {
        dataset_id: datasetId,
        sample_id: sampleId,
      },
    }
  );
  return data;
};

export const mockFetchSample = async ({
  queryKey,
}: QueryFunctionContext<
  [string, { datasetId: string; sampleId: string }]
>): Promise<DatasetSample> => {
  return new Promise((res) =>
    setTimeout(() => {
      res(mockSamples[0]);
    }, 1000)
  );
};
