"use client";

import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";

export default function NavbarAlumnos() {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const userEmail = session?.user?.email || "";
  const esAutorizadoParaContenido =
    userEmail.endsWith("@vedruna.es") ||
    userEmail === "jose.perez@a.vedrunasevillasj.es";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const profileSize = 60;

  return (
    <nav
      className={clsx(
        "sticky top-0 z-50 bg-white shadow-md transition-shadow duration-700 ease-in-out"
      )}
      style={{ height: 72 }}
    >
      <div className="max-w-7xl mx-auto px-0 sm:px-0 lg:px-0 flex justify-between items-center h-full">
        {/* Logo pegado a la izquierda con margen negativo para sobresalir */}
        <div className="ml-[-10px] flex items-center gap-3 h-full">
          <Link href="/" className="flex items-center gap-3 h-full">
            <div
              className={clsx(
                "transition-transform duration-700 ease-in-out",
                isScrolled ? "scale-75" : "scale-90"
              )}
              style={{ width: 70, height: 70 }}
            >
              <Image src="/logo2.jpeg" alt="Logo Vedruna" width={70} height={70} priority />
            </div>
            <span
              className={clsx(
                "font-bold text-gray-900 transition-transform duration-700 ease-in-out whitespace-nowrap",
                isScrolled ? "scale-75" : "scale-90",
                "text-2xl"
              )}
            >
              VedrunaWeb
            </span>
          </Link>
        </div>

        {/* Menú centrado */}
        <div className="hidden md:flex justify-center items-center gap-8 font-medium text-gray-900 text-lg flex-grow">
          <Link href="/alumnos" className="hover:text-[#33c4ff] transition-colors duration-300">
            Alumnos
          </Link>
          <Link href="/alumnos/lista" className="hover:text-[#33c4ff] transition-colors duration-300">
            Usuarios
          </Link>
          <Link href="/contacto" className="hover:text-[#33c4ff] transition-colors duration-300">
            Contacto
          </Link>
        </div>

        {/* Foto perfil pegada a la derecha sin margen */}
        <div className="flex items-center gap-4 relative mr-0" ref={menuRef} style={{ minWidth: profileSize }}>
          {session ? (
            <>
              {esAutorizadoParaContenido && (
                <Link
                  href="/subir-contenido"
                  className="hidden md:inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold mr-4"
                >
                  Añadir contenido
                </Link>
              )}

              {/* Botón menú móvil */}
              <button
                className="md:hidden p-2 rounded-md hover:bg-gray-200 transition"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="hidden md:block focus:outline-none transition-transform duration-700 ease-in-out"
                style={{
                  width: profileSize,
                  height: profileSize,
                  transform: isScrolled ? "scale(0.75)" : "scale(1)",
                }}
              >
                <Image
                  src={session.user?.image || "/default-avatar.png"}
                  alt="Foto de perfil"
                  width={profileSize}
                  height={profileSize}
                  className="rounded-full border border-gray-300"
                />
              </button>

              {menuOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-72 bg-white text-black rounded shadow-lg overflow-hidden z-50 p-4"
                >
                  <div className="mb-2 truncate">
                    <p className="font-semibold text-base sm:text-lg">{session.user?.name}</p>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">{session.user?.email}</p>
                  </div>
                  <hr className="my-2" />
                  <Link
                    href="/alumnos/editar-perfil"
                    className="block w-full text-left px-4 py-2 mb-2 text-sm sm:text-base hover:bg-gray-100 text-gray-900 font-medium rounded"
                    onClick={() => setMenuOpen(false)}
                  >
                    Editar perfil
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left px-4 py-2 text-sm sm:text-base hover:bg-gray-100 text-red-600 font-medium rounded"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition font-semibold"
            >
              Iniciar sesión con Google
            </button>
          )}
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-200">
          <div className="px-4 pt-2 pb-4 space-y-1 font-medium text-gray-900">
            <Link
              href="/alumnos"
              className="block px-3 py-2 rounded hover:bg-blue-50 hover:text-blue-700 transition"
              onClick={() => setMenuOpen(false)}
            >
              Alumnos
            </Link>
            <Link
              href="/alumnos/lista"
              className="block px-3 py-2 rounded hover:bg-blue-50 hover:text-blue-700 transition"
              onClick={() => setMenuOpen(false)}
            >
              Usuarios
            </Link>
            <Link
              href="/contacto"
              className="block px-3 py-2 rounded hover:bg-blue-50 hover:text-blue-700 transition"
              onClick={() => setMenuOpen(false)}
            >
              Contacto
            </Link>
            {esAutorizadoParaContenido && (
              <Link
                href="/subir-contenido"
                className="block px-3 py-2 rounded hover:bg-blue-50 hover:text-blue-700 transition"
                onClick={() => setMenuOpen(false)}
              >
                Añadir contenido
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
