// components/LikeButton.tsx
"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

interface Props {
  id: string; // id publicación
  likes: string[]; // array de userIds que dieron like
  userId: string; // id/email usuario actual
  onLikeToggle: (likes: string[]) => void; // callback para actualizar likes en padre
}

export default function LikeButton({ id, likes, userId, onLikeToggle }: Props) {
  const [loading, setLoading] = useState(false);
  const liked = likes.includes(userId);

  const toggleLike = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/vedruna/publications/like/${id}/${userId}`, {
        method: "PUT",
      });
      if (!res.ok) throw new Error();
      const updatedPub = await res.json();
      onLikeToggle(updatedPub.like || []);
    } catch {
      alert("No se pudo actualizar el like.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        if (!loading) toggleLike();
      }}
      disabled={loading}
      className={`flex items-center space-x-1 text-sm cursor-pointer ${
        liked ? "text-red-500" : "text-gray-500"
      } hover:text-red-600`}
      title={liked ? "Quitar like" : "Dar like"}
    >
      <Heart size={16} fill={liked ? "currentColor" : "none"} />
      <span>{likes.length}</span>
    </button>
  );
}
