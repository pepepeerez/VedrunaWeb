"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import NavBar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer"; 

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Ocultar navbar global en rutas que empiezan por /alumnos
  const hideNav = pathname.startsWith("/alumnos");
  const hideFooter = false; // Puedes ajustar según necesidades

  return (
    <SessionProvider>
      <div className="flex flex-col min-h-screen">
        {!hideNav && <NavBar />}
        <main className="flex-grow">{children}</main>
        {!hideFooter && <Footer />}
      </div>
    </SessionProvider>
  );
}
