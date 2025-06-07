"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import BackButton from "../components/BackButton";

const BASE_URL = "https://vedrunaweb-backend.onrender.com";

export default function CrearContenidoPage() {
  const { data: session } = useSession();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null); // Solo un archivo
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [fileMessage, setFileMessage] = useState<string | null>(null); // Mensaje de archivo cargado
  const [previewImage, setPreviewImage] = useState<string | null>(null); // Para mostrar la vista previa

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación para título, descripción y archivo
    if (!title || !description) {
      setMessage("Por favor completa el título y la descripción.");
      return;
    }

    if (!file) {
      setMessage("Debes seleccionar una imagen.");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("email", session?.user?.email || "");
    formData.append("name", session?.user?.name || "");
    formData.append("file", file); // Solo un archivo

    try {
      const response = await fetch(`${BASE_URL}/vedruna/publications`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage("¡Publicación creada con éxito!");
        setTitle("");
        setDescription("");
        setFile(null);
        setFileMessage(null); // Limpiar el mensaje de archivo cargado
        setPreviewImage(null); // Limpiar la vista previa
        (document.getElementById("file") as HTMLInputElement).value = ""; // Limpiar el campo de archivo
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

  // Función para manejar el cambio de archivo (imagen)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      setFile(selectedFile); // Guardar el archivo seleccionado
      setFileMessage(`Archivo cargado: ${selectedFile.name}`); // Mostrar el nombre del archivo
      setPreviewImage(URL.createObjectURL(selectedFile)); // Generar vista previa
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
              Imagen (solo .jpg o .jpeg) <span className="text-red-600">*</span>
            </label>
            <div className="border-2 border-dashed border-black rounded-xl p-6 bg-blue-50 text-center hover:bg-blue-100 transition cursor-pointer">
              <input
                id="file"
                type="file"
                className="hidden"
                accept=".jpg,.jpeg"
                onChange={handleFileChange}
              />
              <label
                htmlFor="file"
                className="inline-block mt-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-900 transition"
              >
                Seleccionar imagen
              </label>
            </div>
          </div>

          {/* Mostrar el mensaje cuando el archivo es cargado */}
          {fileMessage && <p className="mt-2 text-gray-600">{fileMessage}</p>}

          {/* Mostrar la vista previa si es una imagen */}
          {previewImage && (
            <div className="mt-4">
              <h3 className="text-center text-xl font-semibold">Vista previa de la imagen:</h3>
              <img
                src={previewImage}
                alt="Vista previa"
                className="w-full max-h-80 object-contain mt-2"
              />
            </div>
          )}

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
