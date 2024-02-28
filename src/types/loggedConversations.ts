import { DatasetSample } from "./datasetsSamples";

export interface LoggedConversation {
  conversation_id: string;
  last_activity: string;
  conversation_history: ConversationHistory;
}

export type ConversationHistory = ConversationHistoryMessage[];

export interface ConversationHistoryMessage {
  message_id: string;
  from_: "bot" | "user";
  content: string;
  dataset_samples: DatasetSample[];
  feedback: string;
  timestamp: string;
}
