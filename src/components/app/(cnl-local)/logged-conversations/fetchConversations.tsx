import { LoggedConversation } from "@/types/loggedConversations";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import { mockConversations } from "./mockConversations";

export const mockFetchConversations = (): Promise<LoggedConversation[]> => {
  return new Promise((res) =>
    setTimeout(() => {
      res(mockConversations);
    }, 1000)
  );
};

export const fetchConversations = async ({
  queryKey,
}: QueryFunctionContext<[string]>): Promise<LoggedConversation[]> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_CNL_LOCAL_URL}/logged_conversations`
  );
  // sort by last_activity, latest first
  data.sort((a: LoggedConversation, b: LoggedConversation) =>
    b.last_activity.localeCompare(a.last_activity)
  );
  return data;
};
