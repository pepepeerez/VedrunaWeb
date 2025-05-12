"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex gap-4 items-center">
        <span>{session.user?.email}</span>
        <button onClick={() => signOut()} className="bg-red-500 text-white px-4 py-1 rounded">
          Cerrar sesión
        </button>
      </div>
    );
  }

  return (
    <button onClick={() => signIn("google")} className="bg-blue-500 text-white px-4 py-1 rounded">
      Iniciar sesión con Google
    </button>
  );
}
