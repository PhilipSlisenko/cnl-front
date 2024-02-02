export interface DatasetSample {
  sample_id: string;
  name: string;
  created_at: string;
  content: DatasetSampleContent;
}

export interface DatasetSampleContent {
  messages: DatasetSampleMessage[];
}

export interface DatasetSampleMessage {
  role: Role;
  content: string;
}

export type Role = "system" | "user" | "assistant";

export interface Dataset {
  dataset_id: string;
  dataset_name: string;
}
