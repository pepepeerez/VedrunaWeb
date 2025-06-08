"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";

const BASE_URL = "https://vedrunaweb-backend.onrender.com";

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
  const { data: session, status } = useSession();
  const router = useRouter();
  const [usuarios, setUsuarios] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  //  Verifica si el usuario está autorizado por dominio de correo
  const isAuthorized = session?.user?.email
    ? session.user.email.toLowerCase().endsWith("@vedruna.es") ||
      session.user.email.toLowerCase().endsWith("@a.vedrunasevillasj.es")
    : false;

  // Carga todos los perfiles de usuario si el email está autorizado
  useEffect(() => {
    if (status === "loading") return; // esperar sesión

    if (!isAuthorized) {
      setTimeout(() => router.push("/"), 3000);
      return;
    }

    async function fetchUsuarios() {
      try {
        const res = await fetch(`${BASE_URL}/vedruna/user-profile/all`);
        if (!res.ok) throw new Error("Error cargando usuarios");
        const data = await res.json();
        setUsuarios(data);
      } catch {
        setError("No se pudieron cargar los usuarios");
      } finally {
        setLoading(false);
      }
    }

    fetchUsuarios();
  }, [isAuthorized, status, router]);

  if (status === "loading") return null; // spinner o nada mientras carga sesión

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md w-full animate-fade-in">
          <div className="flex justify-center mb-4 text-yellow-500">
            <AlertTriangle size={64} strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl font-extrabold text-red-700 mb-2">Acceso Denegado</h1>
          <p className="text-gray-700 mb-1">Esta sección es exclusiva para correos institucionales:</p>
          <p className="text-blue-700 font-semibold mb-4">@vedruna.es y @a.vedrunasevillasj.es</p>
          <p className="text-gray-500 text-sm">Redirigiéndote a la página principal...</p>
        </div>
      </div>
    );
  }

  if (loading) return <p className="text-center mt-10 text-gray-700">Cargando usuarios...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">Perfiles de Usuarios</h1>
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
