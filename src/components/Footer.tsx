import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 group mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PS</span>
              </div>
              <span className="text-xl font-bold text-gray-900">ProductStore</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Tu tienda premium de confianza. Calidad garantizada y envíos rápidos a todo el país.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Tienda</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Todos los productos</Link></li>
              <li><Link href="/" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Novedades</Link></li>
              <li><Link href="/" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Ofertas</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Soporte</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Contacto</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Envíos y devoluciones</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Preguntas frecuentes</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Newsletter</h3>
            <p className="text-sm text-gray-500 mb-4">Recibe ofertas exclusivas en tu email.</p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="tu@email.com"
                className="px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} ProductStore. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">Términos</Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">Privacidad</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
