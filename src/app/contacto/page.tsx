"use client";

import { useState } from "react";

export default function Contacto() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(false);
    setError("");

    try {
      const res = await fetch("http://localhost:8080/vedruna/contacto/enviar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Error al enviar mensaje");

      setEnviado(true);
      setForm({ nombre: "", email: "", mensaje: "" });
    } catch {
      setError("No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.");
    }
  };

  return (
    <section className="bg-gray-100 min-h-screen py-16 px-4 sm:px-8 md:px-16 lg:px-32">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-xl border border-gray-200">
        <h1 className="text-4xl font-extrabold text-center text-blue-900 mb-4">Contáctanos</h1>
        <p className="text-center text-gray-600 mb-10">
          ¿Tienes dudas, sugerencias o quieres colaborar?<br /> 
          Completa el formulario y te responderemos lo antes posible.
        </p>

        {enviado && (
          <div className="bg-green-100 text-green-700 p-4 rounded mb-6 text-center font-medium border border-green-300">
            ¡Gracias por tu mensaje! Te responderemos pronto.
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-6 text-center font-medium border border-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-bold text-gray-800 mb-1" htmlFor="nombre">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Tu nombre completo"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-1" htmlFor="email">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="tucorreo@ejemplo.com"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-1" htmlFor="mensaje">
              Mensaje
            </label>
            <textarea
              name="mensaje"
              id="mensaje"
              value={form.mensaje}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              placeholder="Escribe tu mensaje aquí..."
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow-md transition-all duration-300"
            >
              Enviar mensaje
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
