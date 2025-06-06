import NavbarAlumnos from "@/app/components/NavBarAlumnos"; 


export default function SubirContenidoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavbarAlumnos />
      <main>{children}</main>
    </>
  );
}