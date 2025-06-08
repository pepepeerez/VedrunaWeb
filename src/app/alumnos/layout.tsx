// app/alumnos/layout.tsx
import NavbarAlumnos from "@/app/components/NavBarAlumnos"; 


export default function AlumnosLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavbarAlumnos />
      <main>{children}</main>
    </>
  );
}
