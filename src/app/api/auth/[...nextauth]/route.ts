import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions"; 

// Crea el manejador de autenticación usando las opciones definidas
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };