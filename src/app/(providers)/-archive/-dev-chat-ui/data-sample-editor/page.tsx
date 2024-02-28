"use client";

import {
  DataSammpleSaveToDatasetControls,
  DataSampleMessagesEditor,
} from "@/components/datasetsSamples/datasetSampleViewEdit";
import { mockDatasets } from "./mockDatasets";
import { mockInitialMessages } from "./mockInitialMessages";

export default function Page() {
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
