import { CNLEvent, UserMessageEvent } from "@/types/events";
import { ConversationHistoryMessage } from "@/types/loggedConversations";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import ChatUI from "./chatUi";
import { Theme } from "./types";

export default function ChatUIEngineWrapper({
  conversationId,
  engineUrl,
  initialHistory,
  onHistoryChange,
  theme,
}: {
  conversationId: string;
  engineUrl: string;
  initialHistory: ConversationHistoryMessage[];
  onHistoryChange: ({}: { newHistory: ConversationHistoryMessage[] }) => any;
  theme: Theme;
}) {
  const [history, setHistory] =
    useState<ConversationHistoryMessage[]>(initialHistory);

  useEffect(() => {
    onHistoryChange({ newHistory: history });
  }, [history]);

  const [showTypingAnimation, setShowTypingAnimation] =
    useState<boolean>(false);

  const updateHistoryAfterIcommingEvent = (event: CNLEvent) => {
    setHistory((prevHistory) => {
      if (event.type === "start-typing-animation") {
        setShowTypingAnimation(true);
        return prevHistory;
      }
      if (event.type === "bot-message") {
        setShowTypingAnimation(false);
        return [
          ...prevHistory,
          {
            from_: "bot",
            message_id: event.message_id,
            content: event.content,
          } as ConversationHistoryMessage,
        ];
      }
      if (event.type === "user-message") {
        return [
          ...prevHistory,
          {
            from_: "user",
            message_id: event.message_id,
            content: event.content,
          } as ConversationHistoryMessage,
        ];
      }
      return prevHistory;
    });
  };

  // Handle incomming events
  useEffect(() => {
    let isMounted = true; // Track if the component is mounted

    const fetchData = async () => {
      try {
        // maybe use axios
        const response = await fetch(
          `${engineUrl}/get_unread_for_front?conversation_id=${conversationId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const events: CNLEvent[] = await response.json();
        events.forEach((event) => updateHistoryAfterIcommingEvent(event));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        if (isMounted) {
          timeoutId = setTimeout(fetchData, 1000); // Wait for 1 second before making the next request
        }
      }
    };

    let timeoutId = setTimeout(fetchData, 1000);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  // Send message
  const mutation = useMutation({
    mutationFn: async ({ event }: { event: UserMessageEvent }) => {
      const { data } = await axios.post(`${engineUrl}/add_event`, event);
      return data;
    },
  });
  const onMessageSend = (message: string) => {
    const event: UserMessageEvent = {
      conversation_id: conversationId,
      type: "user-message",
      content: message,
      message_id: v4(),
    };

    mutation.mutate(
      {
        event,
      },
      {
        onSuccess(data) {},
        onError(error) {},
      }
    );

    // udpate history
    setHistory((prevHistory) => [
      ...prevHistory,
      {
        message_id: v4(),
        from_: "user",
        content: message,
      } as ConversationHistoryMessage,
    ]);
  };

  const onMessageSend_ = (message: string) => {
    setHistory((prevHistory) => [
      ...prevHistory,
      {
        message_id: v4(),
        from_: "user",
        content: message,
      } as ConversationHistoryMessage,
    ]);
  };
  return (
    <ChatUI
      history={history}
      allowMessageSend={true}
      onMessageSend={onMessageSend}
      showTypingAnimation={showTypingAnimation}
      theme={theme}
    />
  );
}
