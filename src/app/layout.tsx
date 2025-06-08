import './globals.css';
import type { Metadata } from 'next';
import ClientLayout from './ClientLayout';

export const metadata: Metadata = {
  title: 'VedrunaWeb',
  description: 'Página web del ciclo formativo de DAM y DAW del insituto Santa Joaquina de Vedruna',
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
