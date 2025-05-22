"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

interface Comentario {
  idComentario: string;
  idPublication: string;
  email: string;
  name?: string;
  mensaje: string;
  createdAt: string;
}

interface Publication {
  idPublication: string;
  email: string;
  name?: string;
  title: string;
  description: string;
  image?: string;
  createdAt: string;
  like?: string[];
}

interface Props {
  params: { id: string };
}

export default function PublicacionPage({ params }: Props) {
  const { data: session, status } = useSession();

  const nombre = session?.user?.name ?? "Anónimo";
  const email = session?.user?.email ?? "email@default.com";

  const { id } = params;
  const [publicacion, setPublicacion] = useState<Publication | null>(null);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [comentarioEliminarId, setComentarioEliminarId] = useState<string | null>(null);
  const [deletingComentario, setDeletingComentario] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const resPub = await fetch(`http://localhost:8080/vedruna/publications/${id}`);
        if (!resPub.ok) throw new Error("Error al cargar publicación");
        const pubData = await resPub.json();
        setPublicacion(pubData);

        const resCom = await fetch(`http://localhost:8080/vedruna/comentarios/${id}`);
        if (!resCom.ok) throw new Error("Error al cargar comentarios");
        const comData = await resCom.json();
        setComentarios(comData);
      } catch (e) {
        console.error(e);
        setError("Error al cargar datos");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const canDeleteComment = (userEmail: string | undefined) =>
    userEmail?.endsWith("@vedruna.es") ||
    userEmail?.toLowerCase() === "jose.perez@a.vedrunasevillasj.es";

  function tiempoRelativo(fechaISO: string): string {
    const ahora = new Date();
    const fecha = new Date(fechaISO);
    const diffMs = ahora.getTime() - fecha.getTime();

    const minutos = Math.floor(diffMs / (1000 * 60));
    if (minutos < 1) return "justo ahora";
    if (minutos < 60) return `hace ${minutos} minuto${minutos > 1 ? "s" : ""}`;

    const horas = Math.floor(minutos / 60);
    if (horas < 24) return `hace ${horas} hora${horas > 1 ? "s" : ""}`;

    const dias = Math.floor(horas / 24);
    return `hace ${dias} día${dias > 1 ? "s" : ""}`;
  }

  const handleSubmit = async () => {
    if (!nuevoComentario.trim()) return;

    try {
      const body = {
        idPublication: id,
        email,
        name: nombre,
        mensaje: nuevoComentario,
      };

      const res = await fetch("http://localhost:8080/vedruna/comentarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Error al enviar comentario");
      const comentarioCreado = await res.json();

      setComentarios((prev) => [...prev, comentarioCreado]);
      setNuevoComentario("");
    } catch (e) {
      console.error(e);
      alert("Error al enviar comentario");
    }
  };

  const confirmDeleteComentario = (id: string) => {
    setComentarioEliminarId(id);
  };

  const handleDeleteComentario = async () => {
    if (!comentarioEliminarId) return;
    setDeletingComentario(true);
    try {
      const res = await fetch(`http://localhost:8080/vedruna/comentarios/${comentarioEliminarId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar comentario");
      setComentarios((prev) => prev.filter((c) => c.idComentario !== comentarioEliminarId));
      setComentarioEliminarId(null);
    } catch (e) {
      console.error(e);
      alert("No se pudo eliminar el comentario");
    } finally {
      setDeletingComentario(false);
    }
  };

  if (status === "loading") return <p>Cargando sesión...</p>;
  if (!session) return <p>Debes iniciar sesión para ver esta página.</p>;

  if (loading) return <p>Cargando publicación y comentarios...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 relative">
      <h1 className="text-3xl font-bold mb-4">{publicacion?.title}</h1>
      <p className="mb-6 whitespace-pre-wrap">{publicacion?.description}</p>

      <hr className="my-6" />

      <section>
        <h2 className="text-xl font-semibold mb-4">Comentarios</h2>
        {comentarios.length === 0 && <p>No hay comentarios todavía.</p>}

        <ul className="space-y-4">
          {comentarios.map((c) => (
            <li key={c.idComentario} className="border p-3 rounded flex justify-between items-start">
              <div>
                <p className="font-semibold">{c.name || c.email}</p>
                <p>{c.mensaje}</p>
                <small className="text-gray-500">{tiempoRelativo(c.createdAt)}</small>
              </div>
              {canDeleteComment(email) && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    confirmDeleteComentario(c.idComentario);
                  }}
                  className="ml-4 px-2 py-1 text-xs bg-red-600 text-white rounded-full hover:bg-red-700 disabled:opacity-50 transition-all"
                  title="Eliminar comentario"
                  disabled={deletingComentario}
                >
                  <Trash2 size={14} />
                </button>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <textarea
            className="w-full p-2 border rounded"
            placeholder="Escribe un comentario..."
            value={nuevoComentario}
            onChange={(e) => setNuevoComentario(e.target.value)}
            rows={4}
          />
          <div className="mt-4 flex gap-4 justify-end">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 text-sm"
            >
              Enviar Comentario
            </button>

            <Link
              href="/alumnos"
              className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 flex items-center justify-center text-sm"
              aria-label="Volver a Alumnos"
            >
              ←
            </Link>
          </div>
        </div>
      </section>

      {comentarioEliminarId && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-[90vw] max-w-sm text-center border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirmar eliminación</h2>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que quieres eliminar este comentario? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setComentarioEliminarId(null)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-sm"
                disabled={deletingComentario}
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteComentario}
                disabled={deletingComentario}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 text-sm disabled:opacity-50"
              >
                {deletingComentario ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
