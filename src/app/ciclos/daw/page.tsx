import Image from "next/image";
import dawImage from "../../../../public/daw2.jpg";
import BackButton from "@/app/components/BackButton";

export default function DAWPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-4 text-center">
          Desarrollo de Aplicaciones Web (DAW)
        </h1>

        <Image
          src={dawImage}
          alt="Imagen DAW"
          className="rounded-2xl shadow-lg mb-8 w-full h-auto object-cover max-h-80"
          priority
        />

        <p className="text-lg text-gray-700 mb-6 text-center">
          Conviértete en un desarrollador web completo: frontend + backend.
        </p>

        <section className="bg-white shadow-md rounded-xl p-6 mb-10">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">¿Qué es DAW?</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            El ciclo de <strong>Desarrollo de Aplicaciones Web (DAW)</strong> te forma para diseñar y crear sitios y aplicaciones web dinámicas, tanto del lado del cliente (frontend) como del servidor (backend). Ideal para quienes quieran dedicarse al diseño y desarrollo web.
          </p>
        </section>

        <section className="bg-blue-100 rounded-xl p-6 mb-10">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">¿Qué aprenderás?</h2>
          <ul className="list-disc list-inside space-y-3 text-blue-900 text-lg">
            <li>HTML, CSS, JavaScript y frameworks modernos.</li>
            <li>Diseño responsive y experiencia de usuario (UX/UI).</li>
            <li>Desarrollo backend con PHP, SQL y MySQL.</li>
            <li>Uso de APIs y servicios en la nube.</li>
            <li>Deploy en servidores y entornos profesionales.</li>
          </ul>
        </section>

        <section className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Salidas profesionales</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-800 text-lg">
            <li>Desarrollador/a web frontend y backend.</li>
            <li>Diseñador/a de interfaces web.</li>
            <li>Administrador/a de sitios y servidores web.</li>
            <li>Especialista en accesibilidad y rendimiento web.</li>
          </ul>
        </section>
        <div className="mt-6">
                <BackButton />
              </div>
      </div>
    </div>
  );
}
