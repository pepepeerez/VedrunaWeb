"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import NavBar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer"; 

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideNav = pathname.startsWith("/alumnos");
  const hideFooter = false; // aquí puedes usar lógica como: pathname.startsWith("/admin") si quieres ocultarlo

  return (
  <SessionProvider>
    <div className="flex flex-col min-h-screen">
      {!hideNav && <NavBar />}
      <main className="flex-grow">{children}</main> {/* ocupa el espacio */}
      {!hideFooter && <Footer />}
    </div>
  </SessionProvider>
  );
}
