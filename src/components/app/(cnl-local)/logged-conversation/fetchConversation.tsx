import { LoggedConversation } from "@/types/loggedConversations";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import { mockLoggedConversation } from "./mockLoggedConversation";

export const fetchConversation = async ({
  queryKey,
}: QueryFunctionContext<
  [string, { conversationId: string }]
>): Promise<LoggedConversation> => {
  const [_key, { conversationId }] = queryKey;
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_CNL_LOCAL_URL}/logged_conversation`,
    {
      params: {
        conversation_id: conversationId,
      },
    }
  );
  return data;
};

export const mockFetchConversation = async ({
  queryKey,
}: QueryFunctionContext<
  [string, { conversationId: string }]
>): Promise<LoggedConversation> => {
  return new Promise((res) =>
    setTimeout(() => {
      res(mockLoggedConversation);
    }, 1000)
  );
};
