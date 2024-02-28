"use client";
import { MessageDetailsCard } from "@/components/app/(cnl-local)/logged-conversation/messageDetails";
import { EngineConnectionConfig } from "@/components/app/dev-chat-ui/types";
import ChatUI from "@/components/chatUi/chatUi";
import { HistoryItem } from "@/components/chatUi/types";
import { Button } from "@/components/ui/button";
import { DatasetSample } from "@/types/datasetsSamples";
import { useState } from "react";
import { mockConversationHistory } from "./mockConversationHistory";

export default function ChatUIAndDebugWindow({
  config,
}: {
  config: EngineConnectionConfig;
}) {
  const [mode, setMode] = useState<"default" | "dataset-sample-view">(
    "default"
  );

  // default mode
  const [conversationHistory, setConversationHistory] = useState<HistoryItem[]>(
    mockConversationHistory
  );

  const [selectedMessage, setSelectedMessage] = useState<HistoryItem | null>(
    null
  );

  // dataset-sample-view mode
  const [datasetSample, setDatasetSample] = useState<DatasetSample | null>(
    null
  );

  const onDatasetSampleView = ({
    messageId,
    sampleId,
  }: {
    messageId: string;
    sampleId: string;
  }) => {
    const message = conversationHistory.find((historyItem) => {
      historyItem.message_id === messageId;
    });
    const sample = message?.dataset_samples.find(
      (datasetSample) => datasetSample.sample_id === sampleId
    );

    setDatasetSample(sample || null);
    setMode("dataset-sample-view");
  };

  const onDatasetSampleViewClose = () => {
    setDatasetSample(null);
    setMode("default");
  };

  return (
    <div className="h-full flex container justify-center gap-8">
      <div className="h-full flex flex-col w-[400px] border rounded-lg">
        <div className="p-4">
          <Button className="w-full">New Conversation</Button>
        </div>
        <div className="grow rounded-t-lg border-t overflow-hidden">
          <ChatUI
            history={conversationHistory}
            allowMessageClick={true}
            onMessageClick={({ message_id }: { message_id: string }) =>
              setSelectedMessage(
                conversationHistory.find(
                  (historyItem) => historyItem.message_id === message_id
                ) || null
              )
            }
          />
        </div>
      </div>
      <div className="w-[400px] border rounded-lg">
        <MessageDetailsCard historyItem={selectedMessage} />
      </div>
    </div>
  );
}
