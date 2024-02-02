"use client";

import {
  DataSammpleSaveToDatasetControls,
  DataSampleMessagesEditor,
} from "@/components/datasets/datasetSampleViewEdit";
import { mockDatasets } from "./mockDatasets";
import { mockInitialMessages } from "./mockInitialMessages";

export default function page() {
  return (
    <div>
      <DataSampleMessagesEditor
        initialMessages={mockInitialMessages}
        onChange={() => {}}
      />
      <DataSammpleSaveToDatasetControls
        datasets={mockDatasets}
        onClose={({ status }) => {}}
      />
    </div>
  );
}
