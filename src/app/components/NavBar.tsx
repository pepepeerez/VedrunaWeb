"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">VedrunaWeb</h1>
        <div>
          {session ? (
            <div className="flex items-center gap-4">
              <span>{session.user?.name}</span>
              <button
                onClick={() => signOut()}
                className="bg-red-500 px-4 py-2 rounded"
              >
                Cerrar sesión
              </button>
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
