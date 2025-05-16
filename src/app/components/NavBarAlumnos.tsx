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

  return (
    <nav
      className={clsx(
        "sticky top-0 z-50 text-white transition-all duration-300",
        isScrolled ? "py-2 shadow-md" : "py-4"
      )}
    >
      <div className="flex justify-between items-center px-6 transition-all duration-300">
        {/* Logo a la izquierda */}
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/logo2.jpeg"
            alt="Logo Vedruna"
            width={isScrolled ? 50 : 80}
            height={isScrolled ? 50 : 80}
            className="transition-all duration-300"
            priority
          />
          <span
            className={clsx(
              "font-bold transition-all duration-300",
              isScrolled ? "text-lg" : "text-2xl"
            )}
          >
            VedrunaWeb
          </span>
        </Link>

        {/* Sección Alumnos, Contacto */}
        <div className="flex justify-center items-center gap-8">
          <Link
            href="/alumnos"
            className="text-gray-900 hover:text-[#33c4ff] transition-colors duration-300 font-medium text-xl"
          >
            Alumnos
          </Link>
          <Link
            href="/contacto"
            className="text-gray-900 hover:text-[#33c4ff] transition-colors duration-300 font-medium text-xl"
          >
            Contacto
          </Link>
        </div>

        {/* Perfil, botón y menú */}
        <div className="relative flex items-center gap-4" ref={menuRef}>
          {session ? (
            <>
              {esAutorizadoParaContenido && (
                <Link
                  href="/subir-contenido"
                  className="bg-blue-600 text-white mr-7 px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Añadir contenido
                </Link>
              )}

              <button onClick={() => setMenuOpen(!menuOpen)}>
                <Image
                  src={session.user?.image || "/default-avatar.png"}
                  alt="Foto de perfil"
                  width={60}
                  height={60}
                  className="rounded-full border border-white"
                />
              </button>

              {menuOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-white text-black rounded shadow-lg overflow-hidden z-50 p-4"
                  style={{ top: "100%" }}
                >
                  <div className="mb-2">
                    <p className="font-semibold">{session.user?.name}</p>
                    <p className="text-sm text-gray-600">{session.user?.email}</p>
                  </div>
                  <hr className="my-2" />
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="bg-green-500 px-4 py-2 rounded"
            >
              Iniciar sesión con Google
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
