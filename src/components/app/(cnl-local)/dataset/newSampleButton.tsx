import { DataSampleEditorDialogContent } from "@/components/datasetsSamples/datasetSampleViewEdit";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { DatasetSampleMessage } from "@/types/datasetsSamples";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckCircleIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { v4 } from "uuid";
import { updateSample } from "./updateSample";

const defaultContent: DatasetSampleMessage[] = [
  {
    role: "system",
    content: "You are a helpful assistant",
  },
  {
    role: "user",
    content: "What's 2 + 2?",
  },
  {
    role: "assistant",
    content: "It's 4",
  },
];

export default function NewSampleButton({ datasetId }: { datasetId: string }) {
  const [modalOpen, setModalOpen] = useState(false);

  // put sample in db
  const mutation = useMutation({
    // mutationFn: mockUpdateSample,
    mutationFn: updateSample,
  });
  const queryClient = useQueryClient();

  const onClose = ({
    status,
    content,
  }: {
    status: "save" | "cancel";
    content: DatasetSampleMessage[];
  }) => {
    if (status === "cancel") {
      setModalOpen(false);
    }
    if (status === "save") {
      mutation.mutate(
        {
          newSample: {
            dataset_id: datasetId,
            sample_id: v4(),
            sample_name: "",
            last_activity: new Date().toISOString(),
            messages: content,
          },
        },
        {
          onSuccess(data) {
            queryClient.refetchQueries({
              queryKey: ["samples"],
            });
            setModalOpen(false);
            toast({
              description: (
                <span className="flex">
                  <CheckCircleIcon className="size-5 mr-2 text-green-500" />
                  Created!
                </span>
              ),
            });
          },
          onError(error) {},
        }
      );
    }
  };

  const { toast } = useToast();

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="size-5 mr-2" />
          New sample
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-scroll max-h-screen max-w-[800px]">
        <DialogHeader></DialogHeader>
        <DataSampleEditorDialogContent
          initialMessages={defaultContent}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
