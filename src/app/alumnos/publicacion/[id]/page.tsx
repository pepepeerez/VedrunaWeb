"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import BackButton from "@/app/components/BackButton";
import LikeButton from "@/app/components/LikeButton";

const BASE_URL = "https://vedrunaweb-backend.onrender.com";

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
        const resPub = await fetch(`${BASE_URL}/vedruna/publications/${id}`);
        if (!resPub.ok) throw new Error("Error al cargar publicación");
        const pubData = await resPub.json();
        setPublicacion(pubData);

        const resCom = await fetch(`${BASE_URL}/vedruna/comentarios/${id}`);
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
    userEmail?.toLowerCase() === "jose.perez@a.vedrunasevillasj.es" ||
    userEmail?.endsWith("@a.vedrunasevillasj.es");

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

      const res = await fetch(`${BASE_URL}/vedruna/comentarios`, {
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
      const res = await fetch(`${BASE_URL}/vedruna/comentarios/${comentarioEliminarId}`, {
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

  if (status === "loading") return <p className="text-center mt-10">Cargando sesión...</p>;
  if (!session) return <p className="text-center mt-10">Debes iniciar sesión para ver esta página.</p>;
  if (loading) return <p className="text-center mt-10">Cargando publicación y comentarios...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Render archivo o imagen */}
      {publicacion?.image && (
        /\.(jpg|jpeg|png|gif|svg)$/i.test(publicacion.image) ? (
          // Si es una imagen, mostrarla
          <img
            src={publicacion.image}
            alt={publicacion.title}
            className="w-full max-h-96 object-cover rounded-lg shadow-md"
          />
        ) : (
          <div>Este tipo de archivo no es soportado para previsualización.</div>
        )
      )}

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">{publicacion?.title}</h1>
        <LikeButton
          id={publicacion!.idPublication}
          likes={publicacion?.like || []}
          userId={email}
          onLikeToggle={(updatedLikes) => {
            setPublicacion((prev) =>
              prev ? { ...prev, like: updatedLikes } : prev
            );
          }}
        />
      </div>

      <p className="text-gray-700 whitespace-pre-wrap">{publicacion?.description}</p>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Comentarios</h2>
        {comentarios.length === 0 && <p className="text-gray-600">No hay comentarios todavía.</p>}

        <ul className="space-y-6">
          {comentarios.map((c) => (
            <li
              key={c.idComentario}
              className="border rounded-lg p-4 shadow-sm flex justify-between items-start"
            >
              <div>
                <p className="font-semibold text-gray-900">{c.name || c.email}</p>
                <p className="text-gray-800">{c.mensaje}</p>
                <small className="text-gray-500">{tiempoRelativo(c.createdAt)}</small>
              </div>
              {canDeleteComment(email) && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    confirmDeleteComentario(c.idComentario);
                  }}
                  className="ml-4 px-3 py-1.5 text-sm bg-red-600 text-white rounded-full hover:bg-red-700 disabled:opacity-50 transition"
                  title="Eliminar comentario"
                  disabled={deletingComentario}
                >
                  <Trash2 size={16} />
                </button>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Escribe un comentario..."
            value={nuevoComentario}
            onChange={(e) => setNuevoComentario(e.target.value)}
            rows={5}
          />
          <div className="mt-4 mb-8 flex justify-between gap-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Enviar Comentario
            </button>
            <BackButton />
          </div>
        </div>
      </section>

      {comentarioEliminarId && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full text-center border border-gray-200">
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
    </main>
  );
}
