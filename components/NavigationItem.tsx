import { ReactNode } from "react";
import Link from "next/link";

type props = {
  href: string;
  children: ReactNode;
};

export function NavigationItem({ href, children }: props) {
  return (
    <Link href={href} className={`block px-3 py-3 text-white`}>
      {children}
    </Link>
  );
}
