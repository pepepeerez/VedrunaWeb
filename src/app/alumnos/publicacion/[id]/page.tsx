import { notFound } from "next/navigation";
import Link from "next/link";

interface Publication {
  idPublication: string;
  email: string;
  name?: string;
  title: string;
  description: string;
  image?: string;
  createdAt: string;
}

export default async function PublicacionPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  let publication: Publication | null = null;

  try {
    const res = await fetch(`http://localhost:8080/vedruna/publications/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error();
    publication = await res.json();
  } catch {
    notFound();
  }

  if (!publication) return notFound();

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <Link
        href="/alumnos"
        className="inline-block mb-6 text-blue-600 hover:underline text-sm"
      >
        ← Volver atrás
      </Link>

      <h1 className="text-3xl font-bold mb-4">{publication.title}</h1>
      <p className="text-gray-700 mb-4 whitespace-pre-wrap">{publication.description}</p>

      {publication.image && (
        <div className="mb-6">
          {/\.(jpg|jpeg|png|gif|svg)$/i.test(publication.image) ? (
            <img
              src={publication.image}
              alt={publication.title}
              className="w-full max-h-[500px] object-contain rounded-lg"
            />
          ) : (
            <a
              href={publication.image}
              download
              className="text-blue-600 underline text-sm"
            >
              Descargar archivo
            </a>
          )}
        </div>
      )}

      <div className="text-sm text-gray-500">
        <p>Publicado por: <strong>{publication.name || "Anónimo"}</strong></p>
        <p>
          {new Date(publication.createdAt).toLocaleDateString()}{" "}
          {new Date(publication.createdAt).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}
