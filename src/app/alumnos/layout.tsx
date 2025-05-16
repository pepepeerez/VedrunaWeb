// app/alumnos/layout.tsx
import NavbarAlumnos from "@/app/components/NavBarAlumnos"; // Asegúrate que esta ruta es correcta


export default function AlumnosLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavbarAlumnos />
      <main>{children}</main>
    </>
  );
}
