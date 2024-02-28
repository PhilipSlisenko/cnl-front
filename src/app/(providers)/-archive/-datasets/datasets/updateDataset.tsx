import { Dataset } from "@/components/datasetsSamples/types";
import axios from "axios";

export const updateDataset = async ({
  newDataset,
}: {
  newDataset: Dataset;
}) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_CNL_LOCAL_URL}/dataset`,
    newDataset
  );
  return data;
};

export const mockUpdateDataset = async ({
  newDataset,
}: {
  newDataset: Dataset;
}) => {
  return new Promise((res) =>
    setTimeout(() => {
      res({});
    }, 1000)
  );
};
