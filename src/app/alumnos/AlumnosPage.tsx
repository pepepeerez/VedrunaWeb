"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";

interface Publication {
  idPublication: string;
  email: string;
  name?: string; // Lo dejamos opcional por compatibilidad
  title: string;
  description: string;
  image?: string;
  createdAt: string;
}

interface Props {
  isAutorizado: boolean;
  nombre?: string;
  email?: string;
}

export default function AlumnosPage({ isAutorizado, nombre }: Props) {
  const router = useRouter();
  const [publicaciones, setPublicaciones] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAutorizado) {
      setTimeout(() => {
        router.push("/");
      }, 3000);
      return;
    }

    async function fetchPublicaciones() {
      try {
        const res = await fetch("http://localhost:8080/vedruna/publications");
        if (!res.ok) throw new Error("Error al cargar publicaciones");
        const data = await res.json();
        setPublicaciones(data);
      } catch {
        setError("No se pudieron cargar las publicaciones.");
      } finally {
        setLoading(false);
      }
    }

    fetchPublicaciones();
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
          <p className="text-blue-600 font-semibold mb-4">@a.vedrunasevillasj.es</p>
          <p className="text-gray-500 text-sm">Redirigiéndote a la página principal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Área de Alumnos</h1>
      <p className="mb-8">Bienvenido, {nombre}</p>

      {loading && <p className="text-center">Cargando publicaciones...</p>}
      {error && <p className="text-center text-red-600 mb-4">{error}</p>}
      {!loading && !error && publicaciones.length === 0 && (
        <p className="text-center">No hay publicaciones disponibles.</p>
      )}

      <div className="flex flex-col space-y-6">
        {publicaciones.map((pub) => (
          <article
            key={pub.idPublication}
            className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {pub.image && (
              <img
                src={pub.image}
                alt={pub.title || "Imagen de publicación"}
                className="w-full md:w-48 h-48 object-cover"
              />
            )}
            <div className="p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-semibold mb-2">{pub.title}</h2>
                <p className="text-gray-700 mb-4 whitespace-pre-wrap">{pub.description}</p>
              </div>
              <div className="text-sm text-gray-500">
                <p>
                  Publicado por:{" "}
                  <span className="font-medium">
                    {pub.name || "Anónimo"}
                  </span>
                </p>
                <p>
                  {new Date(pub.createdAt).toLocaleDateString()}{" "}
                  {new Date(pub.createdAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
