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
      <body>
        <ClientLayout>{children}</ClientLayout>  {/* Envolvemos el contenido en el componente de cliente */}
      </body>
    </html>
  );
}
