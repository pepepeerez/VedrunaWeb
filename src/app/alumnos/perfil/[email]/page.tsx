"use client";

import { useState, useEffect } from "react";
import BackButton from "@/app/components/BackButton"; // Ajusta la ruta según tu estructura
import { FaGithub, FaLinkedin } from "react-icons/fa";

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

interface Props {
  params: {
    email: string;
  };
}

export default function PerfilUsuarioPage({ params }: Props) {
  const email = decodeURIComponent(params.email);

  const [perfil, setPerfil] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPerfil() {
      try {
        const res = await fetch(`${BASE_URL}/vedruna/user-profile/${email}`);
        if (!res.ok) {
          throw new Error("Perfil no encontrado");
        }
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
      <p className="text-center mt-20 text-red-600 font-semibold text-xl">{error}</p>
    );

  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 px-6 py-16">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10">
        <div className="flex flex-col items-center mb-8">
          <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold text-gray-900">
            {perfil?.nombreCompleto || perfil?.email} {/* Muestra el correo si no hay nombre completo */}
          </h1>
          <p className="mt-6 text-xl sm:text-2xl text-indigo-600 font-semibold">
            Curso: {perfil?.curso || "Curso no especificado"}
          </p>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
          <div>
            <h2 className="text-xl font-semibold border-b border-indigo-300 pb-2 mb-4">
              Ciclo Formativo
            </h2>
            <p className="text-lg">{perfil?.ciclo || "No especificado"}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold border-b border-indigo-300 pb-2 mb-4">
              Descripción
            </h2>
            <p className="whitespace-pre-wrap text-lg leading-relaxed">
              {perfil?.descripcion || "No especificada"}
            </p>
          </div>
        </section>

        {/* Redes sociales - Alineación de las redes */}
        <section className="mt-10 flex flex-col sm:flex-row justify-center space-x-12 space-y-4 sm:space-y-0">
          {perfil?.githubLink && (
            <a
              href={perfil.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors"
            >
              <FaGithub className="text-2xl" />
              <span className="text-lg">GitHub</span> {/* Texto en lugar del enlace completo */}
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
              <span className="text-lg">LinkedIn</span> {/* Texto en lugar del enlace completo */}
            </a>
          )}
        </section>

        <div className="mt-12 flex justify-center">
          <BackButton />
        </div>
      </div>
    </main>
  );
}
