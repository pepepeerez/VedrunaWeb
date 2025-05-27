"use client";

import { useState, useEffect } from "react";
import BackButton from "@/app/components/BackButton"; // Ajusta la ruta según tu estructura

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

export default function PerfilUsuarioPage({ params }: Props) {
  const email = decodeURIComponent(params.email);

  const [perfil, setPerfil] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [comentario, setComentario] = useState("");

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

  if (loading) return <p className="text-center mt-10">Cargando perfil...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Perfil de Usuario</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <p className="text-lg font-semibold mb-2">Email:</p>
        <p className="mb-4 break-all">{perfil?.email}</p>

        <p className="text-lg font-semibold mb-2">Ciclo Formativo:</p>
        <p className="mb-4">{perfil?.ciclo || "No especificado"}</p>

        <p className="text-lg font-semibold mb-2">Curso:</p>
        <p className="mb-4">{perfil?.curso || "No especificado"}</p>

        <p className="text-lg font-semibold mb-2">Descripción:</p>
        <p className="mb-4 whitespace-pre-wrap">{perfil?.descripcion || "No especificada"}</p>

        {perfil?.githubLink && (
          <>
            <p className="text-lg font-semibold mb-2">GitHub:</p>
            <a
              href={perfil.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {perfil.githubLink}
            </a>
          </>
        )}

        {perfil?.linkedinLink && (
          <>
            <p className="text-lg font-semibold mt-4 mb-2">LinkedIn:</p>
            <a
              href={perfil.linkedinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {perfil.linkedinLink}
            </a>
          </>
        )}
      </div>

      <section>
        <h2 className="font-semibold text-lg mb-2">Comentarios</h2>
        <p className="mb-4">No hay comentarios todavía.</p>
        <textarea
          className="w-full border border-gray-400 rounded p-2 mb-4 resize-none"
          rows={5}
          placeholder="Escribe un comentario..."
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        />
        <div className="flex gap-2 justify-end">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => alert("Enviar comentario: " + comentario)} // Lógica envío aquí
          >
            Enviar Comentario
          </button>
          <BackButton />
        </div>
      </section>
    </main>
  );
}
