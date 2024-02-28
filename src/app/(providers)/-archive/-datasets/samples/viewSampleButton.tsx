import { DataSampleEditorDialogContent } from "@/components/datasetsSamples/datasetSampleViewEdit";
import { DatasetSample } from "@/components/datasetsSamples/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CheckCircleIcon } from "lucide-react";
import { useState } from "react";
import { mockFetchSample } from "./fetchSample";
import { mockUpdateSample } from "./updateSample";

export default function ViewSampleButton({
  datasetId,
  sampleId,
}: {
  datasetId: string;
  sampleId: string;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  // fetch sample
  const {
    data: sample,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["sample", { datasetId, sampleId }],
    queryFn: mockFetchSample,
  });

  // update sample in db
  const mutation = useMutation({ mutationFn: mockUpdateSample });

  const { toast } = useToast();

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button>View</Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-scroll max-h-screen max-w-[800px]">
        <DialogHeader></DialogHeader>
        {sample ? (
          <DataSampleEditorDialogContent
            initialMessages={sample?.content || []}
            onClose={({ status, content }) => {
              if (status === "cancel") {
                setModalOpen(false);
              }
              if (status === "save") {
                mutation.mutate(
                  { newSample: { content } as DatasetSample },
                  {
                    onSuccess(data) {
                      setModalOpen(false);
                      toast({
                        description: (
                          <span className="flex">
                            <CheckCircleIcon className="size-5 mr-2 text-green-500" />
                            Saved!
                          </span>
                        ),
                      });
                    },
                    onError(error) {},
                  }
                );
              }
            }}
          />
        ) : (
          <span className="w-full text-center">Loading...</span>
        )}
      </DialogContent>
    </Dialog>
  );
}
