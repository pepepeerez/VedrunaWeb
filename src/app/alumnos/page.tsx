import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AlumnosPage from "./AlumnosPage";

export default async function Alumnos() {
  const session = await getServerSession(authOptions);

  const email = session?.user?.email ?? "";
  const isAutorizado = email.endsWith("@a.vedrunasevillasj.es");

  return (
    <AlumnosPage
      isAutorizado={isAutorizado}
      nombre={session?.user?.name ?? ""}
      email={email}
    />
  );
}
