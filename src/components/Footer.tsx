import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[#172026] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 group mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)]">
                <span className="text-sm font-bold text-white">PS</span>
              </div>
              <span className="text-xl font-bold text-white">ProductStore</span>
            </Link>
            <p className="text-sm leading-relaxed text-white/66">
              Tu tienda premium de confianza. Calidad garantizada y envíos rápidos a todo el país.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-white">Tienda</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-white/66 transition-colors hover:text-[var(--gold)]">Todos los productos</Link></li>
              <li><Link href="/" className="text-sm text-white/66 transition-colors hover:text-[var(--gold)]">Novedades</Link></li>
              <li><Link href="/" className="text-sm text-white/66 transition-colors hover:text-[var(--gold)]">Ofertas</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-white">Soporte</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-white/66 transition-colors hover:text-[var(--gold)]">Contacto</Link></li>
              <li><Link href="#" className="text-sm text-white/66 transition-colors hover:text-[var(--gold)]">Envíos y devoluciones</Link></li>
              <li><Link href="#" className="text-sm text-white/66 transition-colors hover:text-[var(--gold)]">Preguntas frecuentes</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-white">Newsletter</h3>
            <p className="mb-4 text-sm text-white/66">Recibe ofertas exclusivas en tu email.</p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="tu@email.com"
                className="rounded-lg border border-white/12 bg-white/10 px-4 py-2 text-sm text-white placeholder:text-white/40 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
              />
              <button
                type="submit"
                className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-strong)]"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-sm text-white/55">
            © {new Date().getFullYear()} ProductStore. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-white/45 transition-colors hover:text-white">Términos</Link>
            <Link href="#" className="text-sm text-white/45 transition-colors hover:text-white">Privacidad</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
