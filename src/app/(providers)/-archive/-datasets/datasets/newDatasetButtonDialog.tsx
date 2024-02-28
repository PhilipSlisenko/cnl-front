import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckCircleIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

export default function NewDatasetButton() {
  const [modalOpen, setModalOpen] = useState(false);

  // update sample in db
  const mutation = useMutation({
    mutationFn: () =>
      new Promise((res) => {
        setTimeout(() => res({}), 1000);
      }),
  });
  const queryClient = useQueryClient();

  const onSave = () => {
    mutation.mutate(undefined, {
      onSuccess(data) {
        queryClient.refetchQueries({
          queryKey: ["datasets"],
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
    });
  };

  const onCancel = () => {
    setModalOpen(false);
  };

  const { toast } = useToast();

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="size-5 mr-2" />
          New dataset
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader></DialogHeader>
        <div>
          <Label htmlFor="dataset-name">Dataset name</Label>
          <Input id="dataset-name" />
        </div>
        <DialogFooter className="">
          <Button variant={"ghost"} onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onSave}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
