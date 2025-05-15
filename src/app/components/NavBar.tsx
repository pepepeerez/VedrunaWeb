"use client";

import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";

export default function Navbar() {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

        {/* Sección Alumnos */}
        <div className="flex-grow flex justify-center">
          <Link
            href="/alumnos"
            className="text-gray-900 hover:text-[#33c4ff] transition-colors duration-300  border-[#33c4ff font-medium text-xl"
          >
            Alumnos
          </Link>
        </div>

        {/* Botones o perfil a la derecha */}
        <div className="relative" ref={menuRef}>
          {session ? (
            <div className="flex items-center gap-4">
              {/* Imagen de perfil clickable */}
              <button onClick={() => setMenuOpen(!menuOpen)}>
                <Image
                  src={session.user?.image || "/default-avatar.png"}
                  alt="Foto de perfil"
                  width={60}
                  height={60}
                  className="rounded-full border border-white"
                />
              </button>

              {/* Menu Desplegable de Perfil */}
              {menuOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-white text-black rounded shadow-lg overflow-hidden z-50 p-4"
                  style={{ top: "100%" }} // Ajustamos la posición para que esté justo debajo de la foto de perfil
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
            </div>
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
