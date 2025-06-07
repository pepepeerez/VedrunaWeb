import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

// Definimos la configuración para NextAuth
const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn() {
      // Permite iniciar sesión a cualquier correo
      return true;
    },
    async session({ session }) {
      return session;
    },
  },
};

// Handler de NextAuth para manejar las solicitudes GET y POST
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
