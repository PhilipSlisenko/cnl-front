import { HistoryItem } from "@/components/chatUi/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import clsx from "clsx";
import { FileStackIcon, MessageCircleWarning } from "lucide-react";
import { useEffect, useState } from "react";

function DatasetSamplesSection({
  historyItem,
}: {
  historyItem: HistoryItem | null;
}) {
  const [displayItems, setDisplayItems] = useState<
    { datasetName: string }[] | null
  >([]);
  useEffect(() => {
    setDisplayItems(
      historyItem?.dataset_samples.map((dataset_sample) => ({
        datasetName: dataset_sample.name,
      })) || null
    );
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
        {displayItems?.map((item, idx) => (
          <div className="flex items-center" key={idx}>
            <p className="grow">{item.datasetName}</p>
            <Button size="sm"> View </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
function UserFeedbackSection({ historyItem }: { historyItem: HistoryItem }) {
  return (
    <div className={clsx(!historyItem.user_feedback && "opacity-40")}>
      <div className="flex items-center gap-2">
        <MessageCircleWarning className="size-5" />
        <h4 className="font-medium  gap-2 text-lg">User feedback</h4>
      </div>
      <div className=" mt-2">
        <Textarea
          readOnly
          value={historyItem.user_feedback}
          onChange={() => {}}
        />
      </div>
    </div>
  );
}

export function MessageDetailsCard({
  historyItem,
}: {
  historyItem: HistoryItem | null;
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
