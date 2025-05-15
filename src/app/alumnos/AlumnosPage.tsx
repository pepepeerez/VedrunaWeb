"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";


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
      }, 3000);
    }
  }, [isAutorizado, router]);

  if (!isAutorizado) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-md w-full animate-fade-in">
          <div className="flex justify-center mb-4 text-yellow-500">
            <AlertTriangle size={64} strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-extrabold text-red-600 mb-2">Acceso Denegado</h1>
          <p className="text-gray-700 mb-1">
            Esta sección es exclusiva para correos institucionales:
          </p>
          <p className="text-blue-600 font-semibold mb-4">
            @a.vedrunasevillasj.es
          </p>
          <p className="text-gray-500 text-sm">Redirigiéndote a la página principal...</p>
        </div>
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
