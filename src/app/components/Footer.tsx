export default function Footer() {
  return (
    <footer className="mt-auto bg-gradient-to-t from-gray-100 to-white border-t border-gray-200 text-sm text-gray-700 w-full">
      <div className="bg-[#0f5fb3] text-white py-8 px-6 sm:px-12 lg:px-32 text-center text-xs sm:text-sm leading-relaxed">
        <div className="flex flex-col sm:flex-row justify-center items-center flex-wrap gap-2 sm:gap-6 mb-3">
          <a
            href="https://fpvedrunasevilla.org/aviso-legal/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Aviso Legal
          </a>
          <span className="hidden sm:inline">|</span>
          <a
            href="https://fpvedrunasevilla.org/calidad/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Calidad
          </a>
          <span className="hidden sm:inline">|</span>
          <a
            href="https://fpvedrunasevilla.org/politica-de-cookies/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Política de Cookies
          </a>
          <span className="hidden sm:inline">|</span>
          <a
            href="https://fpvedrunasevilla.org/politica-de-privacidad/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Política de Privacidad
          </a>
          <span className="hidden sm:inline">|</span>
          <a
            href="https://fpvedrunasevilla.org/terminos-y-condiciones-2/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Términos y Condiciones
          </a>
        </div>
        <p className="text-xs sm:text-sm mt-2 sm:mt-1">
          © 2025 Colegio Santa Joaquina de Vedruna | Fundación Vedruna Educación
        </p>
      </div>
    </footer>
  );
}
