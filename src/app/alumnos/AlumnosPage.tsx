"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Trash2 } from "lucide-react";
import Link from "next/link";
import LikeButton  from "@/app/components/LikeButton";


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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-md w-full animate-fade-in">
          <div className="flex justify-center mb-4 text-yellow-500">
            <AlertTriangle size={64} strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-extrabold text-red-600 mb-2">Acceso Denegado</h1>
          <p className="text-gray-700 mb-1">Esta sección es exclusiva para correos institucionales:</p>
          <p className="text-blue-600 font-semibold mb-4">@a.vedrunasevillasj.es</p>
          <p className="text-gray-500 text-sm">Redirigiéndote a la página principal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Área de Alumnos</h1>
      <p className="mb-8">Bienvenido, {nombre}</p>

      {loading && <p className="text-center">Cargando publicaciones...</p>}
      {error && <p className="text-center text-red-600 mb-4">{error}</p>}
      {!loading && !error && publicaciones.length === 0 && (
        <p className="text-center">No hay publicaciones disponibles.</p>
      )}

      <div className="flex flex-col space-y-6">
        {publicaciones.map((pub) => {
          let fileContent = null;
          if (pub.image) {
            fileContent = isImage(pub.image) ? (
              <img
                src={pub.image}
                alt={pub.title || "Imagen"}
                className="w-full md:w-48 h-48 object-cover"
              />
            ) : (
              <div className="w-full md:w-48 h-48 flex items-center justify-center bg-gray-100 p-4">
                <span className="text-gray-500 text-sm">Archivo adjunto</span>
              </div>
            );
          }

          return (
            <Link key={pub.idPublication} href={`/alumnos/publicacion/${pub.idPublication}`} className="block">
              <article className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                {fileContent && <div className="flex-shrink-0">{fileContent}</div>}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h2 className="text-xl font-semibold mb-2 flex items-center justify-between">
                      <span>{pub.title}</span>
                      {canDelete(email) && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            confirmDelete(pub.idPublication);
                          }}
                          className="ml-2 px-2 py-0.5 text-xs bg-red-600 text-white rounded-full hover:bg-red-700 disabled:opacity-50 transition-all"
                          title="Eliminar publicación"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </h2>
                    <p className="text-gray-700 mb-4 whitespace-pre-wrap">{pub.description}</p>
                  </div>
                  <div className="text-sm text-gray-500 flex justify-between items-center">
                    <p>Publicado por: <span className="font-medium">{pub.name || "Anónimo"}</span></p>
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
                  </div>
                </div>
              </article>
            </Link>
          );
        })}
      </div>

      {modalOpen && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-[90vw] max-w-sm text-center border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirmar eliminación</h2>
            <p className="text-gray-600 mb-6">¿Estás seguro de que quieres eliminar esta publicación? Esta acción no se puede deshacer.</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => { setModalOpen(false); setSelectedId(null); }} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-sm">Cancelar</button>
              <button onClick={handleDelete} disabled={deletingId !== null} className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 text-sm disabled:opacity-50">
                {deletingId ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
