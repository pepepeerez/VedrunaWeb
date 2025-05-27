"use client";

import { useState, useEffect } from "react";

interface UserProfile {
  id: string;
  email: string;
  ciclo?: string;
  curso?: string;
  descripcion?: string;
  githubLink?: string;
  linkedinLink?: string;
}

export default function UsuariosPage() {
  const [isClient, setIsClient] = useState(false);
  const [usuarios, setUsuarios] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const res = await fetch("http://localhost:8080/vedruna/user-profile/all");
        if (!res.ok) throw new Error("Error cargando usuarios");
        const data = await res.json();
        setUsuarios(data);
      } catch {
        setError("No se pudieron cargar los usuarios");
      } finally {
        setLoading(false);
      }
    }

    if (isClient) {
      fetchUsuarios();
    }
  }, [isClient]);

  if (!isClient) {
    return null; // o un spinner de carga
  }

  if (loading) return <p className="text-center mt-10 text-gray-700">Cargando usuarios...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">Usuarios Logueados</h1>
      <ul className="flex flex-col items-center space-y-4 border border-gray-300 rounded-lg p-6 bg-white shadow-md">
        {usuarios.map((usuario) => (
          <li key={usuario.id} className="w-full">
            <a
              href={`/alumnos/perfil/${encodeURIComponent(usuario.email)}`}
              className="block w-full text-center text-lg font-semibold text-blue-700 hover:underline transition"
            >
              {usuario.email}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
