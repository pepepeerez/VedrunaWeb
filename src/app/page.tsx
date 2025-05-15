// app/page.tsx
import Image from "next/image";
import Logo from "../../public/logo.png";

export default function HomePage() {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      {/* Hero section */}
      <section className=" text-white py-16 text-center">
        <div className="container mx-auto px-6">
          <div className="flex justify-center mb-6">
            <Image src={Logo} alt="Logo del Instituto" width={300} height={300} />
          </div>
          <h1 className="text-4xl font-extrabold mb-4">
            ¡Bienvenidos al ciclo formativo de DAM y DAW!
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Desarrolla tus habilidades en programación y crea el futuro digital.
          </p>
        </div>
      </section>

      {/* Sobre los ciclos */}
      <section className="py-12 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">¿Qué ofrecemos?</h2>
        <p className="mb-4">
          En nuestro instituto, te ofrecemos una formación de calidad en los ciclos de Desarrollo de Aplicaciones Multiplataforma (DAM) y Desarrollo de Aplicaciones Web (DAW).
        </p>
        <p>
          Estos ciclos están diseñados para prepararte con conocimientos actuales y habilidades prácticas necesarias para enfrentarte al mundo profesional de la tecnología y la programación.
        </p>
      </section>

      {/* Qué aprenderás */}
      <section className="bg-white py-12 px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">¿Qué aprenderás?</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Desarrollo de aplicaciones móviles y web.</li>
          <li>Creación de bases de datos y gestión de servidores.</li>
          <li>Programación con los lenguajes más demandados (Java, JavaScript, HTML, CSS...).</li>
          <li>Desarrollo de software para diferentes plataformas y dispositivos.</li>
        </ul>
      </section>

      {/* Salidas profesionales */}
      <section className="py-12 px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Oportunidades profesionales</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Desarrollador de aplicaciones web y móviles.</li>
          <li>Administrador de bases de datos.</li>
          <li>Diseñador de interfaces y experiencia de usuario.</li>
          <li>Programador full-stack.</li>
        </ul>
      </section>

      {/* Por qué elegirnos */}
      <section className="bg-blue-100 py-12 px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">¿Por qué elegirnos?</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Un equipo docente altamente cualificado.</li>
          <li>Tecnología de vanguardia y herramientas profesionales.</li>
          <li>Enfoque práctico con proyectos reales.</li>
        </ul>
        <p className="mt-6 font-bold text-center text-lg text-blue-700">
          ¡Conviértete en un experto en el mundo digital y abre las puertas de tu futuro!
        </p>
      </section>
    </div>
  );
}
