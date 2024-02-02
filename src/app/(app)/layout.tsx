import MainNavLayout from "@/components/app/layout";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return <MainNavLayout>{children}</MainNavLayout>;
}
