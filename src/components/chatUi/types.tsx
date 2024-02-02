import { DatasetSample } from "../datasets/types";

export interface Theme {
  accentColor: string;
  bgColor: string;
  userMessageBgColor: string;
  userMessageTextColor: string;
  botMessageBgColor: string;
  botMessageTextColor: string;
  size: "sm" | "lg";
  rounded: string;
}

export interface HistoryItem {
  type: "text";
  message_id: string;
  from_: "bot" | "user";
  content: string;
  dataset_samples: DatasetSample[];
  tags: string[];
  user_feedback: string;
  timestamp: string;
}
