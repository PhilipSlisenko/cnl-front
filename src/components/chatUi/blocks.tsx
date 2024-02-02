import { Inter } from "next/font/google";
import { useContext, useState } from "react";
import { ThemeContext } from "./themeContext";

import clsx from "clsx";
import { ThumbsDown } from "lucide-react";
import { HistoryItem } from "./types";
import styles from "./typingAnimationBlock.module.css";

const inter = Inter({ subsets: ["cyrillic", "greek", "latin", "vietnamese"] });

export function TypingAnimationBlock() {
  const theme = useContext(ThemeContext);
  const commonClasses = clsx(
    "rounded-2xl px-7 py-3 shadow mx-1 w-min",
    inter.className
  );
  const botMessageClasses = clsx("bg-white rounded-bl-none mr-2");
  let finalClasses;
  finalClasses = clsx(commonClasses, botMessageClasses);

  return (
    <div
      className={clsx(finalClasses)}
      style={{
        backgroundColor: theme.botMessageBgColor,
        color: theme.botMessageTextColor,
      }}
    >
      <div className={styles["dot-flashing"]}></div>
    </div>
  );
}

export function BotMessageBlock({
  content,
  allowFeedback,
  onFeedback,
}: {
  content: string;
  onFeedback: Function;
  allowFeedback: boolean;
}) {
  const theme = useContext(ThemeContext);
  const commonClasses = clsx(
    "rounded-2xl px-3 py-2 shadow  mx-1 max-w-max",
    inter.className
  );
  const botMessageClasses = clsx("rounded-bl-none mr-2");
  const finalClasses = clsx(commonClasses, botMessageClasses);

  const [showModal, setShowModal] = useState(false);
  const handleDislikeClick = () => {
    // show modal
    // pass callback to modal - on modal close - returns with {status: success | failure, content: string}
    onFeedback();
  };

  const handleFeedbackSubmit = () => {
    // send request to back with conversation id, message id, feedback content
    setShowModal(false);
  };
  const onCloseFeedbackModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex w-full">
      <div className="group flex w-full">
        <div
          className={clsx(finalClasses)}
          style={{
            backgroundColor: theme.botMessageBgColor,
            color: theme.botMessageTextColor,
          }}
        >
          {content}
        </div>
        {allowFeedback && (
          <div className="self-center opacity-0 transition-opacity group-hover:opacity-100">
            <button
              className="rounded-sm p-1 hover:bg-gray-200"
              onClick={handleDislikeClick}
            >
              <ThumbsDown className="w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function UserMessageBlock({ content }: { content: string }) {
  const theme = useContext(ThemeContext);
  const commonClasses = clsx(
    "rounded-2xl px-3 py-2 shadow mx-1 max-w-max",
    inter.className
  );
  const userMessageClasses = clsx("rounded-br-none ml-2");
  const finalClasses = clsx(commonClasses, userMessageClasses);

  return (
    <div className="flex w-full justify-end">
      <div
        className={clsx(finalClasses)}
        style={{
          backgroundColor: theme.userMessageBgColor,
          color: theme.userMessageTextColor,
        }}
      >
        {content}
      </div>
    </div>
  );
}

export function getBlockElement(
  block: HistoryItem,
  allowFeedback: boolean,
  onFeedback: Function
): React.ReactElement | undefined {
  if (block.type === "text" && block.from_ === "bot") {
    return (
      <BotMessageBlock
        content={block.content}
        key={block.message_id}
        onFeedback={() => onFeedback(block.message_id)}
        allowFeedback={allowFeedback}
      />
    );
  } else if (block.type === "text" && block.from_ === "user") {
    return <UserMessageBlock content={block.content} key={block.message_id} />;
  }
}
