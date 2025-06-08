"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import BackButton from "@/app/components/BackButton";

const BASE_URL = "https://vedrunaweb-backend.onrender.com";

interface UserProfile {
  id: string;
  email: string;
  nombreCompleto?: string;
  ciclo?: string;
  curso?: string;
  descripcion?: string;
  githubLink?: string;
  linkedinLink?: string;
}

export default function PerfilUsuarioPage() {
  const { email } = useParams();
  const [perfil, setPerfil] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Hook para obtener el perfil del usuario desde el backend usando su email
  useEffect(() => {
    async function fetchPerfil() {
      try {
        const res = await fetch(`${BASE_URL}/vedruna/user-profile/${email}`);
        if (!res.ok) throw new Error("Perfil no encontrado");
        const data = await res.json();
        setPerfil(data);
      } catch {
        setError("Perfil no encontrado");
      } finally {
        setLoading(false);
      }
    }
    fetchPerfil();
  }, [email]);

  if (loading)
    return (
      <p className="text-center mt-20 text-xl text-gray-500 animate-pulse">
        Cargando perfil...
      </p>
    );

  if (error)
    return (
      <p className="text-center mt-20 text-red-600 font-semibold text-xl">
        {error}
      </p>
    );

  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 px-4 sm:px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-10 overflow-hidden">
        <div className="flex flex-col items-center text-center mb-8 break-words">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 break-words max-w-full overflow-auto">
            {perfil?.nombreCompleto || perfil?.email}
          </h1>
          <p className="mt-2 text-lg sm:text-xl text-indigo-600 font-semibold">
            Curso: {perfil?.curso || "Curso no especificado"}
          </p>
        </div>

        <section className="grid grid-cols-1 gap-8 text-gray-700">
          <div>
            <h2 className="text-lg font-semibold border-b border-indigo-300 pb-2 mb-2">
              Ciclo Formativo
            </h2>
            <p className="text-base break-words">{perfil?.ciclo || "No especificado"}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold border-b border-indigo-300 pb-2 mb-2">
              Descripción
            </h2>
            <p className="whitespace-pre-wrap text-base leading-relaxed">
              {perfil?.descripcion || "No especificada"}
            </p>
          </div>
        </section>

        <section className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
          {perfil?.githubLink && (
            <a
              href={perfil.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors"
            >
              <FaGithub className="text-2xl" />
              <span className="text-base">GitHub</span>
            </a>
          )}

          {perfil?.linkedinLink && (
            <a
              href={perfil.linkedinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors"
            >
              <FaLinkedin className="text-2xl" />
              <span className="text-base">LinkedIn</span>
            </a>
          )}
        </section>

        <div className="mt-10 flex justify-center">
          <BackButton />
        </div>
      </div>
    </main>
  );
}
