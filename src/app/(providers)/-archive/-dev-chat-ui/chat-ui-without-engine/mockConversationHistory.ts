import { HistoryItem } from "@/components/chatUi/types";

export const mockConversationHistory = [
  {
    type: "text",
    message_id: "e3b0c442-98fc-4c19-a1d8-93b0e1934b7c",
    from_: "bot",
    content: "This is a sample message from the bot.",
    dataset_samples: [
      {
        sample_id: "d06daa44-61c5-47c1-913f-98715535b95b",
        name: "Dataset sample 1",
        created_at: "",
        content: {
          messages: [
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
          ],
        },
      },
    ],
    tags: [],
    user_feedback: "oki",
  },
  {
    type: "text",
    message_id: "1e7f8de8-7c3d-4f4b-8b7f-2a4f67f1f2a9",
    from_: "user",
    content: "This is a sample message from the user.",
    dataset_samples: [],
    tags: [],
    user_feedback: "",
  },
  {
    type: "text",
    message_id: "f4d5b2b2-cd00-43ac-a85d-4dfe538b4e71",
    from_: "bot",
    content: "Another example message from the bot.",
    dataset_samples: [],
    tags: [],
    user_feedback: "",
  },
  {
    type: "text",
    message_id: "d4425a29-59c8-41f2-9b69-f674a07c1bde",
    from_: "bot",
    content: "Another example message from the bot.",
    dataset_samples: [],
    tags: [],
    user_feedback: "",
  },
  {
    type: "text",
    message_id: "5c91d34c-9b8b-4a9f-9f1d-91c20a76b3b8",
    from_: "user",
    content: "Another example message from the user.",
    dataset_samples: [],
    tags: [],
    user_feedback: "",
  },
  {
    type: "text",
    message_id: "5aa5b2996-5098-4b06-a00c-d16552d1b5b3",
    from_: "user",
    content: "Another example message from the user.",
    dataset_samples: [],
    tags: [],
    user_feedback: "",
  },
] as unknown as HistoryItem[];
