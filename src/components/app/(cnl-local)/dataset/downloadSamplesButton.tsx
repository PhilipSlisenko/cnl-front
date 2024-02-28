import { Button } from "@/components/ui/button";

export default function DownloadSamplesButton({
  datasetId,
}: {
  datasetId: string;
}) {
  const url = `${process.env.NEXT_PUBLIC_CNL_LOCAL_URL}/download_dataset?dataset_id=${datasetId}`;
  return (
    <Button variant={"secondary"} asChild={true}>
      <a href={url} download>
        Download samples
      </a>
    </Button>
  );
}
