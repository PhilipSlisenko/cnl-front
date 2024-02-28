import { DatasetSample } from "@/types/datasetsSamples";
import axios from "axios";

export const updateSample = async ({
  newSample,
}: {
  newSample: DatasetSample;
}) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_CNL_LOCAL_URL}/sample`,
    newSample
  );
  return data;
};

export const mockUpdateSample = async ({
  newSample,
}: {
  newSample: DatasetSample;
}) => {
  return new Promise((res) =>
    setTimeout(() => {
      res({});
    }, 1000)
  );
};
