export interface UserMessageEvent {
  type: "user-message";
  conversation_id: string;
  message_id: string;
  content: string;
}

export interface BotMessageEvent {
  type: "bot-message";
  conversation_id: string;
  message_id: string;
  content: string;
}

export interface StartTypingAnimationEvent {
  type: "start-typing-animation";
  conversation_id: string;
}

export type CNLEvent =
  | UserMessageEvent
  | BotMessageEvent
  | StartTypingAnimationEvent;
