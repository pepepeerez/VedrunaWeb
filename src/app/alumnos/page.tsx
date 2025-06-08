import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import AlumnosPage from "./AlumnosPage";

export default async function Alumnos() {
  const session = await getServerSession(authOptions);

  const email = session?.user?.email ?? "";
  const nombre = session?.user?.name ?? "";

  const isAutorizado =
    email.toLowerCase().endsWith("@vedruna.es") ||
    email.toLowerCase().endsWith("@a.vedrunasevillasj.es");

  return (
    <AlumnosPage
      isAutorizado={isAutorizado}
      nombre={nombre}
      email={email}
    />
  );
}
