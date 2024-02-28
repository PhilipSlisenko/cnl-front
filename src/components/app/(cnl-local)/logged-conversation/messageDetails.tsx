import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { DatasetSample } from "@/types/datasetsSamples";
import { ConversationHistoryMessage } from "@/types/loggedConversations";
import clsx from "clsx";
import { FileStackIcon, MessageCircleWarning } from "lucide-react";
import { useEffect, useState } from "react";
import ViewAndSaveSampleButton from "./viewAndSaveSampleButton";

function DatasetSamplesSection({
  historyItem,
}: {
  historyItem: ConversationHistoryMessage | null;
}) {
  const [samples, setSamples] = useState<DatasetSample[]>([]);
  useEffect(() => {
    setSamples(historyItem?.dataset_samples || []);
  }, [historyItem]);
  return (
    <div
      className={clsx(
        historyItem?.dataset_samples.length === 0 && "opacity-40"
      )}
    >
      <div className="flex items-center gap-2">
        <FileStackIcon className="size-5" />
        <h4 className="font-medium  gap-2 text-lg">Dataset samples</h4>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        {samples?.map((sample, idx) => (
          <div className="flex items-center" key={idx}>
            <p className="grow">{sample.sample_name}</p>
            <ViewAndSaveSampleButton
              sample={sample}
              onClick={() => refetch()}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
function UserFeedbackSection({
  historyItem,
}: {
  historyItem: ConversationHistoryMessage;
}) {
  return (
    <div className={clsx(!historyItem.feedback && "opacity-40")}>
      <div className="flex items-center gap-2">
        <MessageCircleWarning className="size-5" />
        <h4 className="font-medium  gap-2 text-lg">User feedback</h4>
      </div>
      <div className=" mt-2">
        <Textarea readOnly value={historyItem.feedback} onChange={() => {}} />
      </div>
    </div>
  );
}

export function MessageDetailsCard({
  historyItem,
}: {
  historyItem: ConversationHistoryMessage | null;
}) {
  if (!historyItem) {
    return (
      <Card className="border-none shadow-none h-full">
        <CardHeader>
          <CardTitle>Message meta</CardTitle>
          <CardDescription>
            No message selected. Click on a chat message on the left to see more
            details.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  return (
    <Card className="border-none shadow-none h-full">
      <CardHeader>
        <CardTitle>Message meta</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <DatasetSamplesSection historyItem={historyItem} />
          <UserFeedbackSection historyItem={historyItem} />
        </div>
      </CardContent>
    </Card>
  );
}
