"use client";

import ROChatUIAndDebugWindow from "@/components/app/(cnl-local)/logged-conversation/main";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const conversationId = searchParams.get("conversationId");

  // Make full height
  const [containerHeight, setContainerHeight] = useState("auto");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateHeight = () => {
      if (containerRef.current) {
        const distanceFromTop =
          containerRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const height = windowHeight - distanceFromTop;
        setContainerHeight(`${height}px`);
      }
    };

    // Calculate height on initial render
    calculateHeight();

    window.addEventListener("resize", calculateHeight);

    return () => window.removeEventListener("resize", calculateHeight);
  }, []);

  return (
    <div
      ref={containerRef}
      className="container py-4"
      style={{ height: containerHeight }}
    >
      <ROChatUIAndDebugWindow conversationId={conversationId || ""} />
    </div>
  );
}
