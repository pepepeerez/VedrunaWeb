import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";


export default async function Alumnos() {
    const session = await getServerSession(authOptions);
  
    if (!session || !session.user?.email?.endsWith("@a.vedrunasevillasj.es")) {
      redirect("/layaut");
    }
  
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Área de Alumnos</h1>
        <p>Bienvenido, {session.user?.name} ({session.user?.email})</p>
        <p>Esta sección está protegida y solo accesible con tu cuenta institucional.</p>
      </div>
    );
  }