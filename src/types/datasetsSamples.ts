export interface Dataset {
  dataset_id: string;
  dataset_name: string;
  last_activity: string;
  samples: DatasetSample[];
}

export interface DatasetSample {
  dataset_id: string;
  sample_id: string;
  sample_name: string;
  last_activity: string;
  messages: DatasetSampleMessage[];
}

export interface DatasetSampleMessage {
  role: Role;
  content: string;
}

export type Role = "system" | "assistant" | "user";
