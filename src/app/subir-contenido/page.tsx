"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import BackButton from "../components/BackButton";

export default function CrearContenidoPage() {
  const { data: session } = useSession();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description) {
      setMessage("Por favor completa el título y la descripción.");
      return;
    }

    if (!file) {
      setMessage("Debes seleccionar un archivo.");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("email", session?.user?.email || "");
    formData.append("name", session?.user?.name || "");
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8080/vedruna/publications", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage("¡Publicación creada con éxito!");
        setTitle("");
        setDescription("");
        setFile(null);
        (document.getElementById("file") as HTMLInputElement).value = "";
        setTimeout(() => setMessage(""), 3000);
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || "Algo salió mal"}`);
      }
    } catch {
      setMessage("Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-8 bg-white rounded-xl shadow-md mt-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-blue-600">
        Subir contenido
      </h1>

      {!session ? (
        <p className="text-red-500 text-center">Debes iniciar sesión para publicar.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          <div>
            <label className="block font-semibold mb-2" htmlFor="title">
              Título <span className="text-red-600">*</span>
            </label>
            <input
              id="title"
              type="text"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Introduce el título"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2" htmlFor="description">
              Descripción <span className="text-red-600">*</span>
            </label>
            <textarea
              id="description"
              rows={5}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe tu publicación"
              required
            />
          </div>

          <div>
            <label htmlFor="file" className="block font-semibold mb-2">
              Archivo (imagen, PDF, Word, etc.)
            </label>
            <div className="border-2 border-dashed border-blue-400 rounded-xl p-6 bg-blue-50 text-center hover:bg-blue-100 transition cursor-pointer">
              <input
                id="file"
                type="file"
                className="hidden"
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.txt"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <label
                htmlFor="file"
                className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
              >
                Seleccionar archivo
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Publicando..." : "Publicar"}
          </button>

          {message && <p className="text-center mt-4 text-red-600">{message}</p>}
        </form>
      )}

      <div className="mt-6">
        <BackButton />
      </div>
    </div>
  );
}
