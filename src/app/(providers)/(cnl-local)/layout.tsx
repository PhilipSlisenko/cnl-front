import MainNavLayout from "@/components/app/(cnl-local)/layout";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return <MainNavLayout>{children}</MainNavLayout>;
}
