"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Trash2 } from "lucide-react";
import Link from "next/link";
import LikeButton from "@/app/components/LikeButton";

const BASE_URL = "https://vedrunaweb-backend.onrender.com";

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
  isAutorizado: boolean;
  nombre?: string;
  email?: string;
}

const isImage = (url: string) => /\.(jpg|jpeg|png|gif|svg)$/i.test(url); // Solo permitir imágenes

const canDelete = (email?: string) =>
  email?.endsWith("@vedruna.es") ||
  email?.toLowerCase() === "jose.perez@a.vedrunasevillasj.es";

export default function AlumnosPage({ isAutorizado, nombre, email }: Props) {
  const router = useRouter();
  const [publicaciones, setPublicaciones] = useState<Publication[]>([]);
  const [comentariosCount, setComentariosCount] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (!isAutorizado) {
      setTimeout(() => router.push("/"), 3000);
      return;
    }

    async function fetchPublicaciones() {
      try {
        const res = await fetch(`${BASE_URL}/vedruna/publications`);
        if (!res.ok) throw new Error();
        const data = await res.json();

        // Filtrar solo publicaciones que contienen imágenes
        const imagePublications = data.filter((pub: Publication) => pub.image && isImage(pub.image));
        setPublicaciones(imagePublications);

        // Cargar conteo de comentarios para cada publicación
        const counts: Record<string, number> = {};
        await Promise.all(
          imagePublications.map(async (pub: Publication) => {
            try {
              const countRes = await fetch(`${BASE_URL}/vedruna/comentarios/count/${pub.idPublication}`);
              if (!countRes.ok) throw new Error();
              const count = await countRes.json();
              counts[pub.idPublication] = count;
            } catch {
              counts[pub.idPublication] = 0;
            }
          })
        );
        setComentariosCount(counts);
      } catch {
        setError("No se pudieron cargar las publicaciones.");
      } finally {
        setLoading(false);
      }
    }

    fetchPublicaciones();
  }, [isAutorizado, router]);

  const confirmDelete = (id: string) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    setDeletingId(selectedId);
    try {
      const res = await fetch(`${BASE_URL}/vedruna/publications/${selectedId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      setPublicaciones((prev) => prev.filter((pub) => pub.idPublication !== selectedId));

      // Actualizar conteo comentarios quitando la publicación eliminada
      setComentariosCount((prev) => {
        const updated = { ...prev };
        delete updated[selectedId];
        return updated;
      });
    } catch {
      alert("No se pudo eliminar la publicación.");
    } finally {
      setDeletingId(null);
      setModalOpen(false);
      setSelectedId(null);
    }
  };

  if (!isAutorizado) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
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

  return (
    <main className="min-h-screen bg-white py-12 px-6 flex justify-center">
      <section className="w-full max-w-5xl pb-20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-900 mb-8 tracking-tight text-center">
          Área de Alumnos
        </h1>
        <p className="text-lg text-gray-700 mb-12 max-w-full text-center">
          Bienvenido, <span className="font-semibold text-blue-800">{nombre}</span>
        </p>

        {loading && <p className="text-center text-gray-500">Cargando publicaciones...</p>}
        {error && <p className="text-center text-red-600 mb-8">{error}</p>}
        {!loading && !error && publicaciones.length === 0 && (
          <p className="text-center text-gray-600">No hay publicaciones disponibles.</p>
        )}

        <div className="flex flex-col space-y-8">
          {publicaciones.map((pub) => {
            return (
              <Link
                key={pub.idPublication}
                href={`/alumnos/publicacion/${pub.idPublication}`}
                className="block rounded-xl shadow-md bg-white hover:shadow-lg transition-shadow duration-300 flex flex-col max-w-full"
              >
                <img
                  src={pub.image}
                  alt={pub.title || "Imagen"}
                  className="w-full max-h-80 object-contain rounded-t-lg shadow-sm" // Limitar la altura máxima de la imagen
                />
                <article className="p-6 flex flex-col flex-grow justify-between">
                  <header className="mb-4">
                    <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-blue-700 transition">
                      {pub.title}
                    </h2>
                  </header>
                  <p className="text-gray-700 mb-6 whitespace-pre-wrap line-clamp-7 flex-grow">
                    {pub.description}
                  </p>
                  <footer className="flex justify-between items-center text-sm text-gray-500 mt-auto">
                    <span>
                      Publicado por: <span className="font-medium text-gray-800">{pub.name || "Anónimo"}</span>
                    </span>
                    <div className="flex items-center space-x-4">
                      <span className="select-none text-gray-600">
                        {comentariosCount[pub.idPublication] ?? 0} comentario
                        {(comentariosCount[pub.idPublication] ?? 0) !== 1 ? "s" : ""}
                      </span>

                      <LikeButton
                        id={pub.idPublication}
                        likes={pub.like || []}
                        userId={email ?? ""}
                        onLikeToggle={(updatedLikes) => {
                          setPublicaciones((prev) =>
                            prev.map((p) =>
                              p.idPublication === pub.idPublication ? { ...p, like: updatedLikes } : p
                            )
                          );
                        }}
                      />

                      {canDelete(email) && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            confirmDelete(pub.idPublication);
                          }}
                          className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                          title="Eliminar publicación"
                          disabled={deletingId === pub.idPublication}
                        >
                          <Trash2 size={20} />
                        </button>
                      )}
                    </div>
                  </footer>
                </article>
              </Link>
            );
          })}
        </div>
      </section>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full text-center border border-gray-300">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Confirmar eliminación
            </h2>
            <p className="text-gray-700 mb-6">
              ¿Estás seguro de que quieres eliminar esta publicación? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setModalOpen(false);
                  setSelectedId(null);
                }}
                className="px-5 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={deletingId !== null}
                className="px-5 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold transition disabled:opacity-50"
              >
                {deletingId ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
