"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      aria-label="Volver atrás"
      onClick={() => router.back()}
      className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition flex items-center justify-center"
    >
      ←
    </button>
  );
}
