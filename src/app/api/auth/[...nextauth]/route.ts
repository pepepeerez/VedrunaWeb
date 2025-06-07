import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

// Configuración de NextAuth
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn() {
      return true; // Permite cualquier correo para iniciar sesión
    },
    async session({ session }) {
      return session;
    },
  },
};

// Manejador para las solicitudes GET y POST
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
