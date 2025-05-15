"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface Props {
  isAutorizado: boolean;
  nombre?: string;
  email?: string;
}

export default function AlumnosPage({ isAutorizado, nombre, email }: Props) {
  const router = useRouter();

  useEffect(() => {
    if (!isAutorizado) {
      setTimeout(() => {
        router.push("/");
      }, 3000); // Espera 3 segundos antes de redirigir
    }
  }, [isAutorizado, router]);

  if (!isAutorizado) {
    return (
      <div className="p-8 text-red-600 text-center">
        <h1 className="text-5xl font-bold mb-2">Acceso denegado</h1>
        <p>Esta sección es solo para correos institucionales (@a.vedrunasevillasj.es).</p>
        <p>Serás redirigido en unos segundos...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Área de Alumnos</h1>
      <p>Bienvenido, {nombre} ({email})</p>
      <p>Esta sección está protegida y solo accesible con tu cuenta institucional.</p>
    </div>
  );
}
