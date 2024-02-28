import { updateSample } from "@/components/app/(cnl-local)/dataset/updateSample";
import { fetchDatasets } from "@/components/app/(cnl-local)/datasets/fetchDatasets";
import { DataSampleEditorWithDatasetChoiceDialogContent } from "@/components/datasetsSamples/datasetSampleViewEdit";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { DatasetSample } from "@/types/datasetsSamples";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircleIcon } from "lucide-react";
import { useState } from "react";
import { v4 } from "uuid";

export default function ViewAndSaveSampleButton({
  sample,
}: {
  sample: DatasetSample;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const {
    data: datasets,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["datasets"],
    // queryFn: mockFetchDatasets,
    queryFn: fetchDatasets,
  });

  // create sample in db
  const mutation = useMutation({
    // mutationFn: mockUpdateSample,
    mutationFn: updateSample,
  });

  const { toast } = useToast();

  const queryClient = useQueryClient();

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"}>View</Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-scroll max-h-screen max-w-[800px]">
        <DialogHeader></DialogHeader>

        <DataSampleEditorWithDatasetChoiceDialogContent
          initialMessages={sample?.messages || []}
          datasets={datasets || []}
          onClose={({ status, datasetId, content }) => {
            if (status === "cancel") {
              setModalOpen(false);
            }
            if (status === "save") {
              const sampleId = v4();
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
                  },
                  onError(error) {},
                }
              );
            }
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
