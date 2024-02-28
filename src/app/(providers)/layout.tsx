import { Toaster } from "@/components/ui/toaster";
import React, { Suspense } from "react";
import { QueryClientProvider_ } from "./providers";
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider_>
      <Suspense>{children}</Suspense>
      <Toaster />
    </QueryClientProvider_>
  );
}
