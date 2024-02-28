import { Button } from "@/components/ui/button";

export default function DownloadSamplesButton() {
  const url = "http://localhost:8000/download-json";
  return (
    <Button variant={"secondary"} asChild={true}>
      <a href={url} download>
        Download samples
      </a>
    </Button>
  );
}
