"use client";

import Header from "@/component_front/Header";
import "./globals.css";
import Footer from "@/component_front/Footer";
import Link from "next/link";
import { Button } from "@/components/tailgrids/core/button";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: LayoutProps<"/">) {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <html>
      <body>
        <Header />
        <nav className="flex gap-4 justify-center mt-4">
          <Link href="/">
            <Button
              appearance={pathname === "/" ? "fill" : "outline"}
              variant="primary"
            >
              Home
            </Button>
          </Link>
          <Link href="/animetions">
            <Button
              appearance={pathname === "/animetions" ? "fill" : "outline"}
              variant="primary"
            >
              Animetion
            </Button>
          </Link>
          <Link href="/calculator">
            <Button
              appearance={pathname === "/calculator" ? "fill" : "outline"}
              variant="primary"
            >
              Calculator
            </Button>
          </Link>
          <Link href="/todos">
            <Button
              appearance={pathname === "/todos" ? "fill" : "outline"}
              variant="primary"
            >
              Todos
            </Button>
          </Link>
        </nav>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
