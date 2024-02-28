import { ConversationHistoryMessage } from "@/types/loggedConversations";
import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { TypingAnimationBlock, getBlockElement } from "./blocks";
import styles from "./noScrollBar.module.css";
function BlockTopMarginWrapper({
  children,
  type,
}: {
  children: React.ReactNode;
  type: "first" | "middle";
}) {
  if (type === "first") {
    return <div className="mt-2">{children}</div>;
  }
  if (type === "middle") {
    return <div className="mt-1">{children}</div>;
  }
}

function BlockAppearAnimationWrapper({
  children,
  show = true,
}: {
  children: React.ReactNode;
  show?: boolean;
}) {
  return (
    <Transition
      appear={true}
      show={show}
      enter="transition ease-in duration-75"
      enterFrom="opacity-0 translate-y-2"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-75"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-2"
    >
      {children}
    </Transition>
  );
}

export default function BlocksContainer({
  blocks,
  paddingBottom = 0,
  showTypingAnimation = false,
  allowMessageClick = false,
  onMessageClick = () => {},
  allowFeedback = false,
  onFeedback = () => {},
}: {
  blocks: ConversationHistoryMessage[];
  paddingBottom?: number;
  showTypingAnimation?: boolean;
  allowMessageClick?: boolean;
  onMessageClick?: ({ message_id }: { message_id: string }) => any;
  allowFeedback?: boolean;
  onFeedback?: Function;
}) {
  const customStyles: React.CSSProperties = {
    paddingBottom: `${paddingBottom + 5}px`,
  };

  return (
    <div
      className={clsx(
        "h-full max-h-full gap-2 overflow-auto px-4",
        styles["no-scrollbar"]
      )}
      style={customStyles}
    >
      {blocks.map((block, index) => {
        // base
        let BlockComponentToRender = (
          <div
            onClick={() => {
              onMessageClick({ message_id: block.message_id });
            }}
            className={clsx(allowMessageClick && "hover:cursor-pointer")}
          >
            {getBlockElement(block, allowFeedback, onFeedback)}
          </div>
        );
        // styles depending on where message is in relation to other messages
        if (index > 0 && blocks[index - 1].from_ === block.from_) {
          BlockComponentToRender = (
            <BlockTopMarginWrapper type="middle">
              {BlockComponentToRender}
            </BlockTopMarginWrapper>
          );
        } else {
          BlockComponentToRender = (
            <BlockTopMarginWrapper type="first">
              {BlockComponentToRender}
            </BlockTopMarginWrapper>
          );
        }
        if (index === blocks.length - 1) {
          BlockComponentToRender = (
            <BlockAppearAnimationWrapper>
              {BlockComponentToRender}
            </BlockAppearAnimationWrapper>
          );
        }
        BlockComponentToRender = (
          <div key={block.message_id}>{BlockComponentToRender}</div>
        );
        return BlockComponentToRender;
      })}

      <BlockAppearAnimationWrapper show={showTypingAnimation}>
        <TypingAnimationBlock />
      </BlockAppearAnimationWrapper>
    </div>
  );
}
