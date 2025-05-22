"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";

export default function EditarPerfilPage() {
  const { data: session } = useSession();
  const email = session?.user?.email ?? "";
  
  const [ciclo, setCiclo] = useState("");
  const [curso, setCurso] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) return;

    async function fetchPerfil() {
      try {
        const res = await fetch(`http://localhost:8080/vedruna/user-profile?email=${encodeURIComponent(email)}`);
        if (!res.ok) throw new Error("Error al cargar perfil");
        const data = await res.json();
        if (data) {
          setCiclo(data.ciclo || "");
          setCurso(data.curso || "");
          setDescripcion(data.descripcion || "");
          setGithub(data.githubLink || "");
          setLinkedin(data.linkedinLink || "");
        }
      } catch  {
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

      const res = await fetch("http://localhost:8080/vedruna/user-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Error al guardar perfil");
      setMensaje("Perfil actualizado con éxito.");
    } catch {
      setMensaje("Error al actualizar el perfil.");
    }
  };

  if (!session) return <p>Debes iniciar sesión para editar tu perfil.</p>;
  if (loading) return <p>Cargando perfil...</p>;

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Editar Perfil</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium" htmlFor="ciclo">Ciclo formativo</label>
          <input
            type="text"
            id="ciclo"
            value={ciclo}
            onChange={(e) => setCiclo(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Ej: Desarrollo de Aplicaciones Web"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="curso">Curso</label>
          <input
            type="text"
            id="curso"
            value={curso}
            onChange={(e) => setCurso(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Ej: 1º o 2º"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="descripcion">Descripción personal</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={4}
            placeholder="Cuéntanos sobre ti..."
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="github">Link GitHub (opcional)</label>
          <input
            type="url"
            id="github"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="https://github.com/tuusuario"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="linkedin">Link LinkedIn (opcional)</label>
          <input
            type="url"
            id="linkedin"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="https://linkedin.com/in/tuusuario"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Guardar cambios
        </button>
      </form>
      {mensaje && <p className="mt-4 text-center text-gray-700">{mensaje}</p>}
      <button
        onClick={() => signOut()}
        className="mt-6 text-red-600 hover:underline w-full"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
