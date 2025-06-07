import Image from "next/image";
import damImage from "../../../../public/dam2.png";
import BackButton from "@/app/components/BackButton";

export default function DAMPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-4 text-center">
          Desarrollo de Aplicaciones Multiplataforma (DAM)
        </h1>

        <Image
          src={damImage}
          alt="Imagen DAM"
          className="rounded-2xl shadow-lg mb-8 w-full h-auto object-cover max-h-80"
          priority
        />

        <p className="text-lg text-gray-700 mb-6 text-center">
          Aprende a crear software profesional para móviles, ordenadores y más.
        </p>

        <section className="bg-white shadow-md rounded-xl p-6 mb-10">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">¿Qué es DAM?</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            El ciclo formativo de <strong>Desarrollo de Aplicaciones Multiplataforma (DAM)</strong> te prepara para programar aplicaciones que funcionen en distintos sistemas operativos (Windows, Android, Linux...).
            Es ideal para quienes desean trabajar desarrollando software de escritorio o apps móviles.
          </p>
        </section>

        <section className="bg-blue-100 rounded-xl p-6 mb-10">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">¿Qué aprenderás?</h2>
          <ul className="list-disc list-inside space-y-3 text-blue-900 text-lg">
            <li>Programación orientada a objetos con Java y Kotlin.</li>
            <li>Diseño y desarrollo de apps móviles Android.</li>
            <li>Gestión de bases de datos (SQL, SQLite).</li>
            <li>Acceso a servicios web y APIs REST.</li>
            <li>Despliegue de aplicaciones en múltiples plataformas.</li>
          </ul>
        </section>

        <section className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Salidas profesionales</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-800 text-lg">
            <li>Programador/a de software de escritorio.</li>
            <li>Desarrollador/a de apps móviles (Android).</li>
            <li>Administrador/a de bases de datos.</li>
            <li>Consultor/a de soluciones multiplataforma.</li>
          </ul>
        </section>
        <div className="mt-6">
                <BackButton />
              </div>
      </div>
    </div>
    
  );
}
