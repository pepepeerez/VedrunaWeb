"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

interface Props {
  id: string;
  likes: string[];
  userId: string;
  onLikeToggle: (likes: string[]) => void;
}

export default function LikeButton({ id, likes, userId, onLikeToggle }: Props) {
  const [loading, setLoading] = useState(false);
  const liked = likes.includes(userId);

  const toggleLike = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/vedruna/publications/${id}/like/${userId}`, {
        method: "PUT",
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      onLikeToggle(updated.like);
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
        toggleLike();
      }}
      disabled={loading}
      className={`flex items-center space-x-1 text-sm ${
        liked ? "text-red-500" : "text-gray-500"
      } hover:text-red-600`}
    >
      <Heart size={16} fill={liked ? "currentColor" : "none"} />
      <span>{likes.length}</span>
    </button>
  );
}
