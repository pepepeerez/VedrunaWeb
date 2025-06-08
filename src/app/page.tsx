// app/page.tsx
import Image from "next/image";
import Logo from "../../public/logo.png";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
      
      <section
        className="relative bg-gradient-to-br from-blue-700 to-blue-900 text-white min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-6 sm:px-12 lg:px-24 text-center pt-16"
      >
        <div className="container max-w-md flex flex-col items-center">
          <Image
            src={Logo}
            alt="Logo del Instituto"
            width={140}
            height={140}
            className="mb-8 drop-shadow-lg"
            priority
          />
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 leading-snug">
            ¡Bienvenidos al ciclo formativo de DAM y DAW!
          </h1>
          <p className="text-lg sm:text-xl max-w-xs sm:max-w-md mb-10 font-light leading-relaxed">
            Desarrolla tus habilidades en programación y crea el futuro digital.
          </p>
          <Link
            href="/alumnos"
            className="inline-block bg-white text-blue-900 font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition"
          >
            Acceder al Área de Alumnos
          </Link>
        </div>
      </section>

      
      <main className="flex-grow max-w-4xl mx-auto py-16 px-6 sm:px-12 lg:px-0 space-y-20">
        {/* ¿Qué ofrecemos? */}
        <section>
          <h2 className="text-3xl font-bold text-blue-800 mb-6 border-b-4 border-blue-300 inline-block pb-1">
            ¿Qué ofrecemos?
          </h2>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            En nuestro instituto, te ofrecemos una formación de calidad en los ciclos de Desarrollo de Aplicaciones Multiplataforma (DAM) y Desarrollo de Aplicaciones Web (DAW).
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Estos ciclos están diseñados para prepararte con conocimientos actuales y habilidades prácticas necesarias para enfrentarte al mundo profesional de la tecnología y la programación.
          </p>
        </section>

        {/* ¿Qué aprenderás? */}
        <section className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-3xl font-semibold text-blue-700 mb-6 border-b border-blue-300 pb-2">
            ¿Qué aprenderás?
          </h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg">
            <li>Desarrollo de aplicaciones móviles y web.</li>
            <li>Creación de bases de datos y gestión de servidores.</li>
            <li>Programación con los lenguajes más demandados (Java, JavaScript, HTML, CSS...).</li>
            <li>Desarrollo de software para diferentes plataformas y dispositivos.</li>
          </ul>
        </section>

        {/* Oportunidades profesionales */}
        <section>
          <h2 className="text-3xl font-semibold text-blue-700 mb-6 border-b border-blue-300 pb-2">
            Oportunidades profesionales
          </h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg">
            <li>Desarrollador de aplicaciones web y móviles.</li>
            <li>Administrador de bases de datos.</li>
            <li>Diseñador de interfaces y experiencia de usuario.</li>
            <li>Programador full-stack.</li>
          </ul>
        </section>

        {/* Ciclos Formativos DAM y DAW */}
<section className="text-center px-4 sm:px-8">
  <h2 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-10">
    Nuestros Cursos
  </h2>
  
  <div className="grid gap-10 sm:gap-14 grid-cols-1 md:grid-cols-2 justify-items-center">
    
      {/* DAM */}
      <Link
        href="/ciclos/dam"
        className="group relative w-60 h-60 sm:w-72 sm:h-72 rounded-full overflow-hidden shadow-lg transform transition duration-300 hover:scale-105"
      >
        <Image
          src="/dam.png"
          alt="Desarrollo de Aplicaciones Multiplataforma"
          fill
          className="object-cover group-hover:opacity-50 transition duration-300"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <p className="text-sm sm:text-base font-semibold">Técnico Superior</p>
          <h3 className="text-base sm:text-lg font-bold leading-tight">
            DESARROLLO DE APLICACIONES MULTIPLATAFORMA
          </h3>
        </div>
      </Link>

        {/* DAW */}
        <Link
          href="/ciclos/daw"
          className="group relative w-60 h-60 sm:w-72 sm:h-72 rounded-full overflow-hidden shadow-lg transform transition duration-300 hover:scale-105"
        >
          <Image
            src="/daw.png"
            alt="Desarrollo de Aplicaciones Web"
            fill
            className="object-cover group-hover:opacity-50 transition duration-300"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
            <p className="text-sm sm:text-base font-semibold">Técnico Superior</p>
            <h3 className="text-base sm:text-lg font-bold leading-tight">
              DESARROLLO DE APLICACIONES WEB
            </h3>
          </div>
        </Link>
        
      </div>
    </section>

        {/* ¿Por qué elegirnos? */}
        <section className="bg-blue-100 rounded-xl p-8 text-blue-900">
          <h2 className="text-3xl font-semibold mb-6 border-b border-blue-400 pb-2">
            ¿Por qué elegirnos?
          </h2>
          <ul className="list-disc list-inside space-y-3 text-lg">
            <li>Un equipo docente altamente cualificado.</li>
            <li>Tecnología de vanguardia y herramientas profesionales.</li>
            <li>Enfoque práctico con proyectos reales.</li>
          </ul>
          <p className="mt-8 font-bold text-center text-xl tracking-wide">
            ¡Conviértete en un experto en el mundo digital y abre las puertas de tu futuro!
          </p>
        </section>
      </main>
    </div>
  );
}
