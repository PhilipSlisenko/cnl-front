import { DataSampleEditorDialogContent } from "@/components/datasetsSamples/datasetSampleViewEdit";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircleIcon } from "lucide-react";
import { useState } from "react";
import { fetchSample } from "./fetchSample";
import { updateSample } from "./updateSample";

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
    // queryFn: mockFetchSample,
    queryFn: fetchSample,
  });

  // update sample in db
  const mutation = useMutation({
    // mutationFn: mockUpdateSample,
    mutationFn: updateSample,
  });

  const { toast } = useToast();

  const queryClient = useQueryClient();

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button>View</Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-scroll max-h-screen max-w-[800px]">
        <DialogHeader></DialogHeader>
        {sample ? (
          <DataSampleEditorDialogContent
            initialMessages={sample?.messages || []}
            onClose={({ status, content }) => {
              if (status === "cancel") {
                setModalOpen(false);
              }
              if (status === "save") {
                mutation.mutate(
                  {
                    newSample: {
                      dataset_id: datasetId,
                      sample_id: sampleId,
                      sample_name: "",
                      last_activity: new Date().toISOString(),
                      messages: content,
                    },
                  },
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
                      queryClient.refetchQueries({
                        queryKey: ["sample", { datasetId, sampleId }],
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
