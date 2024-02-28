"use client";
import { MessageDetailsCard } from "@/components/app/(cnl-local)/logged-conversation/messageDetails";
import ChatUI from "@/components/chatUi/chatUi";

import { ConversationHistoryMessage } from "@/types/loggedConversations";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { fetchConversation } from "./fetchConversation";

export default function ROChatUIAndDebugWindow({
  conversationId,
}: {
  conversationId: string;
}) {
  const {
    data: conversation,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["logged-conversation", { conversationId }],
    // queryFn: mockFetchConversation,
    queryFn: fetchConversation,
  });

  const [selectedMessage, setSelectedMessage] =
    useState<ConversationHistoryMessage | null>(null);

  return (
    <div className="h-full flex justify-center gap-8">
      {!isLoading ? (
        <>
          <div className="h-full flex flex-col w-[400px] border rounded-lg">
            <ChatUI
              history={conversation?.conversation_history || []}
              allowMessageClick={true}
              onMessageClick={({ message_id }: { message_id: string }) =>
                setSelectedMessage(
                  conversation?.conversation_history.find(
                    (historyItem) => historyItem.message_id === message_id
                  ) || null
                )
              }
            />
          </div>
          <div className="w-[400px] border rounded-lg">
            <MessageDetailsCard historyItem={selectedMessage} />
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center">
          <Loader2Icon className="size-8 animate-spin" />
        </div>
      )}
    </div>
  );
}
