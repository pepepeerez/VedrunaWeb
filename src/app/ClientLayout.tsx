"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import NavBar from "@/app/components/NavBar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Oculta el NavBar principal para alumnos
  const hideNav = pathname.startsWith("/alumnos");

  return (
    <SessionProvider>
      {!hideNav && <NavBar />}
      {children}
    </SessionProvider>
  );
}
