import { DatasetSampleMessage } from "@/components/datasetsSamples/types";

export const mockInitialMessages: DatasetSampleMessage[] = [
  {
    role: "system",
    content: "You are friendly assistant",
  },
  {
    role: "user",
    content: "What is 2 + 2?",
  },
  {
    role: "assistant",
    content: "It's 4",
  },
];
