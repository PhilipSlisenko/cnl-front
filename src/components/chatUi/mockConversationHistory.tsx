import { ConversationHistoryMessage } from "@/types/loggedConversations";

export const mockConversationHistory: ConversationHistoryMessage[] = [
  {
    timestamp: "",
    message_id: "e3b0c442-98fc-4c19-a1d8-93b0e1934b7c",
    from_: "bot",
    content: "This is a sample message from the bot.",
    dataset_samples: [
      {
        dataset_id: "78ed7c92-82b1-48a7-a73a-b362e14f8b77",
        sample_id: "d06daa44-61c5-47c1-913f-98715535b95b",
        sample_name: "Dataset sample 1",
        last_activity: "",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant",
          },
          {
            role: "user",
            content: "What's 2 + 2?",
          },
          {
            role: "assistant",
            content: "It's 4",
          },
        ],
      },
    ],

    feedback: "oki",
  },
  {
    timestamp: "",
    message_id: "1e7f8de8-7c3d-4f4b-8b7f-2a4f67f1f2a9",
    from_: "user",
    content: "This is a sample message from the user.",
    dataset_samples: [],

    feedback: "",
  },
  {
    timestamp: "",
    message_id: "f4d5b2b2-cd00-43ac-a85d-4dfe538b4e71",
    from_: "bot",
    content: "Another example message from the bot.",
    dataset_samples: [],

    feedback: "",
  },
  {
    timestamp: "",
    message_id: "d4425a29-59c8-41f2-9b69-f674a07c1bde",
    from_: "bot",
    content: "Another example message from the bot.",
    dataset_samples: [],

    feedback: "",
  },
  {
    timestamp: "",
    message_id: "5c91d34c-9b8b-4a9f-9f1d-91c20a76b3b8",
    from_: "user",
    content: "Another example message from the user.",
    dataset_samples: [],

    feedback: "",
  },
  {
    timestamp: "",
    message_id: "5aa5b2996-5098-4b06-a00c-d16552d1b5b3",
    from_: "user",
    content: "Another example message from the user.",
    dataset_samples: [],

    feedback: "",
  },
];
