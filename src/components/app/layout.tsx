"use client";

import { routes } from "@/routes";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CNLLogo } from "../common/logos";
import { Button } from "../ui/button";

interface NavItem {
  text: string;
  href: string;
  current: boolean; // is current page
  external: boolean; // if link is external
}

export default function MainNavLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const navItems: NavItem[] = [
    {
      text: "Dev Chat UI",
      href: routes["/dev-chat-ui"],
      current: pathname === routes["/dev-chat-ui"],
      external: false,
    },
    {
      text: "Logged Conversations",
      href: routes["/logged-conversations"],
      current: pathname === routes["/logged-conversations"],
      external: false,
    },
    {
      text: "Datasets",
      href: routes["/datasets"],
      current: pathname === routes["/datasets"],
      external: false,
    },
    // {
    //   text: "Full Screen UI",
    //   href: "#",
    //   external: true,
    // },
  ];

  return (
    <>
      <div className="flex py-2 container border-b">
        <CNLLogo />
        <div className="grow flex justify-center gap-2">
          {navItems.map((navItem, idx) => (
            <Button
              asChild={true}
              variant="link"
              key={idx}
              className={clsx(
                "text-primary/80 hover:text-primary",
                navItem.current && "underline text-primary"
              )}
            >
              <Link href={navItem.href}>{navItem.text}</Link>
            </Button>
          ))}
        </div>
      </div>
      {children}
    </>
  );
}
