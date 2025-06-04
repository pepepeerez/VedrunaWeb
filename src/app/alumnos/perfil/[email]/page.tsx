"use client";

import { useState, useEffect } from "react";
import BackButton from "@/app/components/BackButton"; // Ajusta la ruta según tu estructura
import { FaGithub, FaLinkedin } from "react-icons/fa";

interface UserProfile {
  id: string;
  email: string;
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

function Avatar({ email }: { email: string }) {
  // Extrae iniciales del email antes de @
  const initials = email
    .split("@")[0]
    .split(".")
    .map((n) => n[0].toUpperCase())
    .join("")
    .slice(0, 2);
  return (
    <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-md select-none">
      {initials}
    </div>
  );
}

export default function PerfilUsuarioPage({ params }: Props) {
  const email = decodeURIComponent(params.email);

  const [perfil, setPerfil] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPerfil() {
      try {
        const res = await fetch(`http://localhost:8080/vedruna/user-profile/${email}`);
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
    <main className="max-w-3xl mx-auto px-6 py-16 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-2xl shadow-lg p-10">
        <div className="flex flex-col items-center mb-8">
          <Avatar email={perfil!.email} />
          <h1 className="mt-6 text-4xl font-extrabold text-gray-900">{perfil!.email}</h1>
          <p className="mt-2 text-indigo-600 font-semibold">{perfil?.curso || "Curso no especificado"}</p>
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

        {(perfil?.githubLink || perfil?.linkedinLink) && (
          <section className="mt-10 flex justify-center space-x-12">
            {perfil.githubLink && (
              <a
                href={perfil.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors"
              >
                <FaGithub className="text-2xl" />
                <span className="text-lg break-all">{perfil.githubLink}</span>
              </a>
            )}

            {perfil.linkedinLink && (
              <a
                href={perfil.linkedinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors"
              >
                <FaLinkedin className="text-2xl" />
                <span className="text-lg break-all">{perfil.linkedinLink}</span>
              </a>
            )}
          </section>
        )}

        <div className="mt-12 flex justify-center">
          <BackButton />
        </div>
      </div>
    </main>
  );
}
