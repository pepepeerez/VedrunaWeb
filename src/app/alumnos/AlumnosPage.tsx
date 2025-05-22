"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Trash2 } from "lucide-react";
import Link from "next/link";
import LikeButton from "@/app/components/LikeButton";

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

const isImage = (url: string) => /\.(jpg|jpeg|png|gif|svg)$/i.test(url);

const canDelete = (email?: string) =>
  email?.endsWith("@vedruna.es") ||
  email?.toLowerCase() === "jose.perez@a.vedrunasevillasj.es";

export default function AlumnosPage({ isAutorizado, nombre, email }: Props) {
  const router = useRouter();
  const [publicaciones, setPublicaciones] = useState<Publication[]>([]);
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
        const res = await fetch("http://localhost:8080/vedruna/publications");
        if (!res.ok) throw new Error();
        const data = await res.json();
        setPublicaciones(data);
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
      const res = await fetch(`http://localhost:8080/vedruna/publications/${selectedId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      setPublicaciones((prev) => prev.filter((pub) => pub.idPublication !== selectedId));
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md w-full animate-fade-in">
          <div className="flex justify-center mb-4 text-yellow-500">
            <AlertTriangle size={64} strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl font-extrabold text-red-700 mb-2">Acceso Denegado</h1>
          <p className="text-gray-700 mb-1">Esta sección es exclusiva para correos institucionales:</p>
          <p className="text-blue-700 font-semibold mb-4">@a.vedrunasevillasj.es</p>
          <p className="text-gray-500 text-sm">Redirigiéndote a la página principal...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6 sm:px-10 lg:px-20">
      <section className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-8 tracking-tight">
          Área de Alumnos
        </h1>
        <p className="text-lg text-gray-700 mb-12 max-w-3xl">
          Bienvenido, <span className="font-semibold text-blue-800">{nombre}</span>
        </p>

        {loading && <p className="text-center text-gray-500">Cargando publicaciones...</p>}
        {error && <p className="text-center text-red-600 mb-8">{error}</p>}
        {!loading && !error && publicaciones.length === 0 && (
          <p className="text-center text-gray-600">No hay publicaciones disponibles.</p>
        )}

        <div
          className="
            grid 
            gap-8
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
          "
        >
          {publicaciones.map((pub) => {
            let fileContent = null;
            if (pub.image) {
              fileContent = isImage(pub.image) ? (
                <img
                  src={pub.image}
                  alt={pub.title || "Imagen"}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              ) : (
                <div className="w-full h-48 flex items-center justify-center bg-gray-100 p-4 rounded-t-lg">
                  <span className="text-gray-500 text-sm">Archivo adjunto</span>
                </div>
              );
            }

            return (
              <Link
                key={pub.idPublication}
                href={`/alumnos/publicacion/${pub.idPublication}`}
                className="group block rounded-xl shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                {fileContent}
                <article className="p-6 flex flex-col flex-grow justify-between">
                  <header className="mb-4">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-blue-700 transition">
                      {pub.title}
                    </h2>
                  </header>
                  <p className="text-gray-700 mb-6 whitespace-pre-wrap line-clamp-5 flex-grow">
                    {pub.description}
                  </p>
                  <footer className="flex justify-between items-center text-sm text-gray-500 mt-auto">
                    <span>
                      Publicado por: <span className="font-medium text-gray-800">{pub.name || "Anónimo"}</span>
                    </span>
                    <div className="flex items-center space-x-2">
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
                          className="p-1 rounded-full bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                          title="Eliminar publicación"
                          disabled={deletingId === pub.idPublication}
                        >
                          <Trash2 size={18} />
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
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
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
