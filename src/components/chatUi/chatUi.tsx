import { ConversationHistoryMessage } from "@/types/loggedConversations";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import TextareaAutosize from "react-textarea-autosize";
import BlocksContainer from "./blocksContainer";
import { defaultTheme } from "./defaultTheme";
import FeedbackModal from "./feedbackModal";
import { ThemeContext } from "./themeContext";
import { Theme } from "./types";

export default function ChatUI({
  history,
  showTypingAnimation = false,
  allowMessageSend = false,
  onMessageSend = () => {},
  allowMessageClick = false,
  onMessageClick = () => {},
  allowFeedback = false,
  theme = defaultTheme,
}: {
  history: ConversationHistoryMessage[];
  showTypingAnimation?: boolean;
  allowMessageSend?: boolean;
  onMessageSend?: Function;
  allowMessageClick?: boolean;
  onMessageClick?: ({ message_id }: { message_id: string }) => any;
  allowFeedback?: boolean;
  theme?: Theme;
}) {
  // Input
  const [historyState, setHistoryState] = useState<
    ConversationHistoryMessage[]
  >([]);
  const [blockContainerPaddingBottom, setBlockContainerPaddingBottom] =
    useState<number>(allowMessageSend ? 100 : 0);
  const [userInput, setUserInput] = useState<string>("");

  // #region - Limit the height of ChatUI to initially provided space
  // See your height without rendering any messages - fixate that height and render messages
  const [chatMaxHeight, setChatMaxHeight] = useState<number>(0);

  useEffect(() => {
    const chatUiElement = document.getElementById("cnl-chat-ui") as HTMLElement;
    const chatUiHeight = chatUiElement.offsetHeight;
    setChatMaxHeight(chatUiHeight);
    setHistoryState(history);

    console.log(`Chat UI height: ${chatUiHeight}px`);
  }, []);
  // #endregion

  useEffect(() => {
    setHistoryState(history);
  }, [history]);

  const handleMessageSend = () => {
    onMessageSend(userInput);

    setUserInput("");
  };

  const handleKeyDownInTextArea = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      // event.stopPropagation();
      handleMessageSend();
      event.preventDefault();
    }
  };

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--cnl-typing-animation-dots-color",
      theme.botMessageTextColor
    );
    document.documentElement.style.setProperty("--cnl-bg-color", theme.bgColor);
  }, [theme]);

  const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);
  const [feedbackMessageId, setFeedbackMessageId] = useState<string>("");

  // render
  return (
    <ThemeContext.Provider value={theme}>
      <div
        id="cnl-chat-ui"
        className={clsx(
          "relative mx-auto h-full w-full max-w-screen-md flex-col items-center "
        )}
        style={{
          backgroundColor: theme.bgColor,
          ...(chatMaxHeight !== 0 ? { maxHeight: `${chatMaxHeight}px` } : {}),
        }}
      >
        {/* Blocks */}
        <BlocksContainer
          blocks={historyState}
          paddingBottom={blockContainerPaddingBottom}
          showTypingAnimation={showTypingAnimation}
          onMessageClick={onMessageClick}
          allowMessageClick={allowMessageClick}
          allowFeedback={allowFeedback}
          onFeedback={(messageId: string) => {
            setFeedbackMessageId(messageId);
            setShowFeedbackModal(true);
          }}
        />
        {/* Input */}
        {allowMessageSend && (
          <div
            className={clsx(
              `absolute bottom-0 flex w-full  rounded-3xl bg-gradient-to-t from-[var(--cnl-bg-color)] from-60% pb-3 pl-3 pt-3 `
            )}
          >
            <TextareaAutosize
              maxRows={2}
              className="flex-grow resize-none  rounded-3xl p-3 shadow focus:border-none focus:outline-none  focus:ring-0"
              onHeightChange={(height) => {
                setBlockContainerPaddingBottom(height + 16);
              }}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDownInTextArea}
              value={userInput}
            />
            <button
              className="my-1 ml-2 mr-3 max-h-full"
              onClick={() => handleMessageSend()}
            >
              <PaperAirplaneIcon className="size-7 opacity-80" />
            </button>
          </div>
        )}
        {/* Feedback modal */}
        {showFeedbackModal &&
          ReactDOM.createPortal(
            <FeedbackModal
              onClose={() => setShowFeedbackModal(!showFeedbackModal)}
            />,
            document.getElementById("cnl-chat-ui") as Element
          )}
        {/* Infinity pool top strip */}
        {/* <div className="w-full h-2 absolute bg-gradient-to-b from-[var(--cnl-bg-color)] top-0"></div> */}
      </div>
    </ThemeContext.Provider>
  );
}
