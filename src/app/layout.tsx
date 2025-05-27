import './globals.css';
import type { Metadata } from 'next';
import ClientLayout from './ClientLayout';

export const metadata: Metadata = {
  title: 'Mi Página Web',
  description: 'Una página de ejemplo con Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col">
        <ClientLayout>{children}</ClientLayout> {/* Aquí envuelves todo en el layout cliente */}
      </body>
    </html>
  );
}
