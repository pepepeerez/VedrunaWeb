"use client";  

import { SessionProvider } from "next-auth/react";
import NavBar from "@/app/components/NavBar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NavBar />
      {children}
    </SessionProvider>
  );
}
