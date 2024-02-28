"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CNLLogo } from "../../common/logos";
import { Button } from "../../ui/button";

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
      text: "Logged Conversations",
      href: "/logged-conversations",
      current: pathname.startsWith("/logged-conversation"),
      external: false,
    },
    {
      text: "Datasets",
      href: "/datasets",
      current: pathname.startsWith("/dataset"),
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
        <div className="grow flex justify-center items-center gap-2">
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
