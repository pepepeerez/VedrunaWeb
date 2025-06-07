"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const BASE_URL = "https://vedrunaweb-backend.onrender.com";

export default function EditarPerfilPage() {
  const { data: session } = useSession();
  const email = session?.user?.email ?? "";

  const [ciclo, setCiclo] = useState("");
  const [curso, setCurso] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [mensajeTipo, setMensajeTipo] = useState<"error" | "success" | "info">("info");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) return;

    async function fetchPerfil() {
      try {
        const res = await fetch(`${BASE_URL}/vedruna/user-profile/${encodeURIComponent(email)}`);
        if (!res.ok) throw new Error("Error al cargar perfil");
        const data = await res.json();

        if (data && Object.keys(data).length > 0) {
          setCiclo(data.ciclo || "");
          setCurso(data.curso || "");
          setDescripcion(data.descripcion || "");
          setGithub(data.githubLink || "");
          setLinkedin(data.linkedinLink || "");
        } else {
          setMensajeTipo("info");
          setMensaje("Perfil no encontrado.");
        }
      } catch (error) {
        console.error(error);
        setMensajeTipo("error");
        setMensaje("No se pudo cargar el perfil.");
      } finally {
        setLoading(false);
      }
    }

    fetchPerfil();
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setMensajeTipo("error");
      setMensaje("Debes iniciar sesión para editar el perfil.");
      return;
    }

    setMensaje("");
    try {
      const body = {
        email,
        ciclo,
        curso,
        descripcion,
        githubLink: github,
        linkedinLink: linkedin,
      };

      const res = await fetch(`${BASE_URL}/vedruna/user-profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Error al guardar perfil");
      setMensajeTipo("success");
      setMensaje("Perfil actualizado con éxito.");
    } catch {
      setMensajeTipo("error");
      setMensaje("Error al actualizar el perfil.");
    }
  };

  // Auto ocultar mensaje tras 5 segundos
  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => setMensaje(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  if (!session) return <p>Debes iniciar sesión para editar tu perfil.</p>;
  if (loading) return <p>Cargando perfil...</p>;

  // Estilos para mensaje según tipo
  const mensajeClases = {
    error: "bg-red-100 text-red-700 border border-red-400",
    success: "bg-green-100 text-green-700 border border-green-400",
    info: "bg-blue-100 text-blue-700 border border-blue-400",
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-lg shadow-lg">
      {/* Mensaje arriba */}
      {mensaje && (
        <div
          role="alert"
          className={`mb-6 p-3 rounded-md text-center font-semibold ${mensajeClases[mensajeTipo]}`}
        >
          {mensaje}
        </div>
      )}

      <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-900">Editar Perfil</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="ciclo" className="block mb-2 font-semibold text-gray-700">
            Ciclo formativo
          </label>
          <input
            id="ciclo"
            type="text"
            value={ciclo}
            onChange={(e) => setCiclo(e.target.value)}
            placeholder="Ej: Desarrollo de Aplicaciones Web"
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
          />
        </div>

        <div>
          <label htmlFor="curso" className="block mb-2 font-semibold text-gray-700">
            Curso
          </label>
          <input
            id="curso"
            type="text"
            value={curso}
            onChange={(e) => setCurso(e.target.value)}
            placeholder="Ej: 1º o 2º"
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
          />
        </div>

        <div>
          <label htmlFor="descripcion" className="block mb-2 font-semibold text-gray-700">
            Descripción personal
          </label>
          <textarea
            id="descripcion"
            rows={5}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Cuéntanos sobre ti..."
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition resize-none"
          />
        </div>

        <div>
          <label htmlFor="github" className="block mb-2 font-semibold text-gray-700">
            GitHub
          </label>
          <input
            id="github"
            type="url"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            placeholder="https://github.com/tuusuario"
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
          />
        </div>

        <div>
          <label htmlFor="linkedin" className="block mb-2 font-semibold text-gray-700">
            LinkedIn
          </label>
          <input
            id="linkedin"
            type="url"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            placeholder="https://linkedin.com/in/tuusuario"
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
        >
          Guardar cambios
        </button>
      </form>
      <div className="mt-20" /> {/* Espacio para footer */}
    </div>
  );
}
