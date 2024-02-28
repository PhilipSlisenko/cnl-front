"use client";
import SamplesList from "@/components/app/(cnl-local)/dataset/main";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();

  const datasetId = searchParams.get("datasetId");
  return (
    <div className="container my-4">
      <SamplesList datasetId={datasetId || ""} />
    </div>
  );
}
